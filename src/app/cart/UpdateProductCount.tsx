"use client"
import AppButton from '@/components/AppButton/AppButton'
import { handleUpdateProductCount } from './cart.action';
import { toast } from '@/components/ui/toast';


export default function UpdateProductCount({children,productId,count}:{children:React.ReactNode,productId:string,count:number}) {
    // console.log(productId);
    
    function upadatecount() {
        // console.log("count");

       toast.promise( handleUpdateProductCount(productId, count),{
        loading: "Adding to cart...",
      success: (data) => ({
        title: data.message,
        
      }),
        error: "No internet connection",
       })
        
    }
  return (
    <AppButton className="bg-transparent hover:bg-transparent" onClick={upadatecount}>{children}</AppButton>
  )
}
