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

export {MAKE_ME_SERVICE_PROVIDER}