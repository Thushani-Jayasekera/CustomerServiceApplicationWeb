import React from "react";
import { Box, Button, Container, Content, Level, Section } from "react-bulma-components";
import Layout from "../components/Layout";
import Header from "../components/Header";
import tw from "twin.macro"
import LargeTileCenter from "../components/LargeTileCenter";
import { useMutation, useQuery } from "@apollo/client";
import { GET_JOB_POSTING_STATE, GET_MY_JOB_POSTING_BIDS } from "../gql/query";
import Loader from "../components/utils/Loader";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { ACCEPT_JOB_BID } from "../gql/mutation";
import { useToasts } from "react-toast-notifications";
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
const MyJobPostingBidsPage = ({match,history})=>{
  const {addToast} = useToasts()
  const jobPostingQuery = useQuery(GET_JOB_POSTING_STATE,{
    variables:{
      jobPostingId:match.params.id
    }
  })
  const jobBidQuery = useQuery(GET_MY_JOB_POSTING_BIDS,{
    variables:{
      getMyJobPostingBidsId:match.params.id
    }
  })
  const [acceptJobBid,acceptJobBidStatus] = useMutation(ACCEPT_JOB_BID,{
    onCompleted:(data)=>{
      addToast("Success",{appearance:"success"})
      history.push("/myJobPostings")
    }
  })
  const handleAcceptJobBid = (jobBidId)=>(event)=>{
    event.preventDefault()
    acceptJobBid({
     variables:{
       acceptJobBidJobPostingId:match.params.id,
       acceptJobBidJobBidId:jobBidId
     }
    }).then(data=>console.log(data))
  }
  if(jobBidQuery.loading || jobPostingQuery.loading) return <Loader/>
  if(jobBidQuery.error || jobPostingQuery.error) return <p>{jobBidQuery.error.message || jobPostingQuery.error.message}</p>
  return(
    <Layout>
      <Header/>
      <Container>
        <Section>
          <Content>
            {jobPostingQuery.data.jobPosting.state==="bid_selected" && (
              <span>
                <h1>Selected Bid for the Job</h1>
                <h6>Ref no: {match.params.id}</h6>
              </span>
            )}
            {jobPostingQuery.data.jobPosting.state==="open" && (
              <span>
              <h1>Bids for the Job Posting</h1>
              <h6>Ref no : {match.params.id}</h6>
              </span>
            )}
          </Content>
        </Section>
        <Section>
          {jobPostingQuery.data.jobPosting.state ==="open" && (jobBidQuery.data.getMyJobPostingBids.map((obj,key)=>{
            return <LargeTileCenter key={key}  top_left={obj.proposedAmount} top_middle={obj.bidBy.fullname}
                                    top_right={obj.bidBy.provider_rating} center_middle={obj.detailedBreakdown}
                                    bottom_left={new Date(obj.proposedDate).toLocaleString()}
                                    bottom_right={timeAgo.format(new Date(obj.updatedAt))}
                                    green_button_fn={handleAcceptJobBid(obj.id)} green_button_text={"Select this bid"} red_button_fn={""} red_button_text={"Remove this bid"}
            />
          }))}
          {
            jobPostingQuery.data.jobPosting.state ==="bid_selected" &&(
              jobBidQuery.data.getMyJobPostingBids.map((obj,index)=>{
                if(obj.state==="selected"){
                  return <LargeTileCenter key={index} top_left={obj.proposedAmount} top_middle={obj.bidBy.fullname}
                                          top_right={obj.bidBy.provider_rating} center_middle={obj.detailedBreakdown}
                                          bottom_left={new Date(obj.proposedDate).toLocaleString()}
                                          bottom_right={timeAgo.format(new Date(obj.updatedAt))}
                                          green_button_fn={""} green_button_text={"Pay for this bid"} red_button_fn={""} red_button_text={"Cancel this bid"} extra={`State of the bid is  ${obj.state}`}
                  />
                }
              })
            )
          }
        </Section>

      </Container>
    </Layout>
  )

}
export default MyJobPostingBidsPage