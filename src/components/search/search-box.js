import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { Search as SearchIcon } from "@styled-icons/fa-solid"

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <form className={className}>
      <input
        className="SearchInput"
        type="text"
        placeholder="Etsi"
        aria-label="Etsi"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <SearchIcon className="SearchIcon" />
    </form>
  )
);
