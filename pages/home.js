import React from "react";
import Layout from "../components/Layout";
import TwoColumnWithInput from "../components/hero/TwoColumnWithInput";
import { gql,useQuery } from "@apollo/client";
const Home = ()=>{
    return(
        <Layout>
          <TwoColumnWithInput/>
        </Layout>
    )
}
export default Home