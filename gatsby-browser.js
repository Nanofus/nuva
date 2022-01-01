// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

// normalize CSS across browsers
import "./src/css/normalize.css";

// custom CSS styles
import "./src/css/style.scss";

/*import React from 'react';
import { AnimatePresence } from 'framer-motion';

*export const wrapPageElement = ({ element }) => (
    <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
);

const transitionDelay = 0;
export const shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition,
}) => {
    if (location.action === 'PUSH') {
        window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
    } else {
        const savedPosition = getSavedScrollPosition(location);
        window.setTimeout(
            () => window.scrollTo(...(savedPosition || [0, 0])),
            transitionDelay
        );
    }
    return false;
};*/
