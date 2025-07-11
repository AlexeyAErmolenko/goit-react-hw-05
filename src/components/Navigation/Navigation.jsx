import { NavLink } from "react-router-dom";
import css from './Navigation.module.css'
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => { return clsx(css.link, isActive && css.active); };

export default function Navigation() {
    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <NavLink to="/" className={buildLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/movies" className={buildLinkClass}>
                    Movies
                </NavLink>
            </nav>
        </header>
    )
}