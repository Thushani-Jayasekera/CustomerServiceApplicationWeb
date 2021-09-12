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
export {MAKE_ME_SERVICE_PROVIDER, ADD_DETAILS,CREATE_NEW_SR,CREATE_NEW_BIDDING_JOB}