import React, { useState } from "react";
import { Columns, Container, Content, Section, Form, Button, Level, Box } from "react-bulma-components";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { GET_JOB_POSTING, GET_MY_JOB_BID_FOR_POSTING } from "../gql/query";
import { useMutation, useQuery } from "@apollo/client";
import Loader from "../components/utils/Loader";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import {handleChangefn} from "../utils"
import { ADD_JOB_BID } from "../gql/mutation";
import {useToasts} from "react-toast-notifications";
import {useHistory} from 'react-router-dom'
const JobPostingPage = ({match})=>{
    const [values,setValues] = useState()
    const jobPostingQuery = useQuery(GET_JOB_POSTING,{
      variables:{
        jobPostingId:match.params.id
      }
    })
  const {addToast} = useToasts()
  const history = useHistory();
  const [jobBid,jobBidState] = useMutation(ADD_JOB_BID,{
    onCompleted:(data)=>{
      addToast("Successfully added job bid",{appearance:"success"})
      history.push("/service_provider/find_jobs")
    },
    onError:(error)=>{
      addToast("Failed ",{appearance:"error"})
    }
  })
    if(jobPostingQuery.loading ){
      return <Loader/>
    }
    const handleChange = handleChangefn(setValues,values)
    const handleSubmit = (event)=>{
        event.preventDefault()
        const lower = parseFloat(jobPostingQuery.data.jobPosting.budgetRange.lowerLimit)
        const upper = parseFloat(jobPostingQuery.data.jobPosting.budgetRange.upperLimit)
        const amount = parseFloat(values.createJobBidProposedAmount)
      if(amount<lower || amount>upper){
        addToast("Invalid amount",{appearance:"error"})
        return
      }
      const currTime = new Date()
      const givenTime = new Date(values.createJobBidProposedDate+"T"+values.createJobBidProposedTime)
      if(givenTime<currTime){
        addToast("Invalid Time",{appearance:"error"})
        return;
      }
        jobBid({
          variables:{
            createJobBidProposedAmount:amount,
            createJobBidProposedDate:values.createJobBidProposedDate+"T"+values.createJobBidProposedTime,
            createJobBidJobPosting:match.params.id,
            createJobBidDetailedBreakdown:values.createJobBidDetailedBreakdown
          }
        })
    }
    return(
        <Layout>
            <Header/>
            <Container>
              <Section>
                <Content>
                  <h1>Add Bid for the job</h1>
                </Content>
              </Section>
              <Section>
                <Content style={{display:"flex"}} justifyContent={"center"}>
                  <Box style={{width:"50%",borderRadius:"10px",border:"solid black 1px"}}>
                    <Level>
                      <Level.Side align={"left"}>
                        <Level.Item textWeight={"bold"}>User name of the poster</Level.Item>
                      </Level.Side>
                      <Level.Side align={"right"}>
                        <Level.Item>    {jobPostingQuery.data.jobPosting.postedBy.username}</Level.Item>
                      </Level.Side>
                    </Level>
                    <Level>
                    <Level.Side align={"left"}>
                      <Level.Item textWeight={"bold"}>Heading</Level.Item>
                    </Level.Side>
                    <Level.Side align={"right"}>
                      <Level.Item>   {jobPostingQuery.data.jobPosting.heading}</Level.Item>
                    </Level.Side>
                  </Level>
                    <Level>
                      <Level.Side align={"left"}>
                        <Level.Item textWeight={"bold"}>Budget</Level.Item>
                      </Level.Side>
                      <Level.Side align={"right"}>
                        <Level.Item> {jobPostingQuery.data.jobPosting.budgetRange.lowerLimit}LKR
                          -
                          {jobPostingQuery.data.jobPosting.budgetRange.upperLimit}</Level.Item>LKR
                      </Level.Side>
                    </Level>

                  </Box>
                </Content>
              </Section>
              <Section>
                <Content>
                  <form onSubmit={handleSubmit}>
                  <Form.Field>
                    <Form.Label>Proposed Amount</Form.Label>
                    <Form.Control>
                      <Form.Input onChange={handleChange} name={"createJobBidProposedAmount"} />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Label>Date proposed</Form.Label>
                    <Form.Control>
                      <Form.Input type={"date"} min={new Date().toISOString().substring(0,10)} name={"createJobBidProposedDate"} onChange={handleChange}/>
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Label>Time proposed</Form.Label>
                    <Form.Control>
                      <Form.Input type={"time"} name={"createJobBidProposedTime"} onChange={handleChange} />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Label>Estimated cost breakdown</Form.Label>
                    <Form.Control>
                      <Form.Textarea name={"createJobBidDetailedBreakdown"} onChange={handleChange}/>
                    </Form.Control>
                  </Form.Field>
                  <Form.Field kind="group">
                    <Form.Control>
                      <Button color="success" type={"submit"}>Submit</Button>
                    </Form.Control>
                    <Form.Control>
                      <Link to={"/service_provider/find_jobs"}>
                        <Button color="danger">
                          Cancel
                        </Button>
                      </Link>
                    </Form.Control>
                  </Form.Field>
                  </form>
                </Content>
              </Section>
            </Container>
        </Layout>
    )
}

export default JobPostingPage