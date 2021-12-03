import React from 'react';
import {gql, useQuery} from '@apollo/client';
import NoteFeed from "../components/NoteFeed";
import Button from "../components/Button";
import {GET_NOTES} from "../gql/query";

const Home = () => {
    // query hook
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;
    if(data.noteFeed.notes.length !== 0) {
        return (
            <>
                <NoteFeed notes={data.noteFeed.notes}/>
                {data.noteFeed.hasNextPage && (
                    <Button
                        onClick={() => {
                            fetchMore({
                                variables: {
                                    cursor: data.noteFeed.cursor
                                },
                                updateQuery: (previousResult, {fetchMoreResult}) => {
                                    return {
                                        noteFeed: {
                                            cursor: fetchMoreResult.noteFeed.cursor,
                                            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                            notes: [
                                                ...previousResult.noteFeed.notes,
                                                ...fetchMoreResult.noteFeed.notes
                                            ],
                                            __typename: 'noteFeed',
                                        }
                                    }
                                }
                            })
                        }}
                    >
                        Load more
                    </Button>
                )}
            </>

        )
    }else{
        return <p>No notes yet</p>;
    }
};

export default Home;
