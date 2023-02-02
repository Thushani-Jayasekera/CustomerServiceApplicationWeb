import React from "react";
import { Box, Button, Columns, Container, Content, Section } from "react-bulma-components";

const Messenger2Page = ()=>{
  return(
    <Container>
      <Section>
        <Content>
         <h1>Messenger 2</h1>
        </Content>
      </Section>
      <Section>
        <Columns>
          <Columns.Column>
            <h2>Column 1</h2>
            <Box>
              <h6>Username</h6>
              <Button>Add to chat </Button>
              <Button onClick={(event)=>{location.reload()}}>
                Refresh
              </Button>
            </Box>
          </Columns.Column>
          <Columns.Column>
            <h2>Column 2</h2>
          </Columns.Column>
        </Columns>
      </Section>
    </Container>
  )
}

export default Messenger2Page