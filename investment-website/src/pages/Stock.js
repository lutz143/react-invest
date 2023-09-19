import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PageContainer from "../containers/PageContainer";
import classes from "./Game.module.css";

// import { BiUpvote, BiDownvote } from "react-icons/bi";
// import { useQuery, useMutation } from "@apollo/client";
// import { QUERY_SINGLE_STOCK } from '../utils/queries';
// import { ADD_VOTE } from '../utils/mutations';
// import { DOWN_VOTE } from '../utils/mutations';
// import { ADD_COMMENT } from '../utils/mutations';
// import Auth from '../utils/auth';


const Game = () => {
  const [stock, setValuation] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Make a GET request to API endpoint by ID
    axios.get(`http://localhost:3001/api/valuations/${id}`)
      .then(response => {
        setValuation(response.data);
        console.log(setValuation);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]); // include "id" in the dependency array

  // const game = data?.game || {};

  // const [Upvote, { errorUp }] = useMutation(ADD_VOTE);
  // const [downVote, { errorDown }] = useMutation(DOWN_VOTE);
  // const [commentText, setCommentText] = useState('');
  // const [characterCount, setCharacterCount] = useState(0);

  // const [addComment, { errorComment }] = useMutation(ADD_COMMENT);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { data } = await addComment({
  //       variables: {
  //         gameId,
  //         commentText,
  //         commentAuthor: Auth.getProfile().data.username,
  //       },
  //     });
  //     await refetch();
  //     setCommentText('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'commentText' && value.length <= 280) {
  //     setCommentText(value);
  //     setCharacterCount(value.length);
  //   }
  // };

  // const handleVote = async () => {
  //   try {
  //     await Upvote({
  //       variables: { gameId: gameId },
  //     });
  //     await refetch();
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleDownVote = async () => {
  //   try {
  //     await downVote({
  //       variables: { gameId: gameId },
  //     });
  //     await refetch();
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <PageContainer title="Stock Details">
        <div>
          <h1>Hello</h1>
          <div className={classes.detailHolder}>
            <h1 className={classes.gameTitle}>{stock.Ticker}</h1>
            <p>
              {stock.previousClose}
            </p>
          </div>
        </div>
    </PageContainer>
  );
}

export default Game;
