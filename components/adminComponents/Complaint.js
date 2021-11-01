import React from 'react';
import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';

/*************************** Styles *****************************/

const Article = styled.article`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  & h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    letter-spacing: 5px;
  }
  & h4 {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    color: hsl(210, 22%, 49%);
    background: hsl(212, 33%, 89%);
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
  }
`;

const LittleContainer = styled.p`
  letter-spacing: 0.1rem;
  margin: 5px auto;
`;
const ComplaintContainer = styled.p`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 2rem;
  align-items: center;
  margin-bottom: 1.25rem;
`;
const ComplaintText = styled.p`
  margin-bottom: 0;
  color: hsl(209, 34%, 30%);
`;

const OuterContainer = styled.div`
  background-color: #2caeba;
  margin: 10px;
  padding: 10px;
  width: 100%;
  height: 250px;
  box-sizing: border-box;
`;
/*************************** End Styles *****************************/

const Complaint = ({ id, complainer, victim, title, complaint, date }) => {
  return (
    <OuterContainer>
      <Article>
        <h3>{title}</h3>
        <LittleContainer>Complained By :{complainer}</LittleContainer>
        <LittleContainer>{date}</LittleContainer>
        <h4>Victim :{victim}</h4>
        <ComplaintContainer>
          <FaAngleDoubleRight style={{ color: 'black' }}></FaAngleDoubleRight>
          <ComplaintText>{complaint}</ComplaintText>
        </ComplaintContainer>
      </Article>
    </OuterContainer>
  );
};
export default Complaint;
