import { gql } from "@apollo/client";

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

const GET_ME_AS_SERVICE_PROVIDER  = gql`
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
`
export {IS_LOGGED_IN,GET_ME,GET_ME_AS_SERVICE_PROVIDER}