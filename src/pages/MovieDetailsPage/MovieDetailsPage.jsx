import { useEffect, useState, Suspense } from 'react';
import { Outlet, useParams, Link } from "react-router-dom";

import css from './MovieDetailsPage.module.css';

import { fetchSearch } from "../../TMDBapi.js";

import Loader from '../../components/Loader/Loader.jsx';
import BackLink from '../../components/BackLink/BackLink.jsx';

export default function MovieDetailsPage() {
    const { movieId } = useParams();

    const [ movie, setMovie ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        async function getMovieDetails(movieId) {      
            try {                    
                setIsLoading(true);
                setMovie(null);
                setError(false);
                const response = await fetchSearch(movieId, '', '');   
                setMovie(response.data);                
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }            
        };
        getMovieDetails(movieId);
    }, [movieId]);
    
    return (
        <div className={css.container}>
            { isLoading && < Loader/> }
            { error && <p>Opps! There was an error. Please reload!</p> }
            { movie && (
                <div className={css.container}>
                    < BackLink />
                    <div className={css.box}>
                        <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={`${movie.original_title}`} className={css.image} />
                        <div>
                            <h2>{movie.title} ({movie.release_date.split("-")[0]})</h2>
                            <h3 className={css.text}>User score: {Math.round(movie.vote_average * 10)}%</h3>
                            <h3>Overview:</h3>
                                <p className={css.text}>{movie.overview}</p>                            
                            <h3>Genres:</h3>
                                <p className={css.text}>{movie.genres.map(genre => genre.name).join(', ')}</p>
                        </div>
                    </div>
                    <div className={css.addInfo}>
                        <h3 className={css.titleAddInfo}>Additional Information</h3>
                        <ul className={css.listAddInfo}>
                            <li><Link to="cast">Cast</Link></li>
                            <li><Link to="reviews">Reviews</Link></li>
                        </ul>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        < Outlet />
                    </Suspense>
                </div>
            )}
        </div>
    );
}