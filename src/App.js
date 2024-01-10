import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import WatchList from './pages/WatchList';
 import { LanguageProvider } from './contexts/LanguageContext';
 
function App() {
    const [watchList, setWatchList] = useState([]); 

    return (
    <LanguageProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/movie-list" element={<MovieList setWatchList={setWatchList} />} />
                <Route path="/movie-details/:id" element={<MovieDetails />} />
                <Route path="/watch-list" element={<WatchList watchList={watchList} setWatchList={setWatchList} />} />
                 

            </Routes>
        </Router>
        </LanguageProvider>
    )
}

export default App;



