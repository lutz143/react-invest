import React from 'react';

function MovieDetail(props) {
  return (
    <div className="text-center">
      <img
        alt={props.ticker}
        className="img-fluid"
        src={props.src}
        style={{ margin: '0 auto' }}
      />
      <h3>Director(s): {props.ticker}</h3>
      {/* <h3>Genre: {props.genre}</h3>
      <h3>Released: {props.released}</h3> */}
    </div>
  );
}

export default MovieDetail;
