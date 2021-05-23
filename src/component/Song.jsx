import React from "react";

const Song = ({ currentsong: { cover, artist, name, album } }) => {
  return (
    <section className="song">
      <img
        className="song-img"
        src={`https://api.napster.com/imageserver/v2/albums/${cover}/images/500x500.jpg`}
        alt={`playing ${name} by ${artist}`}
      />
      <h2>{name} </h2>
      <p>
        <span>Album:</span> {album}
      </p>
      <h3>{artist}</h3>
    </section>
  );
};

export default Song;
