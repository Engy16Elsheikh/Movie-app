import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularMovies } from '../apis/tmdb';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import Badge from 'react-bootstrap/Badge';
import { BsHeart } from 'react-icons/bs';
import './MovieList.css';
import { useLanguage } from '../contexts/LanguageContext';

const MovieList = ({ watchList, setWatchList }) => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { language } = useLanguage();

    const moviesPerPage = 6;
    const moviesPerRow = 2;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getPopularMovies(language);
                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [language]);

    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const lastIndex = currentPage * moviesPerPage;
    const firstIndex = lastIndex - moviesPerPage;
    const currentMovies = movies.slice(firstIndex, lastIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const addToWatchList = (movie) => {
        setWatchList((prevWatchList) => {
            if (!prevWatchList.some((item) => item.id === movie.id)) {
                const updatedWatchList = [...prevWatchList, movie];
                console.log('Watch list updated:', updatedWatchList);
                return updatedWatchList;
            } else {
                console.log('Movie is already in the watch list:', movie);
                return prevWatchList;
            }
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Popular Movies</h1>
            <div className="row">
                {currentMovies.map((movie, index) => (
                    <div key={movie.id} className={`col-sm-6 col-md-4 col-lg-3 mb-4 ${index % moviesPerRow === 0 ? 'clear-left' : ''}`}>
                        <Link to={`/movie-details/${movie.id}`} className="text-decoration-none text-dark">
                            <div className="card">
                                <Badge pill bg="secondary" className="position-absolute top-0 start-0 m-2">
                                    {movie.vote_average}
                                </Badge>
                                <BsHeart className="favorite-icon" onClick={() => addToWatchList(movie)} />
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">Release Date: {movie.release_date}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Pagination>
                {pageNumbers.map((number) => (
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                        {number}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default MovieList;
