import React from "react";
import Header from "./Header";
import tw from "twin.macro";

const StyledDiv = tw.div`font-display min-h-screen text-secondary-500 p-8 overflow-hidden`;
const Layout = ({children})=>{
  return(
    <StyledDiv>
      {children}
    </StyledDiv>
  )
}
export default Layout;