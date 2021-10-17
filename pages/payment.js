import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Button, Container, Content, Section } from "react-bulma-components";
import { Payhere, AccountCategory, Customer, CheckoutParams, CurrencyType, PayhereCheckout } from "payhere-js-sdk";
Payhere.init('1218090',AccountCategory.SANDBOX)
const PaymentPage = ()=>{
  const checkout = ()=>{
     try {
       const customer = new Customer({
         first_name:"Paul",
         last_name:"Lakshan",
         phone:"+94776495354",
         email:"plumberhl@gmail.com",
         address:"dfadfa",
         city:"Jaffna",
         country:"Srilanka"
       })
       const checkoutData = new CheckoutParams({
         returnUrl: 'http://localhost:1234/payment/success',
         cancelUrl: 'http://localhost:3000/cancel',
         notifyUrl: 'http://localhost:4000/payment/notify',
         order_id: '112233',
         itemTitle: 'Demo Item',
         currency: CurrencyType.LKR,
         amount: 100
       })
       const checkout =new PayhereCheckout(customer,checkoutData,(error)=>alert(error))
       checkout.start()
     }
     catch (e) {
        console.log(e)
     }
  }
  return(
    <Layout>
     <Header/>
     <Container>
        <Section>
          <Content>
            <h1>Payment </h1>
            <Button onClick={checkout}>Click to pay</Button>
          </Content>
        </Section>
     </Container>
    </Layout>
  )
}

export default PaymentPage