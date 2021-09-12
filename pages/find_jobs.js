import React, { useState } from "react";
import { GET_ME_AS_SERVICE_PROVIDER, GET_JOB_POSTING_FEED } from "../gql/query";
import { useQuery } from "@apollo/client";
import Loader from "../components/utils/Loader";
import Header from "../components/Header"
import Layout from "../components/Layout";
import tw from "twin.macro";
import styled from "styled-components";
import FilterBox from "../components/FilterBox";
import { Columns, Container, Content, Message, Section } from "react-bulma-components";
import JobPosting from "../components/JobPosting";


const CenteredH1 = tw.h1`text-center`
const FindJobsPage = ()=>{
  const [values,setValues] = useState({
    jobPostingFeedProvince:"",
    jobPostingFeedCity:"",
    jobPostingFeedTown:"",
    jobPostingFeedCategory:""
  });
  const {data,loading,error,fetchMore} = useQuery(GET_ME_AS_SERVICE_PROVIDER)
  const job_query = useQuery(GET_JOB_POSTING_FEED,{
    variables:{
      jobPostingFeedProvince:data.me.province,
      jobPostingFeedCity:data.me.city,
      jobPostingFeedTown:data.me.town,
      jobPostingFeedCategory:"Plumbing",
      jobPostingFeedCursor:"",
    },
    fetchPolicy:"network-only",
    nextFetchPolicy:"network-only",
  })
  if(loading || job_query.loading) return <Loader/>
  return(
    <Layout>
      <Header roundedHeaderButton={true}/>
      <Container>
        <Section>
          <Content>
            <CenteredH1>Available Jobs in Area</CenteredH1>
          </Content>
        </Section>
        <Columns>
          <Columns.Column size={2}>
            <FilterBox values={values} setValues={setValues} refetch={job_query.refetch}/>
          </Columns.Column>
          <Columns.Column>
            {
              (job_query.data && job_query.data.jobPostingFeed.jobPostings.map((obj,i)=>{
                return(<JobPosting key={i} id={obj.id} heading={obj.description} postedBy={obj.postedBy.username} location={obj.location.town+" , "+obj.location.city}
                                   lowerLimit={obj.budgetRange.lowerLimit} upperLimit={obj.budgetRange.upperLimit} />)
            }))
            }
            {
              (job_query.data && job_query.data.jobPostingFeed.jobPostings.length ===0) && (<Message color={"danger"}>
                <Message.Body>
                  No jobs found
                </Message.Body>
              </Message>)
            }
          </Columns.Column>
        </Columns>
      </Container>
    </Layout>
  )
}

export default FindJobsPage