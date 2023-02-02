import React from "react";
import { Container, Content } from "react-bulma-components";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

const PaymentSuccessPage = ()=>{
  return(
    <Layout>
      <Header/>
      <Container>
        <Content>
          <h1>Payment Success</h1>
        </Content>
      </Container>
    </Layout>
  )
}

export default PaymentSuccessPage