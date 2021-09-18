import { gql } from "@apollo/client";

const MAKE_ME_SERVICE_PROVIDER = gql`
    mutation Mutation($makeMeServiceProviderNic: String!, $makeMeServiceProviderProfession: String!, $makeMeServiceProviderProvince: String!, $makeMeServiceProviderCity: String!, $makeMeServiceProviderTown: String!, $makeMeServiceProviderBio: String) {
        makeMeServiceProvider(nic: $makeMeServiceProviderNic, profession: $makeMeServiceProviderProfession, province: $makeMeServiceProviderProvince, city: $makeMeServiceProviderCity, town: $makeMeServiceProviderTown, bio: $makeMeServiceProviderBio) {
            id
            bio
            roles
        }
    }
    
`

const ADD_DETAILS = gql`
    mutation AddDetailsSR($registerServiceRequesterContactNum: String!, $registerServiceRequesterAddress: String!, $registerServiceRequesterCity: String!, $registerServiceRequesterPostalCode: String!){
  registerServiceRequester(contactNum: $registerServiceRequesterContactNum, address: $registerServiceRequesterAddress, city: $registerServiceRequesterCity, postalCode: $registerServiceRequesterPostalCode){
    id
    address
  }
}
`
const CREATE_NEW_SR = gql`
    mutation CreateSR($createServiceRequestTask: String!, $createServiceRequestDate: String!, $createServiceRequestTime: String!, $createServiceRequestProviderId: ID, $createServiceRequestPayMethod: String, $createServiceRequestMinPrice: String, $createServiceRequestMaxPrice: String, $createServiceRequestImage1: String, $createServiceRequestImage2: String, $createServiceRequestImage3: String){
  createServiceRequest(task: $createServiceRequestTask, date: $createServiceRequestDate, time: $createServiceRequestTime,provider_id: $createServiceRequestProviderId, payMethod: $createServiceRequestPayMethod, min_price: $createServiceRequestMinPrice, max_price: $createServiceRequestMaxPrice, image1: $createServiceRequestImage1, image2: $createServiceRequestImage2, image3: $createServiceRequestImage3) {
    task
    max_price
  }
}
`
const CREATE_NEW_BIDDING_JOB = gql`
mutation CreateBiddingJobMutation($createBiddingJobTask: String!, $createBiddingJobDate: String, $createBiddingJobTime: String, $createBiddingJobPayMethod: String, $createBiddingJobMinPrice: String, $createBiddingJobMaxPrice: String, $createBiddingJobImage1: String, $createBiddingJobImage2: String, $createBiddingJobImage3: String) {
  createBiddingJob(task: $createBiddingJobTask, date: $createBiddingJobDate, time: $createBiddingJobTime, payMethod: $createBiddingJobPayMethod, min_price: $createBiddingJobMinPrice, max_price: $createBiddingJobMaxPrice, image1: $createBiddingJobImage1, image2: $createBiddingJobImage2, image3: $createBiddingJobImage3) {
    requester_id
    date
    time
    task
    min_price
    max_price
    image1
    image2
    image3
  }
}
`

const ADD_JOB_BID = gql`
    mutation CreateJobBidMutation(
        $createJobBidProposedAmount: Float!
        $createJobBidProposedDate: String!
        $createJobBidJobPosting: ID!
        $createJobBidDetailedBreakdown: String
    ) {
        createJobBid(
            proposedAmount: $createJobBidProposedAmount
            proposedDate: $createJobBidProposedDate
            jobPosting: $createJobBidJobPosting
            detailedBreakdown: $createJobBidDetailedBreakdown
        ) {
            proposedAmount
        }
    }

`

const ADD_JOB_POSTING  = gql`
    mutation Mutation($createJobPostingHeading: String!, $createJobPostingProvince: String!, $createJobPostingCity: String!, $createJobPostingTown: String!, $createJobPostingCategory: String!, $createJobPostingDescription: String!, $createJobPostingLowerLimit: Float!, $createJobPostingUpperLimit: Float!) {
        createJobPosting(heading: $createJobPostingHeading, province: $createJobPostingProvince, city: $createJobPostingCity, town: $createJobPostingTown, category: $createJobPostingCategory, description: $createJobPostingDescription, lowerLimit: $createJobPostingLowerLimit, upperLimit: $createJobPostingUpperLimit) {
            id
            heading
            description
        }
    }

`

const CANCEL_SR=gql`
mutation CancelServiceRequestMutation($cancelServiceRequestId: ID) {
  cancelServiceRequest(id: $cancelServiceRequestId) {
    date
    time
    task
    state
  }
}

`;

const REJECT_SR=gql`
mutation RejectServiceRequestMutation($rejectServiceRequestId: ID) {
  rejectServiceRequest(id: $rejectServiceRequestId) {
    date
    time
    task
    state
  }
}
`;

const ACCEPT_SR=gql`
mutation AcceptServiceRequestMutation($acceptServiceRequestId: ID, $acceptServiceRequestEstimate: String) {
  acceptServiceRequest(id: $acceptServiceRequestId, estimate: $acceptServiceRequestEstimate) {
    date
    time
    state
    estimate
  }
}
`;


const RESCHEDULE_SR=gql`
mutation RescheduleServiceRequestMutation($rescheduleServiceRequestDate: String!, $rescheduleServiceRequestTime: String!, $rescheduleServiceRequestId: ID) {
  rescheduleServiceRequest(date: $rescheduleServiceRequestDate, time: $rescheduleServiceRequestTime, id: $rescheduleServiceRequestId) {
    date
    time
  }
}
`;


const EDIT_SR=gql`
mutation EditServiceRequestMutation($editServiceRequestTask: String!, $editServiceRequestId: ID, $editServiceRequestImage1: String, $editServiceRequestImage2: String, $editServiceRequestImage3: String) {
  editServiceRequest(id: $editServiceRequestId,task: $editServiceRequestTask, image1: $editServiceRequestImage1, image2: $editServiceRequestImage2, image3: $editServiceRequestImage3) {
    task
  }
}
`;
export {MAKE_ME_SERVICE_PROVIDER, ADD_DETAILS,CREATE_NEW_SR,CREATE_NEW_BIDDING_JOB,ADD_JOB_BID,ADD_JOB_POSTING,CANCEL_SR,ACCEPT_SR,REJECT_SR,RESCHEDULE_SR,EDIT_SR}