import React from 'react';
import styled from 'styled-components';
import { FaAngleDoubleRight, FaTrashAlt } from 'react-icons/fa';

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
const ComplaintContainer = styled.div`
  display: flex;
  overflow: hidden;
  align-items: baseline;
  margin-bottom: 1.25rem;
`;
const ComplaintText = styled.p`
  margin-bottom: 0;
  color: black;
  margin-left: 1rem;
`;

const OuterContainer = styled.div`
  background-color: #2caeba;
  margin: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  color: #fff;
  transition: all 0.2s linear;
  :hover {
    margin-left: 2rem;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  display: block;
  width: 150px;
  letter-spacing: 0.1rem;
  background-color: hsl(360, 67%, 44%);
  color: white;
  border: 1px solid hsl(360, 67%, 44%);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  :hover {
    background-color: white;
    color: hsl(360, 67%, 44%);
  }
`;

/*************************** End Styles *****************************/

const Complaint = ({
  id,
  complainer,
  victim,
  title,
  complaint,
  date,
  removeComplaint
}) => {
  return (
    <OuterContainer>
      <Article>
        <h3>{title}</h3>
        <LittleContainer>Complained By :{complainer}</LittleContainer>
        <LittleContainer>{date}</LittleContainer>
        <h4>Victim :{victim}</h4>
        <ComplaintContainer>
          <FaAngleDoubleRight
            style={{ color: 'black', marginRight: '0', marginTop: 2 }}
          ></FaAngleDoubleRight>
          <ComplaintText>{complaint}</ComplaintText>
        </ComplaintContainer>
        <BottomContainer>
          <Button onClick={() => removeComplaint(id)}>Resolved</Button>
        </BottomContainer>
      </Article>
    </OuterContainer>
  );
};
export default Complaint;
