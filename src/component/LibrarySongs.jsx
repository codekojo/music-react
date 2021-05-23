import React from "react";

export const LibrarySongs = ({
  library: { name, artist, cover, id },
  setCurrentSong,
  setSongToTrue,
}) => {
  function handleChangeSong(songId) {
    setCurrentSong(songId);

    setSongToTrue();
  }

  return (
    <section onClick={() => handleChangeSong(id)} className="library-song">
      <img
        src={`https://api.napster.com/imageserver/v2/albums/${cover}/images/500x500.jpg`}
        alt={`playing ${name} by ${artist}`}
      />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </section>
  );
};
