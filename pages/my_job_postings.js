import React, { useState } from "react";
import { Button, Container, Content, Message, Section } from "react-bulma-components";
import { useQuery } from "@apollo/client";
import { GET_MY_JOB_POSTINGS } from "../gql/query";
import Loader from "../components/utils/Loader";
import Layout from "../components/Layout";
import Header from "../components/Header";
import LongPanel from "../components/Long_Panel";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { useToasts } from "react-toast-notifications";
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
const MyJobPostingsPage = ()=>{
    const myJobPostingQuery = useQuery(GET_MY_JOB_POSTINGS,{variables:{
      getMyJobPostingsState:"open"
      }})
    const switchState = (state)=>(event)=>{
      event.preventDefault()
      myJobPostingQuery.refetch({
        getMyJobPostingsState:state
      }).then(data=>{console.log(data)
      })
    }
  if(myJobPostingQuery.loading) return <Loader/>
    if(myJobPostingQuery.error) return <p>{myJobPostingQuery.error.message}</p>
    return(
      <Layout>
        <Header/>
        <Container>
          <Content>
            <Section>
              <h1>My Job Postings Page</h1>
              <Container>
                <Button.Group>
                  <Button onClick={switchState("open")}>Open Jobs</Button>
                  <Button onClick={switchState("bid_selected")} >Bid selected Jobs</Button>
                  <Button onClick={switchState("closed")}>Closed Jobs</Button>
                  <Button onClick={switchState("completed")}>Completed</Button>
                </Button.Group>
              </Container>
            </Section>
          </Content>
          {(myJobPostingQuery.data.getMyJobPostings.length === 0)&&(
            <Message color={"danger"}>
              <Message.Body>
                No jobs found
              </Message.Body>
            </Message>)
          }
              {myJobPostingQuery.data.getMyJobPostings.map((obj,key)=>{
                return <LongPanel key={key} link={`/myJobPostings/${obj.id}`} main_text={obj.heading} lower_left_main={obj.category} lower_right={
                  `LKR ${obj.budgetRange.lowerLimit} - LKR ${obj.budgetRange.upperLimit}`
                } lower_left_sub={timeAgo.format(new Date(obj.updatedAt))}
                />
              })}

        </Container>
      </Layout>
    )
}

export default MyJobPostingsPage