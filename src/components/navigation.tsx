import { Link } from "gatsby";
import React from "react";

const Navigation = () => {
  return <nav className="navigation">
      <div className="navigationItem"><Link to="/">Etusivu</Link></div>
      <div className="navigationItem"><a href="https://arkisto.klaanon.fi/soundtracks/">Soundtracks</a></div>
  </nav>;
};

export default Navigation;
