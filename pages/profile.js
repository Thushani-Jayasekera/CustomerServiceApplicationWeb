import React from "react";
import { Block, Box, Button, Columns, Container, Content, Level, Section } from "react-bulma-components";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../gql/query";
import Loader from "../components/utils/Loader";
import {MapPin} from "react-feather"
import profileImg from "../images/profile.png"
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component/dist/react-stars";
const CommonProfilePage = ()=>{
  const meQuery = useQuery(GET_ME,{
      fetchPolicy:"cache-and-network"
  })
  if(meQuery.loading){
    return <Loader/>
  }
  console.log(meQuery.data)
  return(
    <Layout>
      <Header/>
    <Container>
      <Content>
        <Section>
          <Level>
            <Level.Item>
              <h1>Profile page </h1>
            </Level.Item>
            <Level.Side align={"right"}>
              <Level.Item>
                <Link to={"/editProfile"}>
                  <Button color={"info"}>Edit Profile</Button>
                </Link>
              </Level.Item>
            </Level.Side>
          </Level>
        </Section>
        <Section>
          <Columns>
            <Columns.Column>
              <Level>
                <Level.Item>
                  <img crossOrigin={"anonymous"} src={meQuery.data.me.profile_url || profileImg} width={"256px"} />
                </Level.Item>
              </Level>
              <Level>
                <Level.Item>
                  Service Providing Area
                </Level.Item>
                <Level.Item>
                  <hr/>
                </Level.Item>
              </Level>
              <Level>
                <Level.Item>
                  <Link to={"/myBids"}>
                    <Button color={"link"}>My Bids</Button>
                  </Link>
                </Level.Item>
                <Level.Item>
                  <Link to={'/profile/serviceRequestsForMe'}>
                  <Button color={"link"}>Service requests for me </Button>
                  </Link>
                </Level.Item>
              </Level>
              <Level>
                <Level.Item>
                  Service Requesting Area
                </Level.Item>
                <Level.Item>
                  <hr/>
                </Level.Item>
              </Level>
              <Level>
                <Level.Item>
                  <Link to={"/myJobPostings"}>
                    <Button color={"link"}>My Job Postings</Button>
                  </Link>
                </Level.Item>
                <Level.Item>
                  <Link to={'/profile/serviceRequestsSent'}>
                  <Button color={"link"}>Service requests for me </Button>
                  </Link>
                </Level.Item>
              </Level>
            </Columns.Column>
            <Columns.Column>
              <Level>
                <Level.Side>
                  <Level.Item>
                    <h3>{meQuery.data.me.fullname}</h3>
                  </Level.Item>
                </Level.Side>
                  <Level.Item>
                    <h6>  <MapPin/> {meQuery.data.me.town} , {meQuery.data.me.city}</h6>
                  </Level.Item>
              </Level>
              <Level>
                <Level.Side>
                  <Level.Item>
                   <Block textColor={"info"}>
                    @{meQuery.data.me.username}
                   </Block>
                  </Level.Item>
                </Level.Side>
              </Level>
              <Level>
                <Level.Side align={"left"}>
                  <Level.Item>
                    <h6>
                      {meQuery.data.me.profession}
                    </h6>
                  </Level.Item>
                </Level.Side>
              </Level>
              <Level>
                <Level.Side>
                  <Level.Item>
                    <p className={"has-text-link"}>"{meQuery.data.me.bio}"</p>
                  </Level.Item>
                </Level.Side>
              </Level>
              <Block  textSize={3}>
                Rating Area
              </Block>
              <Level>
                <Level.Side align={"left"} textWeight={"bold"}>
                  Rating as a provider:
                </Level.Side>
                <Level.Side align={"right"}>
                  <Level.Item>
                    {
                      (meQuery.data.me.rating && meQuery.data.me.rating.providerRating > 0) && (
                        <ReactStars edit={false} value={meQuery.data.me.rating.providerRating} count={5} size={36} />
                      )
                    }

                  </Level.Item>
                </Level.Side>
              </Level>
              <Level>
                Send message
              </Level>
              <Section>
                <h6>
                  Contact Information
                </h6>
                <ul>
                  <li>
                    <Level>
                      <Level.Side>
                        <Block textWeight={"bold"}>
                          Contact Num
                        </Block>
                      </Level.Side>
                      <Level.Side align={"right"}>
                        {meQuery.data.me.contactNum}
                      </Level.Side>
                    </Level>
                  </li>
                  <li>
                    <Level>
                      <Level.Side>
                        <Block textWeight={"bold"}>
                          Address
                        </Block>
                      </Level.Side>
                      <Level.Side align={"right"}>
                        {meQuery.data.me.address}
                      </Level.Side>
                    </Level>
                  </li>
                  <li>
                    <Level>
                      <Level.Side>
                        <Block textWeight={"bold"}>
                          Email
                        </Block>
                      </Level.Side>
                      <Level.Side align={"right"}>
                        {meQuery.data.me.email}
                      </Level.Side>
                    </Level>
                  </li>
                </ul>
              </Section>
            </Columns.Column>
          </Columns>
        </Section>
      </Content>
    </Container>
    </Layout>
  )
}

export default CommonProfilePage