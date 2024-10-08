"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  Menu,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSingIn = () => signIn();
  const handleSignOut = () => signOut();

  return (
    <div className="flex items-center justify-between px-5 pt-3">
      <Link href={"/"}>
        <div className="relative h-[70px] w-[100px]">
          <Image
            src="/logo_prs_food.png"
            alt="logo"
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <Sheet>
        <SheetTrigger>
          <Button
            size={"icon"}
            variant="outline"
            className="border-none bg-transparent"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <div className="flex justify-between pt-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data.user?.image as string | undefined} />
                  <AvatarFallback>
                    {data.user.name?.split(" ")[0][0]}
                    {data.user.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{data.user.name}</h3>
                  <span className="block text-xs text-muted-foreground">
                    {data.user.email}
                  </span>
                </div>
              </div>
              <Button size={"icon"} onClick={handleSignOut}>
                <LogOutIcon size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Faça seu login</h2>
              <Button size={"icon"} onClick={handleSingIn}>
                <LogInIcon />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurants favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              onClick={handleSignOut}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
