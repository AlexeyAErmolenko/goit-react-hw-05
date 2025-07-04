import css from './NotFoundPage.module.css';

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

export default function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {navigate("/", { replace: true });}, 5000);    
        return () => clearTimeout(timer);
    }, [navigate]);
    
    return (
        <div>
            <p>Opps! Page not found! Sorry!</p>
            <p>Please go to our <Link to="/">home page</Link>.</p>
        </div>
    );
}