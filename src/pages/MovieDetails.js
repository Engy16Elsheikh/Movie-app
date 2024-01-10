 // src/pages/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../apis/tmdb';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rating from 'react-rating-stars-component';

const MovieDetails = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const details = await getMovieDetails(id);
            setMovieDetails(details);
        };

        fetchMovieDetails();
    }, [id]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{movieDetails.title}</h1>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-8">
                <p className="lead">Release Date: {movieDetails.release_date}</p>
                <p className="lead">
                        Rating:
                        <Rating
                            count={10}
                            value={movieDetails.vote_average}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                        />
                    </p>
                    <p className="lead">{movieDetails.overview}</p>
                     
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;

