import { Suspense } from "react";

import css from './Layout.module.css';
import Navigation from '../Navigation/Navigation'


export default function Layout({children}) {
    return (
        <div className={css.container}>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </div>
    );
}