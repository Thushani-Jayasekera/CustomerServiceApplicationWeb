import React from "react";
import { Container,Content } from "react-bulma-components";
import { useQuery } from "@apollo/client";
import { GET_MY_BIDS } from "../gql/query";
import Loader from "../components/utils/Loader";

const MyBidsPage = ()=>{
  const bidsQuery = useQuery(GET_MY_BIDS)
  if(bidsQuery.loading) return <Loader/>
  return(
    <Container>
     <Content>
        <h1>Hello World</h1>
     </Content>

    </Container>
  )
}

export default MyBidsPage