import * as React from 'react';
import { ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { GetAllAuthorsQuery } from '../../gen/gql-types';

const ALL_AUTHORS = gql`
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

class AuthorListRaw extends React.Component<ChildProps<{}, GetAllAuthorsQuery>, {}> {
    render () {
        if (!this.props.data || !this.props.data.allAuthors) {
            return (<span>No Author Data</span>);
        }
        return (
            <ul>
                { this.props.data.allAuthors.map(ele =>
                    <li key={ele.email}>
                        <strong>{ele.name}</strong>
                        <em>&nbsp;({ele.email}):</em>
                        <ol>
                            { ele.comments && ele.comments.map(comment =>
                                <li key={comment.id}>{comment.text}</li>
                            )}
                        </ol>
                    </li>
                ) }
            </ul>
        );
    }
}

const AuthorList = graphql<GetAllAuthorsQuery, {}>(ALL_AUTHORS)(AuthorListRaw);
export default AuthorList;