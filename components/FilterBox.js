import React from "react";
import { Button, Container, Content, Form } from "react-bulma-components";
import tw from "twin.macro";
import * as provinces from "../data/provinces.json";
import { useQuery } from "@apollo/client";
import { GET_ALL_SERVICE_TYPES } from "../gql/query";
import Loader from "./utils/Loader";
import * as towns from "../data/towns.json";
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
  const servicesQuery = useQuery(GET_ALL_SERVICE_TYPES)
  if(servicesQuery.loading) return <Loader/>
  return(
    <StyledContainer>
      <Content>
        <StyledH6>Filters</StyledH6>
        <StyledP>Province</StyledP>
        <select  name={"jobPostingFeedProvince"}
                 onChange={handleChange}
                 required tw={"w-full px-8 py-4 rounded-lg"}
                 value={values.jobPostingFeedProvince}
        >
          {Object.keys(provinces).map((item,key)=>{
            return <option key={key}>{item}</option>
          })}
        </select>
        <StyledP>City</StyledP>
        {/*<Form.Input name={"jobPostingFeedCity"} onChange={handleChange} value={values.jobPostingFeedCity}/>*/}
        <select  name={"jobPostingFeedCity"}
                 onChange={handleChange} required tw={"w-full px-8 py-4 rounded-lg"} value={values.jobPostingFeedCity}>
          {provinces[values.jobPostingFeedProvince].map((item,key)=><option key={key}>{item}</option>)}
        </select>
        <StyledP>Town</StyledP>
        {/*<Form.Input name={"jobPostingFeedTown"} onChange={handleChange} value={values.jobPostingFeedTown} />*/}
        <select  name={"jobPostingFeedTown"}
                 placeholder="Town"
                 onChange={handleChange}
                 required
                 tw={"w-full px-8 py-4 rounded-lg"}>
          {towns[values.jobPostingFeedCity].cities.map((item,key)=><option key={key}>{item}</option>)}
        </select>
        <StyledP>Category</StyledP>
        {/*<Form.Input name={"jobPostingFeedCategory"} onChange={handleChange} value={values.jobPostingFeedCategory} />*/}
        <select name={"jobPostingFeedCategory"} onChange={handleChange} tw={"w-full px-8 py-4 rounded-lg"} value={values.jobPostingFeedCategory}>
          {servicesQuery.data.viewAllServiceTypes.map((item,key)=><option key={key}>{item.service_name}</option>)}
        </select>
        <StyledButton color={"success"} onClick={()=>{refetch({...values})}}>Fetch Results</StyledButton>
      </Content>
    </StyledContainer>
  )
}
export default FilterBox