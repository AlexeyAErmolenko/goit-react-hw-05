import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import css from './MovieCast.module.css';
import { fetchSearch } from '../../TMDBapi';

import Loader from '../../components/Loader/Loader.jsx';

export default function MovieCast() {
    const { movieId } = useParams();

    const [ credits, setCredits ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        async function getMovieCasts(movieId) {
            try {       
                setIsLoading(true);
                setCredits(null);
                setError(false);
                const response = await fetchSearch(movieId, '', 'credits');
                setCredits(response.data.cast);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }                    
        };
        getMovieCasts(movieId);        
    }, [movieId]);

    return (
        <div className={css.box}>
            { isLoading && < Loader/> }
            {error && <p>Opps! There was an error. Please reload!</p>}
            { (!credits) && <p>We don't have any cast for this movie.</p>}
            { (credits) &&
                <ul className={css.list}>
                    {credits.map(item => (
                        <li key={item.id} className={css.item}>
                            <div className={css.card}>
                                <img src={`https://image.tmdb.org/t/p/w45${item.profile_path}`} alt={`${item.original_name}`} className={css.image} />
                                <p>{item.name}</p>
                                <p>{item.character}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            }            
        </div>
    );    
}