import React from "react";
import { Box, Button, Content, Level } from "react-bulma-components";

const LargeTileCenter = ({top_left,top_middle,top_right,center_middle,bottom_left,bottom_right, green_button_fn,green_button_text,red_button_fn,red_button_text,extra})=>{
     return(
       <Box tw={"bg-gray-100"}>
         <Level>
           <Level.Side align={"left"}>
             <Level.Item>
               <Content textWeight={"bold"} textSize={"4"}>
                 <p>{top_left} </p>
               </Content>
             </Level.Item>
           </Level.Side>
           <Level.Item>
             <Content textWeight={"bold"} textSize={"4"}>
               <p>{top_middle}</p>
             </Content>
           </Level.Item>
           <Level.Side align={"right"}>
             <Content textWeight={"bold"} textSize={"4"}>
               <p>{top_right}</p>
             </Content>
           </Level.Side>
         </Level>
         <Level>
           <Content justifyContent={"center"}>
             <p>{center_middle}</p>
           </Content>
         </Level>
         <Level>
           <Level.Side align={"left"}>
             <Level.Item>
               <Content textWeight={"semibold"}>
                 <p>{bottom_left}</p>
               </Content>
             </Level.Item>
           </Level.Side>
           <Level.Side align={"right"}>
             <Level.Item>
               <Content textWeight={"semibold"} >
                 <p>{bottom_right}</p>
               </Content>
             </Level.Item>
           </Level.Side>

         </Level>
         <Level>
           <Level.Side align={"left"}>
              <Level.Item>
               <Content textWeight={"semibold"}>{extra}</Content>
              </Level.Item>
           </Level.Side>
         </Level>
         <Button.Group>
           {(green_button_text)&&(<Button color={"success"} onClick={green_button_fn}>
             {green_button_text}
           </Button>)}
           {red_button_text &&(<Button color={"danger"}>
             {red_button_text}
           </Button>)}
         </Button.Group>
       </Box>
     )
}
export default LargeTileCenter