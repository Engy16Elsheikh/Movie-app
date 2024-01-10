 // Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLanguage } from '../contexts/LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { language, setLanguage, getDirection } = useLanguage();

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        const apiKey = '5c49d5b8c4f927977ee242b71121cb0b';
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=${language}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results) {
                setSearchResults(data.results);
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" dir={getDirection()}>
                <div className="container">
                    <Link className="navbar-brand" to="/movie-list">
                        Movie App
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/movie-list">
                                    Movie List
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/watch-list">
                                    Watch List
                                </Link>
                            </li>
                           
                        </ul>
                        {/* Language Dropdown */}
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="languageDropdown">
                                {language.toUpperCase()}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleLanguageChange('en')}>EN</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleLanguageChange('ar')}>AR</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
            {/* Search Bar */}
            <div className="container mt-3">
                <form className="d-flex">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search movies"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </form>
            </div>
            {/* Display Search Results */}
            <div className="container mt-3">
                <div className="row">
                    {searchResults.map((movie) => (
                        <div key={movie.id} className="col-md-3 mb-3">
                            <div className="card">
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        className="card-img-top"
                                    />
                                ) : (
                                    <p className="no-poster">No Poster Available</p>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">Release Date: {movie.release_date}</p>
                                    {/* Add more details as needed */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

