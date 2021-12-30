import React from "react";
import Wrapper from "./src/components/wrapper";

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
    return (
        <Wrapper element={element} />
    );
};