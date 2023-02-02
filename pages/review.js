import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Block, Box, Button, Container, Content, Form, Level, Section } from "react-bulma-components";
import ReactStars from "react-rating-stars-component";
import { useMutation, useQuery } from "@apollo/client";
import { GET_JOB_BID_BY_ID } from "../gql/query";
import Loader from "../components/utils/Loader";
import { ADD_REVIEW } from "../gql/mutation";
import { useToasts } from "react-toast-notifications";
const ReviewPage = ({match,history})=>{
  const [starValue,setStarValue] = useState(0)
  const [text,setText] = useState("")
  const {addToast} = useToasts()
  const jobBidQuery = useQuery(GET_JOB_BID_BY_ID,{
    variables:{
      getJobBidByIdId:match.params.id
    },
    onCompleted:(data => {
      if(match.url.split("/")[1]==="requesterReview"){
        setStarValue(data.getJobBidById.providerRating || 0)
        setText(data.getJobBidById.providerReview||"")
      }
      else{
        setStarValue(data.getJobBidById.requesterRating || 0)
        setText(data.getJobBidById.requesterReview||"")
      }
    })
  })
  const [addReviewMutation,addReviewMutationStatus] = useMutation(ADD_REVIEW)
  if(jobBidQuery.loading){
    return <Loader/>
  }

  return(
    <Layout>
      <Header/>
      <Container>
        <Section>
          <Content>
            {
              (match.url.split("/")[1] === "requesterReview")&&(
                <Section>
                  <Block>
                    <h3>Rate and Review your service provider </h3>
                    <h6>Reference : {match.params.id}</h6>
                    <h6>Service Provider Name : {jobBidQuery.data.getJobBidById.bidBy.fullname}</h6>
                  </Block>
                  <Block>
                    <Form.Field>
                      <Form.Label>
                        How much do you rate your service provider ? {starValue} / 5
                      </Form.Label>
                      <Form.Control>
                        <ReactStars
                          count={5}
                          size={24}
                          value={starValue}
                          onChange={(newRating)=>{
                            setStarValue(newRating)
                          }}
                        />
                        <span>

                        </span>
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Form.Label>
                        Add short review About your provider
                      </Form.Label>
                      <Form.Control>
                        <Form.Textarea
                          value={text}
                          onChange={(event)=>{setText(event.target.value)}}
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Button.Group>
                        <Button color={"success"} onClick={(event)=>{
                          event.preventDefault()
                          addReviewMutation({
                            variables:{
                              type:"provider",
                              addReviewToBidId:match.params.id,
                              rating:starValue,
                              review:text
                            },
                          }).then(r=>{
                            addToast("Successfuly added",{appearance:"success"})
                            history.push("/myJobPostings")
                          }).catch(e=>{
                            addToast("error",{appearance:"error"})
                          })
                        }}>Submit</Button>
                        <Button color={"danger"}>Cancel</Button>
                      </Button.Group>
                    </Form.Field>
                  </Block>
                </Section>
              )
            }
            {
              (match.url.split("/")[1] === "providerReview")&&(
                <Section>
                  <Block>
                    <h3>Rate and Review your service requester </h3>
                    <h6>Reference : {match.params.id}</h6>
                    <h6>Service requester Name : {jobBidQuery.data.getJobBidById.jobPosting.postedBy.fullname}</h6>
                  </Block>
                  <Block>
                    <Form.Field>
                      <Form.Label>
                        How much do you rate your service requester ? {starValue} / 5
                      </Form.Label>
                      <Form.Control>
                        <ReactStars
                          count={5}
                          size={24}
                          value={starValue}
                          onChange={(newRating)=>{
                            setStarValue(newRating)
                          }}
                        />
                        <span>

                        </span>
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Form.Label>
                        Add short review About your provider
                      </Form.Label>
                      <Form.Control>
                        <Form.Textarea
                          value={text}
                          onChange={(event)=>{setText(event.target.value)}}
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Button.Group>
                        <Button color={"success"} onClick={(event)=>{
                          event.preventDefault()
                          addReviewMutation({
                            variables: {
                              type: "requester",
                              addReviewToBidId: match.params.id,
                              rating: starValue,
                              review: text
                            }
                           }).then(r =>{
                            addToast("Successfully added",{appearance:"success"})
                            history.push("/myBids")
                          }).catch(e=>{
                            addToast("Error",{appearance:"error"})
                          })
                        }}>Submit</Button>
                        <Button color={"danger"}>Cancel</Button>
                      </Button.Group>
                    </Form.Field>
                  </Block>
                </Section>)
            }

          </Content>
        </Section>
      </Container>
    </Layout>
  )
}
export default ReviewPage