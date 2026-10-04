import { getAllCategories } from '@/app/categorise/category.services';
import Slider from '../Slider/Slider';


export default async function CategorySlider() {
      const categoriesList = await getAllCategories();
  
      const imageList = categoriesList.map((e) => e.image);

      console.log(imageList);
      

  return (
   
        <>
        <Slider  imageList={imageList} spaceBetween={20} autoplay={{delay: 500, disableOnInteraction: false}} effect={"effect"} slidesPerView={6} navigation={true} />
    </>
  
  )
}
