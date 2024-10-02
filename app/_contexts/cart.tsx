/* eslint-disable no-unused-vars */
"use client";
import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
          deliveryTimeMinutes: true;
          id: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface CartContextProps {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  totalQuantity: number;
  addProductToCart: ({
    product,
    emptyCart,
  }: {
    product: CartProduct;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = products.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity;
  }, 0);

  const totalPrice =
    products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0) + Number(products?.[0]?.restaurant?.deliveryFee);

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const totalDiscount =
    subtotalPrice - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee);

  const addProductToCart: CartContextProps["addProductToCart"] = ({
    product,
    emptyCart,
  }) => {
    if (emptyCart) {
      setProducts([]);
    }

    const isProductInCart = products.some(
      (cardProduct) => cardProduct.id === product.id,
    );
    if (isProductInCart) {
      return setProducts((prev) =>
        prev.map((cardProduct) => {
          if (cardProduct.id === product.id) {
            return {
              ...cardProduct,
              quantity: cardProduct.quantity + product.quantity,
            };
          }
          return cardProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, product]);
  };

  const clearCart = () => {
    setProducts([]);
  };

  const decreaseProductQuantity: CartContextProps["decreaseProductQuantity"] = (
    productId: string,
  ) => {
    setProducts((prev) =>
      prev.map((cardProduct) => {
        if (cardProduct.id === productId) {
          if (cardProduct.quantity === 1) {
            return cardProduct;
          }
          return {
            ...cardProduct,
            quantity: cardProduct.quantity - 1,
          };
        }
        return cardProduct;
      }),
    );
  };

  const increaseProductQuantity: CartContextProps["increaseProductQuantity"] = (
    productId: string,
  ) => {
    setProducts((prev) =>
      prev.map((cardProduct) => {
        if (cardProduct.id === productId) {
          return {
            ...cardProduct,
            quantity: cardProduct.quantity + 1,
          };
        }
        return cardProduct;
      }),
    );
  };

  const removeProductFromCart: CartContextProps["removeProductFromCart"] = (
    productId: string,
  ) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalDiscount,
        totalQuantity,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
