import React from "react";
import { Columns, Container, Content, Section } from "react-bulma-components";
import Layout from "../components/Layout";
import Header from "../components/Header";

const JobPostingPage = ({match})=>{
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

                    </Columns.Column>
                  </Columns>
                </Content>
              </Section>
            </Container>
        </Layout>
    )
}

export default JobPostingPage