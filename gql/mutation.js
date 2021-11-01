import { gql } from '@apollo/client';

const MAKE_ME_SERVICE_PROVIDER = gql`
  mutation Mutation(
    $makeMeServiceProviderFullname: String!
    $makeMeServiceProviderNic: String!
    $makeMeServiceProviderProfession: String!
    $makeMeServiceProviderAddress: String!
    $makeMeServiceProviderContactNumber: String!
    $makeMeServiceProviderProvince: String!
    $makeMeServiceProviderCity: String!
    $makeMeServiceProviderTown: String!
    $makeMeServiceProviderBio: String
  ) {
    makeMeServiceProvider(
      fullname: $makeMeServiceProviderFullname
      nic: $makeMeServiceProviderNic
      profession: $makeMeServiceProviderProfession
      address: $makeMeServiceProviderAddress
      contactNumber: $makeMeServiceProviderContactNumber
      province: $makeMeServiceProviderProvince
      city: $makeMeServiceProviderCity
      town: $makeMeServiceProviderTown
      bio: $makeMeServiceProviderBio
    ) {
      id
      bio
      roles
    }
  }
`;

const UPDATE_ME = gql`
  mutation Mutation(
    $updateMeFullname: String
    $updateMeContactNum: String
    $updateMeAddress: String
    $updateMeProfession: String
    $updateMeProvince: String
    $updateMeCity: String
    $updateMeTown: String
    $updateMePostalCode: String
  ) {
    updateMe(
      fullname: $updateMeFullname
      contactNum: $updateMeContactNum
      address: $updateMeAddress
      profession: $updateMeProfession
      province: $updateMeProvince
      city: $updateMeCity
      town: $updateMeTown
      postalCode: $updateMePostalCode
    ) {
      id
      username
      email
    }
  }
`;
const ADD_DETAILS = gql`
  mutation AddDetailsSR(
    $registerServiceRequesterContactNum: String!
    $registerServiceRequesterAddress: String!
    $registerServiceRequesterCity: String!
    $registerServiceRequesterPostalCode: String!
  ) {
    registerServiceRequester(
      contactNum: $registerServiceRequesterContactNum
      address: $registerServiceRequesterAddress
      city: $registerServiceRequesterCity
      postalCode: $registerServiceRequesterPostalCode
    ) {
      id
      address
    }
  }
`;
const CREATE_NEW_SR = gql`
  mutation CreateSR(
    $createServiceRequestTask: String!
    $createServiceRequestDate: String!
    $createServiceRequestTime: String!
    $createServiceRequestProviderId: ID
    $createServiceRequestPayMethod: String
    $createServiceRequestMinPrice: String
    $createServiceRequestMaxPrice: String
    $createServiceRequestLocation: String
    $createServiceRequestImage1: String
    $createServiceRequestImage2: String
    $createServiceRequestImage3: String
  ) {
    createServiceRequest(
      task: $createServiceRequestTask
      date: $createServiceRequestDate
      time: $createServiceRequestTime
      provider_id: $createServiceRequestProviderId
      payMethod: $createServiceRequestPayMethod
      min_price: $createServiceRequestMinPrice
      max_price: $createServiceRequestMaxPrice
      location: $createServiceRequestLocation
      image1: $createServiceRequestImage1
      image2: $createServiceRequestImage2
      image3: $createServiceRequestImage3
    ) {
      task
      max_price
      location
    }
  }
`;
const CREATE_NEW_BIDDING_JOB = gql`
  mutation CreateBiddingJobMutation(
    $createBiddingJobTask: String!
    $createBiddingJobDate: String
    $createBiddingJobTime: String
    $createBiddingJobPayMethod: String
    $createBiddingJobMinPrice: String
    $createBiddingJobMaxPrice: String
    $createBiddingJobImage1: String
    $createBiddingJobImage2: String
    $createBiddingJobImage3: String
  ) {
    createBiddingJob(
      task: $createBiddingJobTask
      date: $createBiddingJobDate
      time: $createBiddingJobTime
      payMethod: $createBiddingJobPayMethod
      min_price: $createBiddingJobMinPrice
      max_price: $createBiddingJobMaxPrice
      image1: $createBiddingJobImage1
      image2: $createBiddingJobImage2
      image3: $createBiddingJobImage3
    ) {
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
`;

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
`;

const ADD_JOB_POSTING = gql`
  mutation Mutation(
    $createJobPostingHeading: String!
    $createJobPostingProvince: String!
    $createJobPostingCity: String!
    $createJobPostingTown: String!
    $createJobPostingCategory: String!
    $createJobPostingDescription: String!
    $createJobPostingLowerLimit: Float!
    $createJobPostingUpperLimit: Float!
  ) {
    createJobPosting(
      heading: $createJobPostingHeading
      province: $createJobPostingProvince
      city: $createJobPostingCity
      town: $createJobPostingTown
      category: $createJobPostingCategory
      description: $createJobPostingDescription
      lowerLimit: $createJobPostingLowerLimit
      upperLimit: $createJobPostingUpperLimit
    ) {
      id
      heading
      description
    }
  }
`;

const CANCEL_SR = gql`
  mutation CancelServiceRequestMutation($cancelServiceRequestId: ID) {
    cancelServiceRequest(id: $cancelServiceRequestId) {
      date
      time
      task
      state
    }
  }
`;

const REJECT_SR = gql`
  mutation RejectServiceRequestMutation($rejectServiceRequestId: ID) {
    rejectServiceRequest(id: $rejectServiceRequestId) {
      date
      time
      task
      state
    }
  }
`;

const COMPLETE_SR = gql`
  mutation CompleteServiceRequestMutation(
    $completeServiceRequestId: ID
    $completeServiceRequestFinalAmount: Int
  ) {
    completeServiceRequest(
      id: $completeServiceRequestId
      finalAmount: $completeServiceRequestFinalAmount
    ) {
      requester_id
      provider_id
      id
      task
      state
    }
  }
`;

const START_SR = gql`
  mutation StartServiceRequestMutation($startServiceRequestId: ID) {
    startServiceRequest(id: $startServiceRequestId) {
      date
      time
      task
      state
    }
  }
`;

const ACCEPT_SR = gql`
  mutation AcceptServiceRequestMutation(
    $acceptServiceRequestId: ID
    $acceptServiceRequestEstimate: String
  ) {
    acceptServiceRequest(
      id: $acceptServiceRequestId
      estimate: $acceptServiceRequestEstimate
    ) {
      date
      time
      state
      estimate
    }
  }
`;

const RESCHEDULE_SR = gql`
  mutation RescheduleServiceRequestMutation(
    $rescheduleServiceRequestDate: String!
    $rescheduleServiceRequestTime: String!
    $rescheduleServiceRequestId: ID
  ) {
    rescheduleServiceRequest(
      date: $rescheduleServiceRequestDate
      time: $rescheduleServiceRequestTime
      id: $rescheduleServiceRequestId
    ) {
      date
      time
    }
  }
`;

const EDIT_SR = gql`
  mutation EditServiceRequestMutation(
    $editServiceRequestTask: String!
    $editServiceRequestId: ID
    $editServiceRequestImage1: String
    $editServiceRequestImage2: String
    $editServiceRequestImage3: String
  ) {
    editServiceRequest(
      id: $editServiceRequestId
      task: $editServiceRequestTask
      image1: $editServiceRequestImage1
      image2: $editServiceRequestImage2
      image3: $editServiceRequestImage3
    ) {
      task
    }
  }
`;

const FEEDBACK_SR = gql`
  mutation FeedbackServiceRequestMutation(
    $feedbackServiceRequestId: ID
    $feedbackServiceRequestRequestRating: Int
    $feedbackServiceRequestRequestReview: String
  ) {
    feedbackServiceRequest(
      id: $feedbackServiceRequestId
      requestRating: $feedbackServiceRequestRequestRating
      requestReview: $feedbackServiceRequestRequestReview
    ) {
      state
      requestRating
      requestReview
    }
  }
`;

const CUSTOMER_FEEDBACK_SR = gql`
  mutation CustomerfeedbackServiceRequestMutation(
    $customerfeedbackServiceRequestId: ID
    $customerfeedbackServiceRequestCustomerRating: Int
    $customerfeedbackServiceRequestCustomerReview: String
  ) {
    customerfeedbackServiceRequest(
      id: $customerfeedbackServiceRequestId
      customerRating: $customerfeedbackServiceRequestCustomerRating
      customerReview: $customerfeedbackServiceRequestCustomerReview
    ) {
      state
    }
  }
`;

const CREATE_SERVICE = gql`
  mutation CreateServiceMutation(
    $createServiceServiceName: String
    $createServiceDescription: String
    $createServiceUserType: String
    $createServiceImage: String
  ) {
    createService(
      service_name: $createServiceServiceName
      description: $createServiceDescription
      user_type: $createServiceUserType
      image: $createServiceImage
    ) {
      service_name
      description
    }
  }
`;

const MAKE_COMPLAINT = gql`
  mutation MakeComplaintMutation(
    $makeComplaintComplainer: ID
    $makeComplaintVictim: String
    $makeComplaintTitle: String
    $makeComplaintComplaint: String
  ) {
    makeComplaint(
      complainer: $makeComplaintComplainer
      victim: $makeComplaintVictim
      title: $makeComplaintTitle
      complaint: $makeComplaintComplaint
    ) {
      complainer {
        username
      }
      victim
      title
      complaint
    }
  }
`;

const ACCEPT_JOB_BID = gql`
  mutation Mutation(
    $acceptJobBidJobPostingId: ID!
    $acceptJobBidJobBidId: ID!
  ) {
    acceptJobBid(
      jobPostingId: $acceptJobBidJobPostingId
      jobBidId: $acceptJobBidJobBidId
    ) {
      id
    }
  }
`;

const SET_ACCOUNT_STATE = gql`
  mutation SetProfileStateMutation($providerId: ID, $state: String) {
    setProfileState(providerID: $providerId, state: $state) {
      id
    }
  }
`;

const REMOVE_SERVICE_PROVIDER = gql`
  mutation RemoveServiceProviderMutation($removeServiceProviderId: ID) {
    removeServiceProvider(id: $removeServiceProviderId)
  }
`;

const CHANGE_JOB_BID_STATE = gql`
  mutation ChangeStateJobBidMutation($jobBidId: ID!, $jobBidState: String!) {
    changeStateJobBid(jobBidId: $jobBidId, jobBidState: $jobBidState) {
      id
      state
    }
  }
`;

const SEND_NEW_MESSAGE=gql`
mutation AddMessageMutation($conversationId: ID, $sender: ID, $text: String) {
  addMessage(conversationID: $conversationId, sender: $sender, text: $text) {
    id
    conversationID
    sender
    text
    createdAt
  }
}
`;

const ADD_NEW_CONVERSATION=gql`
mutation NewConverstionMutation($newConverstionSenderId3: ID, $newConverstionRecieverId3: ID) {
  newConverstion(senderID: $newConverstionSenderId3, recieverID: $newConverstionRecieverId3) {
    id
    members
    createdAt
  }
}
`;

const ADD_REVIEW =  gql`
    mutation Mutation($type: String, $addReviewToBidId: ID, $rating: Float, $review: String) {
        addReviewToBid(type: $type, id: $addReviewToBidId, rating: $rating, review: $review) {
            id
            providerReview
            providerRating
            requesterReview
            requesterRating
        }
    }
`

export {
  MAKE_ME_SERVICE_PROVIDER,
  ADD_DETAILS,
  CREATE_NEW_SR,
  CREATE_NEW_BIDDING_JOB,
  ADD_JOB_BID,
  ADD_JOB_POSTING,
  CANCEL_SR,
  ACCEPT_SR,
  REJECT_SR,
  RESCHEDULE_SR,
  EDIT_SR,
  FEEDBACK_SR,
  START_SR,
  CUSTOMER_FEEDBACK_SR,
  MAKE_COMPLAINT,
  COMPLETE_SR,
  ACCEPT_JOB_BID,
  CREATE_SERVICE,
  SET_ACCOUNT_STATE,
  UPDATE_ME,
  REMOVE_SERVICE_PROVIDER,
  CHANGE_JOB_BID_STATE,
  SEND_NEW_MESSAGE,
  ADD_NEW_CONVERSATION,
  ADD_REVIEW
};
