import React from "react";
import { Container, Content } from "react-bulma-components";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

const PaymentFailurePage = ()=>{
  return(
    <Layout>
      <Header/>
      <Container>
        <Content>
          <h1>Payment Failure</h1>
        </Content>
      </Container>
    </Layout>
  )
}

export default PaymentFailurePage