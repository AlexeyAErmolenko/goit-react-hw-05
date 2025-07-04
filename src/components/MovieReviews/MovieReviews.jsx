import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import css from './MovieReviews.module.css';
import { fetchSearch } from '../../TMDBapi';

import Loader from '../../components/Loader/Loader.jsx';

export default function MovieReviews() {
    const { movieId } = useParams();

    const [ reviews, setReviews ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError] = useState(false);
    
    useEffect(() => {
        async function getMovieReviews(movieId) {
            if (!movieId) { return; }
            try {       
                setIsLoading(true);
                setReviews(null);
                setError(false);
                const results = await fetchSearch(movieId, '', 'reviews');
                setReviews(results);                 
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }                    
        };
        getMovieReviews(movieId);        
    }, [movieId]);
    return (
        <div className={css.box}>
            { isLoading && < Loader/> }
            { error && <p>Opps! There was an error. Please reload!</p>}
            { (!reviews) && <p>We don't have any reviews for this movie.</p>}
            { (reviews) && (
                <ul className={css.list}>            
                    {reviews.map(item => (
                        <li key={item.id} className={css.item}>
                            <div className={css.card}>
                                <h4>{item.author}</h4>
                                <p>{item.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>            
            )}            
        </div>
    );    
}    