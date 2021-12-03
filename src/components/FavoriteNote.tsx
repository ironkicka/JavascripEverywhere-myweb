import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';
import {Note,User} from "../../../myapi/src/generated/graphql";

const FavoriteNote = ({me, noteId, favoriteCount}:{me:User,noteId:string,favoriteCount:number}) => {
    // store the note's favorite count as state
    const [count, setCount] = useState(favoriteCount);
    // store if the user has favorited the note as state
    const [favorited, setFavorited] = useState<boolean>(
        // check if the note exists in the user favorites list
        me.favorites.filter((note:Note) => note.id === noteId).length > 0
    );

    // toggleFavorite mutation hook
    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: noteId
        },
        // refetch the GET_MY_FAVORITES query to update the cache
        refetchQueries: [{ query: GET_MY_FAVORITES }]
    });

    // if the user has favorited the note display the option to remove the favorite
    // else display the option to add as a favorite
    return (
        <React.Fragment>
            {favorited ? (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(false);
                        setCount(count - 1);
                    }}
                    data-cy="favorite"
                >
                    Remove Favorite
                </ButtonAsLink>
            ) : (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(true);
                        setCount(count + 1);
                    }}
                    data-cy="favorite"
                >
                    Add Favorite
                </ButtonAsLink>
            )}
            : {count}
        </React.Fragment>
    );
};

export default FavoriteNote;
