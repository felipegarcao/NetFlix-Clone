import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow/MovieRow";
import FeatureMovie from "./components/FeaturedMovie/FeatureMovie";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import LoadingNetFlix from './img/loading-netflix.gif'

function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista inteira
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Filme Em Destaque
      let originals = list.filter((i) => i.slug === "originals"); // filtrando os filmes originais da netflix
      // Pegando um aleatorio de acordo com a quantidade que tenho na lista
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }

    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeatureMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <Footer />

      {movieList.length <= 0 &&
      <div className="loading">
        <img src={LoadingNetFlix} alt="Carregando" />
      </div>}
        
    </div>
  );
}

export default App;
