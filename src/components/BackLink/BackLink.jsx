import css from './BackLink.module.css';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BackLink() {
    const location = useLocation();
    const backLinkURLRef = useRef(location.state ?? "/movies");
    return (
        <div className={css.container}>
            <Link to={backLinkURLRef.current}>Go Back</Link>
        </div>
    );
}