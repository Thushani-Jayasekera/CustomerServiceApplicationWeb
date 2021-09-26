import { gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const GET_ME = gql`
  query Query {
    me {
      id
      username
      email
      nic
      profession
      contactNum
      address
      province
      city
      town
      bio
      service_providing_status
      roles
    }
  }
`;

const GET_ME_AS_SERVICE_PROVIDER = gql`
  query Query {
    me {
      username
      email
      nic
      profession
      province
      city
      town
      bio
      service_providing_status
      roles
    }
  }
`;
const GET_ME_AS_SERVICE_REQUESTER = gql`
  query Query {
    me {
      username
      email
      city
      address
      roles
    }
  }
`;
const GET_JOB_POSTING_FEED = gql`
  query Query(
    $jobPostingFeedProvince: String!
    $jobPostingFeedCity: String!
    $jobPostingFeedTown: String!
    $jobPostingFeedCategory: String!
    $jobPostingFeedCursor: String
  ) {
    jobPostingFeed(
      province: $jobPostingFeedProvince
      city: $jobPostingFeedCity
      town: $jobPostingFeedTown
      category: $jobPostingFeedCategory
      cursor: $jobPostingFeedCursor
    ) {
      jobPostings {
        id
        postedBy {
          username
        }
        description
        budgetRange {
          lowerLimit
          upperLimit
        }
        location {
          city
          town
        }
      }
      cursor
      hasNextPage
    }
  }
`;

const GET_JOB_POSTING = gql`
  query Query($jobPostingId: ID!) {
    jobPosting(id: $jobPostingId) {
      id
      heading
      location {
        province
        city
        town
      }
      category
      skills
      postedBy {
        id
        username
        email
        nic
      }
      description
      budgetRange {
        lowerLimit
        upperLimit
      }
    }
  }
`;
const GET_SERVICE_PROVIDERS_BY_NAME = gql`
  query SearchServiceProviderName($searchServiceProviderbyNameName: String!) {
    searchServiceProviderbyName(name: $searchServiceProviderbyNameName) {
      id
      username
      fullname
      profession
      city
      province
      service_providing_status
      roles
    }
  }
`;

const GET_SERVICE_PROVIDER_BY_PROFESSION = gql`
  query SearchServiceProviderByProfession(
    $searchServiceProviderbyProfessionProfession: String!
  ) {
    searchServiceProviderbyProfession(
      profession: $searchServiceProviderbyProfessionProfession
    ) {
      id
      username
      fullname
      profession
      city
      bio
      service_providing_status
      roles
      postalCode
      provider_rating
      provider_review_count
    }
  
  }
`;

const GET_PROVIDERS_BY_PROFESSION_IN_PROVINCE = gql`
  query Query(
    $searchServiceProviderbyProfessioninProvinceProfession: String!
    $searchServiceProviderbyProfessioninProvinceProvince: String!
  ) {
    searchServiceProviderbyProfessioninProvince(
      profession: $searchServiceProviderbyProfessioninProvinceProfession
      province: $searchServiceProviderbyProfessioninProvinceProvince
    ) {
      id
      username
      fullname
      postalCode
      city
      province
      bio
      service_providing_status
      roles
      profession
      provider_rating
      provider_review_count
    }
  }
`;

const GET_ALL_SERVICE_PROVIDERS = gql`
  query ViewAllServiceProviders {
    viewAllServiceProviders {
      id
      username
      profession
      email
      contactNum
      city
      bio
      service_providing_status
      roles
      postalCode
    }
  }
`;

const GET_ACCEPTED_SERVICE_REQUESTS_OF_ME = gql`
  query AcceptedServiceRequestsbyMe {
    acceptedServiceRequestsbyMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      id
      provider_id
      requester_id
    }
  }
`;

const GET_PENDING_SERVICE_REQUESTS_OF_ME = gql`
  query PendingServiceRequests {
    pendingServiceRequestsbyMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
    }
  }
`;

const GET_PENDING_SERVICE_REQUESTS_FOR_ME = gql`
  query MyPendingServiceRequests {
    pendingServiceRequestsForMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
    }
  }
`;

const GET_ACCEPTED_SERVICE_REQUESTS_FOR_ME = gql`
  query MyPendingServiceRequests {
    acceptedServiceRequestsForMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
    }
  }
`;

const GET_STARTED_SERVICE_REQUESTS_OF_ME = gql`
  query StartedServiceRequests {
    startedServiceRequestsbyMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
      location
    }
  }
`;

const GET_STARTED_SERVICE_REQUESTS_FOR_ME = gql`
  query MyStartedServiceRequests {
    startedServiceRequestsForMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
      location
    }
  }
`;

const GET_COMPLETED_SERVICE_REQUESTS_OF_ME = gql`
  query CompletedServiceRequests {
    completedServiceRequestsbyMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
      location
    }
  }
`;

const GET_COMPLETED_SERVICE_REQUESTS_FOR_ME = gql`
  query MyCompletedServiceRequests {
    completedServiceRequestsForMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
      location
    }
  }
`;

const GET_REVIEWED_SERVICE_REQUESTS_OF_ME = gql`
  query ReviewedServiceRequests {
    reviewedServiceRequestsbyMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
      location
    }
  }
`;

const GET_REVIEWED_SERVICE_REQUESTS_FOR_ME = gql`
  query MyReviewedServiceRequests {
    reviewedServiceRequestsForMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
      location
    }
  }
`;

const GET_ALL_SERVICE_TYPES = gql`
  query Query {
    viewAllServiceTypes {
      id
      service_name
      description
      user_type
      image
    }
  }
`;

const GET_MY_BIDS = gql`
  query Query {
    getMyBids {
      proposedAmount
      proposedDate
      detailedBreakdown
      state
      jobPosting {
        id
      }
    }
  }
`;

const GET_USER_BY_ID = gql`
  query Query($getUserbyIdId: ID!) {
    getUserbyId(id: $getUserbyIdId) {
      id
      username
      roles
      service_providing_status
      city
      postalCode
    }
  }
`;

const GET_SR_BY_ID = gql`
  query Query($getServiceRequestByIdId: ID!) {
    getServiceRequestByID(id: $getServiceRequestByIdId) {
      requester_id
      provider_id
      date
      time
      payMethod
      task
      min_price
      max_price
      state
      estimate
      location
      requestReview
      requestReview
    }
  }
`;

const GET_ME_USER_BY_ID_SR_DETAILS = gql`
  query GetServiceRequestDetails($getServiceRequestByIdId: ID!) {
    getServiceRequestByID(id: $getServiceRequestByIdId) {
      requester_id
      provider_id
      date
      time
      payMethod
      task
      min_price
      max_price
      state
      estimate
      location
      requestReview
      requestRating
    }
    me {
      id
      username
      email
      city
    }
  }
`;

const GET_SERVICE_REQUESTS_OF_ME = gql`
  query Query {
    acceptedServiceRequestsbyMe {
      id
      requester_id
      provider_id
      date
      time
      task
      min_price
      max_price
      location
    }
    startedServiceRequestsbyMe {
      id
      requester_id
      provider_id
      time
      date
      min_price
      max_price
      payMethod
      task
      location
    }
    completedServiceRequestsbyMe {
      id
      requester_id
      provider_id
      date
      time
      task
      min_price
      max_price
      location
    }
    pendingServiceRequestsbyMe {
      id
      requester_id
      provider_id
      date
      time
      payMethod
      task
      min_price
      max_price
      location
    }
    canceledServiceRequestsbyMe {
      id
      requester_id
      provider_id
      time
      date
      payMethod
      task
      min_price
      max_price
      location
    }
    rejectedServiceRequestsbyMe {
      id
      requester_id
      provider_id
      date
      time
      payMethod
      task
      min_price
      max_price
      location
    }
    reviewedServiceRequestsbyMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
      location
      requestReview
      requestRating
    }
  }
`;

const GET_SERVICE_REQUESTS_FOR_ME = gql`
  query Query {
    acceptedServiceRequestsForMe {
      id
      requester_id
      provider_id
      date
      time
      task
      min_price
      max_price
      location
    }
    startedServiceRequestsForMe {
      id
      requester_id
      provider_id
      time
      date
      min_price
      max_price
      payMethod
      task
      location
    }
    completedServiceRequestsForMe {
      id
      requester_id
      provider_id
      date
      time
      task
      min_price
      max_price
      location
    }
    pendingServiceRequestsForMe {
      id
      requester_id
      provider_id
      date
      time
      payMethod
      task
      min_price
      max_price
      location
    }
    canceledServiceRequestsForMe {
      id
      requester_id
      provider_id
      time
      date
      payMethod
      task
      min_price
      max_price
      location
    }
    rejectedServiceRequestsForMe {
      id
      requester_id
      provider_id
      date
      time
      payMethod
      task
      min_price
      max_price
      location
    }
    reviewedServiceRequestsForMe {
      id
      date
      time
      payMethod
      task
      min_price
      max_price
      provider_id
      requester_id
      location
      requestReview
      requestRating
    }
  }
`;

const GET_ALL_COMPLAINTS = gql`
  query Query {
    viewAllComplaints {
      id
      complainer
      victim
      title
      complaint
      createdAt
    }
  }
`;

const GET_MY_JOB_POSTINGS = gql`
    query Query($getMyJobPostingsState: String!) {
        getMyJobPostings(state: $getMyJobPostingsState){
            id
            heading
            category
            budgetRange {
                lowerLimit
                upperLimit
            }
            updatedAt
        }
    }
`
const GET_MY_JOB_POSTING_BIDS = gql`
    query Query($getMyJobPostingBidsId: ID!) {
        getMyJobPostingBids(id: $getMyJobPostingBidsId) {
            id
            state
            proposedAmount
            bidBy {
                fullname
                profession
                provider_rating
            }
            detailedBreakdown
            proposedDate
            updatedAt
        }
    }
`

const GET_JOB_POSTING_STATE  = gql`
    query Query($jobPostingId: ID!) {
        jobPosting(id: $jobPostingId) {
            id
            state
        }
    }
`
export {
  IS_LOGGED_IN,
  GET_ME,
  GET_ME_AS_SERVICE_PROVIDER,
  GET_JOB_POSTING_FEED,
  GET_ME_AS_SERVICE_REQUESTER,
  GET_SERVICE_PROVIDERS_BY_NAME,
  GET_SERVICE_PROVIDER_BY_PROFESSION,
  GET_ALL_SERVICE_PROVIDERS,
  GET_ACCEPTED_SERVICE_REQUESTS_OF_ME,
  GET_PENDING_SERVICE_REQUESTS_OF_ME,
  GET_PENDING_SERVICE_REQUESTS_FOR_ME,
  GET_ACCEPTED_SERVICE_REQUESTS_FOR_ME,
  GET_JOB_POSTING,
  GET_ALL_SERVICE_TYPES,
  GET_MY_BIDS,
  GET_USER_BY_ID,
  GET_SR_BY_ID,
  GET_ME_USER_BY_ID_SR_DETAILS,
  GET_STARTED_SERVICE_REQUESTS_FOR_ME,
  GET_STARTED_SERVICE_REQUESTS_OF_ME,
  GET_COMPLETED_SERVICE_REQUESTS_FOR_ME,
  GET_COMPLETED_SERVICE_REQUESTS_OF_ME,
  GET_SERVICE_REQUESTS_OF_ME,
  GET_SERVICE_REQUESTS_FOR_ME,
  GET_PROVIDERS_BY_PROFESSION_IN_PROVINCE,
  GET_ALL_COMPLAINTS,
  GET_MY_JOB_POSTINGS,
    GET_MY_JOB_POSTING_BIDS,
  GET_JOB_POSTING_STATE
};
