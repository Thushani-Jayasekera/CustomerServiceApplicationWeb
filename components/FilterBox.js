import React from "react";
import { Button, Container, Content, Form } from "react-bulma-components";
import tw from "twin.macro";
const StyledContainer = tw(Container)`
  bg-purple-100
  rounded
  ml-0
  px-5 pt-2
  w-full
`
const StyledH6 = tw.h4`
  text-center
`
const StyledP = tw.p`
  mt-5
`
const StyledButton = tw(Button)`
  mx-0
  mt-5
`



const FilterBox = ({values,setValues,refetch})=>{
  const handleChange = event=>{
    setValues({
      ...values,
      [event.target.name]:event.target.value
    })
  };
  return(
    <StyledContainer>
      <Content>
        <StyledH6>Filters</StyledH6>
        <StyledP>Province</StyledP>
        <Form.Input name={"jobPostingFeedProvince"} onChange={handleChange} value={values.jobPostingFeedProvince}/>
        <StyledP>City</StyledP>
        <Form.Input name={"jobPostingFeedCity"} onChange={handleChange} value={values.jobPostingFeedCity}/>
        <StyledP>Town</StyledP>
        <Form.Input name={"jobPostingFeedTown"} onChange={handleChange} value={values.jobPostingFeedTown} />
        <StyledP>Category</StyledP>
        <Form.Input name={"jobPostingFeedCategory"} onChange={handleChange} value={values.jobPostingFeedCategory} />
        <StyledButton color={"success"} onClick={()=>{refetch({...values})}}>Fetch Results</StyledButton>
      </Content>
    </StyledContainer>
  )
}
export default FilterBox