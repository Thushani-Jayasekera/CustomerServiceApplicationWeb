import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

/*************************** Styles *****************************/
const OuterContainer = styled.div`
  background-color: gray;
  margin: 10px;
  padding: 10px;
  width: 100%;
  height: 250px;
  box-sizing: border-box;
`;

const InnerContainer = styled.div`
  height: 10%;
  width: 100%;
  margin: 5px auto;
  display: flex;
  flex-wrap: wrap;
`;

const ComplaintContainer = styled.div`
  height: 45%;
  width: 100%;
  margin: 5px auto;
  display: flex;
  flex-wrap: wrap;
`;

const LeftContainer = styled.div`
  width: 25%;
`;

const RightContainer = styled.div`
  width: 75%;
`;

const Title = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  color: black;
`;
// const Testimonial = tw.div`px-3 py-3 sm:px-5 sm:py-5 focus:outline-none flex! flex-col justify-between bg-gray-200 rounded my-5 hover:bg-primary-300`;
// const QuoteContainer = tw.div`relative`;
// // const QuoteIcon = tw(QuoteIconBase)`absolute opacity-15 top-0 left-0 transform -translate-y-2 -translate-x-1/2 sm:-translate-x-full w-10 fill-current text-primary-500`
// const Quote = tw.blockquote`font-medium sm:font-normal relative text-sm sm:text-xl text-center sm:text-left`;
// const CustomerNameAndProfileContainer = tw.div`mt-4 sm:mt-0 sm:ml-1 flex flex-col`;
// const CustomerName = tw.span`text-lg font-semibold`;
// const CustomerProfile = tw.span`text-sm font-normal text-gray-700`;
// const CustomerInfoAndControlsContainer = tw.div`mt-8 flex items-center flex-col sm:flex-row justify-center text-center sm:text-left`;
// const ControlsContainer = tw.div`sm:ml-auto flex`;

const Complaint = ({ id, complainer, victim, title, complaint, date }) => {
  return (
    <OuterContainer>
      <InnerContainer>
        <LeftContainer>
          <Title>Complainer Name</Title>
        </LeftContainer>
        <RightContainer>
          <Title>{complainer}</Title>
        </RightContainer>
      </InnerContainer>
      <InnerContainer>
        <LeftContainer>
          <Title>Victim Name</Title>
        </LeftContainer>
        <RightContainer>
          <Title>{victim}</Title>
        </RightContainer>
      </InnerContainer>
      {/* <InnerContainer>
        <LeftContainer>
          <Title>Date And Time</Title>
        </LeftContainer>
        <RightContainer>
          <Title>{date}</Title>
        </RightContainer>
      </InnerContainer> */}
      <InnerContainer>
        <LeftContainer>
          <Title>Title</Title>
        </LeftContainer>
        <RightContainer>
          <Title>{title}</Title>
        </RightContainer>
      </InnerContainer>
      <ComplaintContainer>
        <LeftContainer>
          <Title>Complaint</Title>
        </LeftContainer>
        <RightContainer>
          <Title>{complaint}</Title>
        </RightContainer>
      </ComplaintContainer>
    </OuterContainer>

    // <Testimonial>
    //   <QuoteContainer>
    //     <Quote>Complainer : {complainer}</Quote>
    //     <Quote>Victim : {victim}</Quote>
    //     <ControlsContainer>Date And Time : {date}</ControlsContainer>
    //   </QuoteContainer>
    //   <QuoteContainer>
    //     <CustomerName>About : {title}</CustomerName>
    //     <ControlsContainer>{complaint}</ControlsContainer>
    //   </QuoteContainer>
    // </Testimonial>
  );
};
export default Complaint;
