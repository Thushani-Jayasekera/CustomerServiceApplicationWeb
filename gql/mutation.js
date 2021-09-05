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
export {MAKE_ME_SERVICE_PROVIDER, ADD_DETAILS,CREATE_NEW_SR}