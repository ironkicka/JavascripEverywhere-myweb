import React from "react";
import {gql, useQuery} from "@apollo/client";
import NoteContainer from "../components/Note";

const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }
`;

const NotePage = (props:{match:any})=>{
    // store the id found in the url as a variable
    let id = props.match.params.id;

    // query hook, passing the id value as a variable
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error! Note not found</p>;

    return (
        <NoteContainer note={data.note}/>
    )
}

export default NotePage;