import React, { useState } from "react";
import { Columns, Container, Content, Section, Form, Button } from "react-bulma-components";
import Layout from "../components/Layout";
import Header from "../components/Header";
import {GET_JOB_POSTING} from "../gql/query";
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
    if(jobPostingQuery.loading){
      return <Loader/>
    }
    const handleChange = handleChangefn(setValues,values)
    const handleSubmit = (event)=>{
        event.preventDefault()
        jobBid({
          variables:{
            createJobBidProposedAmount:parseFloat(values.createJobBidProposedAmount),
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
                <Content>
                  <Columns>
                    <Columns.Column>
                      {jobPostingQuery.data.jobPosting.postedBy.username}
                    </Columns.Column>
                    <Columns.Column>
                      {jobPostingQuery.data.jobPosting.heading}
                    </Columns.Column>
                    <Columns.Column>
                      {jobPostingQuery.data.jobPosting.budgetRange.lowerLimit}
                      -
                      {jobPostingQuery.data.jobPosting.budgetRange.upperLimit}
                    </Columns.Column>
                  </Columns>
                </Content>
              </Section>
              <Section>
                <Content>
                  <form onSubmit={handleSubmit}>
                  <Form.Field>
                    <Form.Label>Proposed Amount</Form.Label>
                    <Form.Control>
                      <Form.Input onChange={handleChange} name={"createJobBidProposedAmount"}/>
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