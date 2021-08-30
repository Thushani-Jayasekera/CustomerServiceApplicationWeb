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
export {IS_LOGGED_IN,GET_ME}