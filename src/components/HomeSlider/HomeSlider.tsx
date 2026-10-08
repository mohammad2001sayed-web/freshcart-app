import Slider from "../Slider/Slider";
import slidefoto from "@/images/sliderFoto.png";

export default function HomeSlider() {
  const imageList = [slidefoto.src, slidefoto.src, slidefoto.src];
  return (
    <div>
      <Slider
        overlay={true}
        contant={[
          {
            h3: "Fresh Products Delivered to Your Door",
            p: "Get 20% off  your first order",
            btn1: "Shop Now",
            link1: "/shope", // رابط الزر الأول
            btn2: "View All",
            link2: "/deals", // رابط الزر الثاني
            btn1Class:
              "text-main-color hover:scale-105 hover:shadow-md transition duration-300 ease-in-out",
            btn2Class:
              "text-main-color hover:scale-105 hover:shadow-md transition duration-300 ease-in-out",
          },
          {
            h3: "Premium Quality Guaranteed",
            p: "Find from from to year table",
            btn1: "Shop Now",
            link1: "/shope",
            btn2: "Learn More",
            link2: "/all-products", // <--- Tilføj link2 her
            btn1Class: "text-[#547FFF]",
          },
          {
            h3: "Fast & Free Delivery",
            p: "Same day delivery available",
            btn1: "Grab Deal",
            link1: "/shope",
            btn2: "See More",
            link2: "/about",
            btn1Class: "text-[#B592FF]",
          },
        ]}
        spaceBetween={4}
        navigation={true}
        effect={"effect"}
        pagination={true}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        imageList={imageList}
      />
    </div>
  );
}
