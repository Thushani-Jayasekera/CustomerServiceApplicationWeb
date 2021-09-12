import React from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";


const Testimonial = tw.div`px-3 py-3 sm:px-5 sm:py-5 focus:outline-none flex! flex-col justify-between bg-gray-200 rounded my-5 hover:bg-primary-100`
const QuoteContainer = tw.div`relative`
// const QuoteIcon = tw(QuoteIconBase)`absolute opacity-15 top-0 left-0 transform -translate-y-2 -translate-x-1/2 sm:-translate-x-full w-10 fill-current text-primary-500`
const Quote = tw.blockquote`font-medium sm:font-normal relative text-sm sm:text-xl text-center sm:text-left`
const CustomerNameAndProfileContainer = tw.div`mt-4 sm:mt-0 sm:ml-1 flex flex-col`
const CustomerName = tw.span`text-lg font-semibold`
const CustomerProfile = tw.span`text-sm font-normal text-gray-700`
const CustomerInfoAndControlsContainer = tw.div`mt-8 flex items-center flex-col sm:flex-row justify-center text-center sm:text-left`
const ControlsContainer = tw.div`sm:ml-auto flex`
const JobPosting = ({id,heading,postedBy,location,lowerLimit,upperLimit})=>{
  return(
    <Link to={`/job_posting/${id}`}>
      <Testimonial>
        <QuoteContainer>
          <Quote>
            {heading}
          </Quote>
        </QuoteContainer>
        <CustomerInfoAndControlsContainer>
          <CustomerNameAndProfileContainer>
            <CustomerName>
              {postedBy}
            </CustomerName>
            <CustomerProfile>
              {location}
            </CustomerProfile>
          </CustomerNameAndProfileContainer>
          <ControlsContainer>
            Price range : {lowerLimit} - {upperLimit}
          </ControlsContainer>
        </CustomerInfoAndControlsContainer>
      </Testimonial>
    </Link>
  )
}
export default JobPosting