import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { graphql } from 'react-apollo';
import * as GQL from '../../gen/gql-types';
import ALL_AUTHORS from './author-query';

const CommentDetail: React.SFC<{key: string} & GQL.CommentFullFragment> = (props) => (
    <li>[{props.upvotes} votes] &nbsp;{props.text}</li>
);

const AuthorDetail: React.SFC<{key: string} & GQL.AuthorFullFragment> = (props) => (
    <li>
        <strong>{props.name}</strong>
        <em>&nbsp;({props.email}):</em>
        <ol>
            {props.comments && props.comments.map(comment =>
                 <CommentDetail key={comment.id} {...comment} />
            )}
        </ol>
    </li>
);

interface ListProps {
    filter: string;
}

class AuthorListRaw extends React.Component<ChildProps<ListProps, GQL.GetAllAuthorsQuery>, {}> {
    render () {
        if (!this.props.data || !this.props.data.allAuthors) {
            return (<span>Loading author data, probably...</span>);
        }
        const matchRegExp = new RegExp(this.props.filter, 'i');
        const authors = this.props.data.allAuthors.filter(author =>
            author.name.match(matchRegExp) || author.email.match(matchRegExp)
        );
        return (
            <ul>
                {authors.map(ele => <AuthorDetail key={ele.email} {...ele} />)}
            </ul>
        );
    }
}

const AuthorList = graphql<GQL.GetAllAuthorsQuery,  ListProps>(ALL_AUTHORS)(AuthorListRaw);
export default AuthorList;