import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchSearch } from "../../TMDBapi.js";

import css from './MoviesPage.module.css';

import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx';

export default function MoviesPage() {    
    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("query") ?? "";
    const changeQuery = (newQuery) => {
        searchParams.set("query", newQuery);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        async function getFindMovies() {      
            try {
                if (!queryParam) { return; }
                setIsLoading(true);
                setMovies(null);
                setError(false);              
                const results = await fetchSearch(0, queryParam, '');
                setMovies(results);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getFindMovies();
    }, [queryParam]);

    return (
        <main>
            < SearchBar onSubmit={changeQuery} />
            { isLoading && <Loader /> }
            { error && <p>Opps! There was an error. Please reload!</p> }
            { movies && <MovieList movies={movies} /> }
        </main>
    )
}