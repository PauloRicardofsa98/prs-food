import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
      <Card className="mt-6 flex justify-around py-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>
          {Number(restaurant.deliveryFee) > 0 ? (
            <span className="text-sm font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          ) : (
            <span className="text-sm font-semibold">Grátis</span>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Tempo</span>
            <TimerIcon size={14} />
          </div>
          <span className="text-sm font-semibold">
            {restaurant.deliveryTimeMinutes} min
          </span>
        </div>
      </Card>
    </>
  );
};

export default DeliveryInfo;
