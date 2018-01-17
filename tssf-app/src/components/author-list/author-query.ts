import gql from 'graphql-tag';

export default gql`
    query GetAllAuthors {
        allAuthors {
            id
            email
            name
            comments {
                id
                upvotes
                text
            }
        }
    }
`;
