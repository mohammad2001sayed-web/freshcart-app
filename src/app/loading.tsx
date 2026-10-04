import { Spinner } from "@/components/ui/spinner"

 function loading() {
  return (
    <div className="min-h-screen flex justify-center fixed z-50 inset-0 items-center text-3xl bg-main-color">
        
        
        <Spinner className="size-30" color="#029"/>
        
        </div>
  )
}
export default loading
