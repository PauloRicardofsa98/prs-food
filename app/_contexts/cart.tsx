/* eslint-disable no-unused-vars */
"use client";
import { Prisma, Product } from "@prisma/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
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
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = subtotalPrice - totalPrice;

  const addProductToCart = ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
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
              quantity: cardProduct.quantity + quantity,
            };
          }
          return cardProduct;
        }),
      );
    }

    setProducts((prev) => [
      ...prev,
      {
        ...product,
        quantity,
      },
    ]);
  };

  const decreaseProductQuantity = (productId: string) => {
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

  const increaseProductQuantity = (productId: string) => {
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

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalDiscount,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
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
