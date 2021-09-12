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



const GET_SERVICE_PROVIDERS_BY_NAME = gql`
  query SearchServiceProviderName($searchServiceProviderbyNameName: String!) {
    searchServiceProviderbyName(name: $searchServiceProviderbyNameName) {
      id
      username
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
      profession
      city
      bio
      service_providing_status
      roles
    }
  }
`;

const GET_ALL_SERVICE_PROVIDERS = gql`
  query ViewAllServiceProviders{
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
  }
}
`;

const GET_ACCEPTED_SERVICE_REQUESTS_OF_ME=gql`
query AcceptedServiceRequestsbyMe{
  acceptedServiceRequestsbyMe {
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

const GET_PENDING_SERVICE_REQUESTS_OF_ME=gql`
query PendingServiceRequests{
  
  pendingServiceRequestsbyMe {
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

const GET_PENDING_SERVICE_REQUESTS_FOR_ME=gql`
query MyPendingServiceRequests{
  pendingServiceRequestsForMe {
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

const GET_ACCEPTED_SERVICE_REQUESTS_FOR_ME=gql`
query MyPendingServiceRequests{
  acceptedServiceRequestsForMe {
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
  GET_ACCEPTED_SERVICE_REQUESTS_FOR_ME
};
