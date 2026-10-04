import { redirect } from "next/navigation";
import PaymentForm from "../PaymentForm/PaymentForm";

export default async function page({params}:{params:Promise<{id:string}>}) {
 
    // redirect("/");
const {id} = await params

  return (
    <>
    <h1 className="text-6xl text-center text-main-color my-20">fresh cart payment</h1>
    <div className="w-6/12 my-6 mx-auto">
    <PaymentForm id={id}/>

    </div>
    </>
  )
}
