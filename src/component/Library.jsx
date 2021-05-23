import React from "react";
import { LibrarySongs } from "./LibrarySongs";

export const Library = ({ songs, setSong, setSongToTrue, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2 className="library-name">Library</h2>
      <div className="library-songs">
        {songs.map(song => {
          return song.map(songLibrary => {
            return (
              <LibrarySongs
                setSongToTrue={setSongToTrue}
                key={songLibrary.id}
                library={songLibrary}
                setCurrentSong={setSong}
              />
            );
          });
        })}
      </div>
    </div>
  );
};
