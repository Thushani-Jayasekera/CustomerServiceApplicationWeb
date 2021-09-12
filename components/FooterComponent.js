import React from "react";
import { Button, Container, Content, Footer } from "react-bulma-components";
import tw from "twin.macro";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const StyledFooter = tw(Footer)`pb-0`
const FooterComponent = ()=>{
  const {t,i18n} = useTranslation()
  return(
    <StyledFooter>
      <Container>
        <Content>
         <p>
           Change Language
           <select onChange={event => {
             console.log("clicked")
             i18n.changeLanguage(event.target.value)
           }}>
             <option value={"en"}>English</option>
             <option value={"si"}>Sinhala</option>
             <option value={"ta"}>Tamil</option>
           </select>
         </p>
        </Content>
      </Container>
    </StyledFooter>
  )
}

export default FooterComponent