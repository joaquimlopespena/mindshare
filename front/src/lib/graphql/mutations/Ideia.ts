import { gql } from "@apollo/client"

export const CREATE_IDEIA = gql`
    mutation CreateIdeia($data: CreateIdeiaInput!) {
        createIdeia(data: $data) {
            id
            title
            description
            createdAt
            updatedAt
            user {
                id
                name
                email
            }
        }
    }
`
