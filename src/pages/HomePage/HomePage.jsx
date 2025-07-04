import React, { useEffect, useState } from 'react';
import { fetchSearch } from "../../TMDBapi.js";

import css from './HomePage.module.css';

import Loader from '../../components/Loader/Loader.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function getTrendingMovies() {      
            try {
                setIsLoading(true);
                setMovies([]);
                setError(false);
                const results = await fetchSearch( 0, '', '');
                setMovies(results);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getTrendingMovies();
    }, []);
    return (
        <main>            
            <h1>Trending movies</h1>
            { isLoading && <Loader /> }
            { error && <p>Opps! There was an error. Please reload!</p> }
            { movies && <MovieList movies={movies} /> }
        </main>
    );
}