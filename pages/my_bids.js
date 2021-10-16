import React from "react";
import { Button, Container, Content, Section } from "react-bulma-components";
import { useQuery } from "@apollo/client";
import { GET_MY_BIDS } from "../gql/query";
import Loader from "../components/utils/Loader";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Image } from "cloudinary-react";
import LargeTileCenter from "../components/LargeTileCenter";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
const MyBidsPage = ()=>{
  const get_green_button_text = (state)=>{
    if(state === "selected"){
      return "Complete Job"
    }
    else{
      return null
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
                                          red_button_text={"Cancel bid"}
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