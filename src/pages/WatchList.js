 // WatchList.js
import React, { useEffect } from 'react';
import { FaHeart, FaBox } from 'react-icons/fa';

const WatchList = ({ watchList, setWatchList }) => {
    const removeFromWatchList = (movie) => {
        // Update watchList state by removing the specified movie
        setWatchList((prevWatchList) => prevWatchList.filter((item) => item.id !== movie.id));
    };

    useEffect(() => {
        console.log('WatchList component updated with new watchList:', watchList);
        console.log('Number of movies in watchList:', watchList?.length);
    }, [watchList]);

    return (
        <div>
            <h2>Watch List</h2>
            {watchList?.length === 0 ? (
                <div>
                    <p>Your watch list is empty.</p>
                    <FaBox size={30} color="gray" /> {/* Empty icon */}
                </div>
            ) : (
                <div className="d-flex flex-wrap">
                    {watchList.map((movie) => (
                        <div key={movie.id} className="card m-2" style={{ width: '18rem' }}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">Release Date: {movie.release_date}</p>
                                <FaHeart
                                    size={20}
                                    color="red"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => removeFromWatchList(movie)}
                                />
                                {/* Add more details or icons as needed */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchList;


