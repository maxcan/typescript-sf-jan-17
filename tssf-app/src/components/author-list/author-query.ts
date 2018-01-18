import gql from 'graphql-tag';

export default gql`
    fragment CommentFull on Comment {
        id
        upvotes
        text
    }
    fragment AuthorFull on Author {
        id
        name
        email
        comments {
            ...CommentFull
        }
    }
    query GetAllAuthors {
        allAuthors { ...AuthorFull }
    }
`;
