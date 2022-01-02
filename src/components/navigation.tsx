import { Link } from "gatsby";
import React from "react";
import Search from "./search";
const searchIndices = [{ name: `Posts`, title: `Posts` }];

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navigationItem">
        <Link to="/">Etusivu</Link>
      </div>
      <div className="navigationItem">
        <a href="https://arkisto.klaanon.fi/soundtracks/">Soundtracks</a>
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
