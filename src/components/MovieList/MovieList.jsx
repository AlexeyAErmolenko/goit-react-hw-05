import css from './MovieList.module.css';
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <div className={css.container}>
            <ul className={css.list}>
                {movies.map(movie => (
                    <li key={movie.id} className={css.item}>
                        <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}