"use client";

import { Avatar } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { useCartContext } from "@/app/_contexts/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELED:
      return "Cancelado";
    case OrderStatus.DELIVERING:
      return "Em entrega";
    case OrderStatus.COMPLETED:
      return "Concluído";
    case OrderStatus.PENDING:
      return "Pendente";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.PREPARING:
      return "Preparando";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const router = useRouter();
  const { addProductToCart } = useCartContext();

  const handleReorder = () => {
    order.products.forEach((orderProduct) => {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    });

    router.push(`/restaurants/${order.restaurant.id}`);
  };

  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div
          className={`w-fit rounded-full bg-muted px-2 py-1 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-400 text-white"}`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant={"link"}
            size={"icon"}
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href={`/restaurants/${order.restaurant.id}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-1">
          {order.products.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {orderProduct.quantity}
                </span>
              </div>
              <span className="block text-sm text-muted-foreground">
                {orderProduct.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-xs text-primary"
            onClick={handleReorder}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
