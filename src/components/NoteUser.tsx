import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {Note} from "../../../myapi/src/generated/graphql";

// import DeleteNote from './DeleteNote';
// import FavoriteNote from './FavoriteNote';
import { GET_ME } from '../gql/query';
import DeleteNote from "./DeleteNote";
import FavoriteNote from "./FavoriteNote";

const NoteUser = ({note}:{note:Note}) => {
    const { loading, error, data } = useQuery(GET_ME);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

    return (
        <React.Fragment>
            <FavoriteNote
                me={data.me}
                noteId={note.id}
                favoriteCount={note.favoriteCount}
            />
            <br />
            {data.me.id === note.author.id && (
                <React.Fragment>
                    <Link to={`/edit/${note.id}`}>Edit</Link> <br />
                    <DeleteNote noteId={note.id} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default NoteUser;
