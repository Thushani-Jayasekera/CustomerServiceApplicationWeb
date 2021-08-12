import React from "react";
import Header from "./Header";
import {Container,Row}from "react-bootstrap";

const Layout = ({children})=>{
  return(
    <React.Fragment>
      <Header/>
      {children}
    </React.Fragment>
  )
}
export default Layout;