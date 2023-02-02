import React from "react";
import { Box, Button, Container, Content, Level, Section } from "react-bulma-components";
import Layout from "../components/Layout";
import Header from "../components/Header";
import tw from "twin.macro"
import LargeTileCenter from "../components/LargeTileCenter";
import { useMutation, useQuery } from "@apollo/client";
import { GET_JOB_POSTING_STATE, GET_ME, GET_MY_JOB_POSTING_BIDS } from "../gql/query";
import Loader from "../components/utils/Loader";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { ACCEPT_JOB_BID } from "../gql/mutation";
import { useToasts } from "react-toast-notifications";
import { AccountCategory, CheckoutParams, CurrencyType, Customer, Payhere, PayhereCheckout } from "payhere-js-sdk";
TimeAgo.addDefaultLocale(en)
Payhere.init('1218090',AccountCategory.SANDBOX)
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
  const meQuery = useQuery(GET_ME)
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
  const get_red_button_fn = ()=>{

  }

  if(jobBidQuery.loading || jobPostingQuery.loading || meQuery.loading) return <Loader/>
  if(jobBidQuery.error || jobPostingQuery.error || meQuery.error) return <p>{jobBidQuery.error.message || jobPostingQuery.error.message}</p>
  const get_green_button_fn = (bid_id,bid_heading,bid_amount)=>(event)=>{
    event.preventDefault()
    try {
      const customer = new Customer({
        first_name:meQuery.data.me.fullname,
        last_name:meQuery.data.me.fullname,
        phone:meQuery.data.me.contactNum,
        email:meQuery.data.me.email,
        address:meQuery.data.me.address,
        city:meQuery.data.me.city,
        country:"Sri Lanka"
      })
      const checkoutData = new CheckoutParams({
        returnUrl: `https://customerserviceapplication.netlify.app/payment/success`,
        cancelUrl: `https://customerserviceapplication.netlify.app/payment/failure`,
        notifyUrl: `https://customerserviceapplication.herokuapp.com/payment/notify`,
        order_id: 'B'+bid_id,
        itemTitle: "Test",
        currency: CurrencyType.LKR,
        amount: bid_amount
      })
      const checkout =new PayhereCheckout(customer,checkoutData,(error)=>alert(error))
      checkout.start()
    }
    catch (e) {
      console.log(e)
    }
  }
  return(
    <Layout>
      <Header/>
      <Container>
        <Section>
          <Content>
            {jobPostingQuery.data.jobPosting.state==="bid_selected" && (
              <span>
                <h1>Selected Bid for the Job </h1>
                <h6>Ref no: {match.params.id}</h6>
              </span>
            )}
            {jobPostingQuery.data.jobPosting.state==="open" && (
              <span>
              <h1>Bids for the Job Posting</h1>
              <h6>Ref no : {match.params.id}</h6>
              </span>
            )}
            {jobPostingQuery.data.jobPosting.state ==="closed" && (
              <Container flexDirection={"column"}>
                <Box textAlign={"center"}>
                  <h1>This Job Posting is Closed</h1>
                  <h6>Ref no: {match.params.id}</h6>
                </Box>
              </Container>
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
                                            red_button_fn={get_red_button_fn()} red_button_text={"Cancel this bid"} extra={`State of the bid is  ${obj.state}`}
                  />
                }else if(obj.state === "completed"){
                  return <LargeTileCenter key={index} top_left={obj.proposedAmount} top_middle={obj.bidBy.fullname}
                                          top_right={obj.bidBy.provider_rating} center_middle={obj.detailedBreakdown}
                                          bottom_left={new Date(obj.proposedDate).toLocaleString()}
                                          bottom_right={timeAgo.format(new Date(obj.updatedAt))}
                                          green_button_text={"Pay for this bid"}
                                          green_button_fn={get_green_button_fn(obj.id,obj.heading,obj.proposedAmount)}
                                          red_button_fn={get_red_button_fn()}  extra={`State of the bid is  ${obj.state}`} />
                }
              })
            )
          }
          {
            jobPostingQuery.data.jobPosting.state ==="completed" && (
             jobBidQuery.data.getMyJobPostingBids.map((obj,index)=>{
               if(obj.state==="paid"){
                 return (
                     <LargeTileCenter key={index} top_left={obj.proposedAmount} top_middle={obj.bidBy.fullname}
                                         top_right={obj.bidBy.provider_rating} center_middle={obj.detailedBreakdown}
                                         bottom_left={new Date(obj.proposedDate).toLocaleString()}
                                         bottom_right={timeAgo.format(new Date(obj.updatedAt))}
                                         green_button_text={"Add review"}
                                         green_button_fn={(event)=>{history.push("/requesterReview/add/"+obj.id)}}
                                         extra={`State of the bid is  ${obj.state}`} />
                 )
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