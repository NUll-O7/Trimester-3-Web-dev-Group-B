import "./App.css";
import MovieRecommendation from "./components/MovieRecommendation";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import { MovieContext } from "./context/MovieContext";

function App() {

  const [watchList , setWatchList] = useState([])


  function handleAddToWatchList(movieObj){
    const updatedWatchlist = [...watchList , movieObj]

    localStorage.setItem('watchListMovies', JSON.stringify(updatedWatchlist))
    setWatchList(updatedWatchlist)

    console.log(updatedWatchlist)
  }  


  useEffect(()=>{
    let watchListData=  localStorage.getItem('watchListMovies')

    if(!watchListData){
      return 
    }

    setWatchList(JSON.parse(watchListData))
  }, [])

  return (
    <>
    <MovieContext.Provider value={{handleAddToWatchList , watchList}} >
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner /> <Movies />
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList/>} />
          <Route path="/recommend" element={<MovieRecommendation />} />
        </Routes>
      </BrowserRouter>
      </MovieContext.Provider>
    </>
    
  );
}

export default App;
