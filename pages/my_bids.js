import React from "react";
import { Container, Content, Section } from "react-bulma-components";
import { useQuery } from "@apollo/client";
import { GET_MY_BIDS } from "../gql/query";
import Loader from "../components/utils/Loader";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Image } from "cloudinary-react";

const MyBidsPage = ()=>{
  const bidsQuery = useQuery(GET_MY_BIDS)
  if(bidsQuery.loading) return <Loader/>
  return(
    <Layout>
     <Header/>
      <Container>
        <Content>
          <Section>
            <h1>My Bids 123</h1>
          </Section>
          <Section>
            <div>
              <Image publicId={'sample'} width={"50"}/>
            </div>
            <form onSubmit={""}>
              <input type={"file"} />
              <button>Submit</button>
            </form>
          </Section>
        </Content>

      </Container>
    </Layout>
  )
}

export default MyBidsPage