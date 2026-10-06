import { Product } from "@/app/home.interface";
import { getWishlist } from "@/app/wishlist/wishlist.action";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, RefreshCw, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../AddToCart/AddToCart";
import WishlistButton from "../WishlistButton/WishlistButton";

export default async function ProductCard({ prod }: { prod: Product }) {
  if (!prod) return null;
  const {
    title,

    description,
    quantity,
    price,
    imageCover,
    category,
    _id,
    ratingsAverage,

    priceAfterDiscount,

    ratingsQuantity,
  } = prod;

  // 🔹 Next.js بيعمل dedupe تلقائي لأي fetch بنفس الـ URL جوه نفس الـ render،
  // فحتى لو كل ProductCard نادى getWishlist() لوحده، هيترسل طلب واحد بس فعليًا.
  const wishlistRes = await getWishlist();
  const wishlistIds: string[] =
    wishlistRes?.status === "success"
      ? (wishlistRes.data ?? []).map((p: { _id: string }) => p._id)
      : [];
  const isInWishlist = wishlistIds.includes(_id);

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 hover:shadow-2xl hover:-translate-y-2 duration-300">
      <Link href={`/productDeteles/${_id}`}>
        <div className="relative h-60">
          <Image
            fill
            sizes="(max-width:630px ),100vw,(max-width:768px ),50vw,(max-width:1024px ),25vw,"
            loading="lazy"
            src={imageCover}
            alt="Event cover"
            className=" "
          />
          <div className="absolute top-2 right-2 flex flex-col items-center gap-4">
            <WishlistButton productId={_id} initialInWishlist={isInWishlist} />
            <RefreshCw size={14} />
            <Eye size={14} />
          </div>
        </div>
        <CardHeader className="text-center mb-20">
          <CardAction>
            <Badge
              variant="secondary"
              className="bg-main-color text-white absolute top-2 inset-s-2"
            >
              {category.name}
            </Badge>
          </CardAction>
          <CardTitle className="text-main-color text-xl">
            {title.split(" ").slice(0, 2).join(" ")}
          </CardTitle>
          <div>
            <h3 className="text-md">
              price:{" "}
              {priceAfterDiscount ? (
                <div className="flex gap-2 justify-center">
                  <span className="line-through">{price}</span>{" "}
                  <span className="text-main-color">{priceAfterDiscount}</span>
                </div>
              ) : (
                price
              )}
            </h3>
            <div className="flex justify-center items-center">
              {Array.from({ length: Math.floor(ratingsAverage) }).map(
                (e, i) => (
                  <Star key={i} className="text-yellow-400 fill-[#FDC700]" />
                ),
              )}
              {Array.from({ length: 5 - Math.floor(ratingsAverage) }).map(
                (e, i) => (
                  <Star key={i} className="text-yellow-400 " />
                ),
              )}
              ({ratingsQuantity})
            </div>

            <h3>quantity: {quantity}</h3>
          </div>
          <CardDescription>
            {description.split(" ").slice(0, 8).join(" ")}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="absolute bottom-0 inset-e-0">
        <AddToCart   productId={_id} />
      </CardFooter>
    </Card>
  );
}