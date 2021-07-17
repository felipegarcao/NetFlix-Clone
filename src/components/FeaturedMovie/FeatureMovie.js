import React from "react";

import "./FeatureMovie.css";

function FeatureMovie({ item }) {

  let firstDate = new Date(item.first_air_date);
  let genres = [];

  for(let i in item.genres){
    genres.push(item.genres[i].name)
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} Pontos</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            <div className="featured--seasons">
              {item.number_of_seasons} Temporada
              {item.number_of_seasons <= 1 ? "" : "s"}
            </div>
            <div className="featured--description">
              {item.overview}
            </div>
            <div className="featured--buttons">

            </div>
            <div className="featured-genres">
              <strong>Generos</strong><strong>{genres.join(', ')}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureMovie;
