import { graphql, Link, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Search from "./search";
import CategoryList from "./category-list";
const searchIndices = [{ name: `Posts`, title: `Posts` }];

const Navigation = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="navigation">
      <div className="navigationItem">
        <Link to="/">Etusivu</Link>
      </div>
      <div className="navigationItem">
        <a href="https://arkisto.klaanon.fi/soundtracks/">Soundtracks</a>
      </div>
      <div className="navigationItem categoryWrapper">
        <a href="#" className="categoriesLink">
          Kategoriat
        </a>
        <CategoryList />
      </div>
      <div className="navigationItem">
        <Link to="/tags">Tagit</Link>
      </div>
      <div className="navigationItem">
        <Search indices={searchIndices} />
      </div>
    </nav>
  );
};

export default Navigation;
