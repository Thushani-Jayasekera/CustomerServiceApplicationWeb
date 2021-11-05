import React, { useEffect } from "react";
import { Button } from "react-bulma-components";

const UploadWidget = ()=>{
  let myWidget;
  useEffect(()=>{
    console.log("Done")
   myWidget = window.cloudinary.createUploadWidget(
     {
       cloudName:"ded0k5ukr",
       uploadPreset:"ml_default"
     },(error,result)=>{
       if (!error && result && result.event === "success") {
         console.log("Done! Here is the image info: ", result.info);
       }
     }
   )
  },[])
  return(
    <Button onClick={(event)=>{
      myWidget.open()
    }}>
      Upload
    </Button>
  )
}
export default UploadWidget