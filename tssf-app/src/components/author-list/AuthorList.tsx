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

interface ListProps {
    filter: string;
}

class AuthorListRaw extends React.Component<ChildProps<ListProps, GetAllAuthorsQuery>, {}> {
    render () {
        if (!this.props.data || !this.props.data.allAuthors) {
            return (<span>No Author Data</span>);
        }
        const matchRegExp = new RegExp(this.props.filter, 'i');
        const authors = this.props.data.allAuthors.filter(author =>
            author.name.match(matchRegExp) || author.email.match(matchRegExp)
        );
        return (
            <ul>
                { authors.map(ele =>
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

const AuthorList = graphql<GetAllAuthorsQuery, ListProps>(ALL_AUTHORS)(AuthorListRaw);
export default AuthorList;