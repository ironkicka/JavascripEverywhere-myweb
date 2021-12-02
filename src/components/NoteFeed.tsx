import {Note} from "../../../myapi/src/generated/graphql";
import React from "react";
import NoteContainer from "./Note";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

const NoteFeed = ({notes}:{notes:Note[]})=>{
    return(
        <div>
            {notes.map((note:Note)=>(
                <NoteWrapper key={note.id}>
                    <NoteContainer note={note}/>
                    <Link to={`note/${note.id}`}>Permalink</Link>
                </NoteWrapper>
            ))}
        </div>
    )
}

export default NoteFeed;