import React from "react";
import { Button, Container, Content, Section } from "react-bulma-components";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MY_BIDS } from "../gql/query";
import Loader from "../components/utils/Loader";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Image } from "cloudinary-react";
import LargeTileCenter from "../components/LargeTileCenter";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { CHANGE_JOB_BID_STATE } from "../gql/mutation";
import { useToasts } from "react-toast-notifications";
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
const MyBidsPage = ({history})=>{
  const get_green_button_text = (state)=>{
    if(state === "selected"){
      return "Complete Job"
    }
    else if(state === "paid"){
      return "Add review"
    }
    else{
      return null
    }
  }
  const {addToast} = useToasts()
  const [changeStateJobBid,changeStateJobBidStatus] = useMutation(CHANGE_JOB_BID_STATE,{
    onCompleted:(data => {
      addToast("Successfully changed",{
        appearance:"success"
      })
      location.reload()
    }),
    onError:(error => {
      addToast("Error "+error.message ,{
        appearance:"error"
      })
    })
  })
  const get_green_button_fn = (state,id)=>{
    if (state === "selected"){
      return (event)=>{
        event.preventDefault()
        changeStateJobBid({
          variables:{
            jobBidId:id,
            jobBidState:"completed"
          }
        }).then((data)=>console.log(data)).catch((error)=>console.log(error))
      }
    }
    else if(state ==="paid"){
      return (event)=>{
        event.preventDefault()
        console.log("Clicked")
        history.push("/providerReview/add/"+id)
      }
    }
    else{
      return undefined
    }
  }
  const get_red_button_fn = (state,id)=>{
    if(["requested","selected"].includes(state)){
      return (event)=>{
        event.preventDefault()
        changeStateJobBid({
          variables:{
            jobBidId:id,
            jobBidState:"canceled"
          }
        }).then((data)=>console.log(data)).catch((error)=>console.log(error))
      }
    }
  }
  const get_red_button_text = (state)=>{
    if(["requested","selected"].includes(state)){
      return "Cancel Bid"
    }else{
      return undefined
    }
  }
  const bidsQuery = useQuery(GET_MY_BIDS,{
    variables:{
      state:"requested"
    },
    fetchPolicy:"cache-and-network"
  })
  const switchState = (state)=>(event)=>{
    event.preventDefault()
    bidsQuery.refetch({
      state:state
    }).then(data=>console.log(data))
  }
  if(bidsQuery.loading) return <Loader/>
  return(
    <Layout>
     <Header/>
      <Container>
        <Content>
          <Section>
            <h1>My Bids</h1>
          </Section>
          <Section>
            <Button.Group>
              <Button onClick={switchState("requested")}>Requested Bids</Button>
              <Button onClick={switchState("selected")}>Selected Bids</Button>
              <Button onClick={switchState("completed")}>Completed Bids</Button>
              <Button onClick={switchState("paid")}>Paid Bids</Button>
              <Button onClick={switchState("canceled")}>Canceled Bids</Button>
            </Button.Group>
          </Section>
          <Section>
            {
              (bidsQuery.data.getMyBids.length>0)?(
                bidsQuery.data.getMyBids.map((bid,i)=>{
                  return <LargeTileCenter key={i} top_left={"PostedBy: @" +bid.jobPosting.postedBy.username} top_middle={bid.jobPosting.heading} top_right={bid.state.toUpperCase()}
                                          bottom_right={timeAgo.format(new Date(bid.updatedAt))}
                                          bottom_left={"Scheduled on: "+ new Date(bid.proposedDate).toLocaleString()}
                                          center_middle={<div>
                                            <p>Proposed amount <b>LKR {bid.proposedAmount}</b></p>
                                            <p>Detailed Breakdown: </p>
                                            <p>{bid.detailedBreakdown}</p>
                                          </div>}
                                          green_button_text={get_green_button_text(bid.state)}
                                          green_button_fn={get_green_button_fn(bid.state,bid.id)}
                                          red_button_text={get_red_button_text(bid.state)}
                                          red_button_fn={get_red_button_fn(bid.state,bid.id)}
                  />
                })
              ):(<p>No bids yet</p>)
            }
          </Section>
        </Content>

      </Container>
    </Layout>
  )
}

export default MyBidsPage