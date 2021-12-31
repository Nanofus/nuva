import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import parse from "html-react-parser";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import Connection from "./connection";
import Navigation from "./navigation";
import Help from "./help";
import Menu from "./menu";

const Layout = ({ isHomePage = false, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `);

  const openHelp = () => {
    setHelpOpen(true);
  };
  const closeHelp = () => {
    setHelpOpen(false);
    ReactTooltip.hide();
  };

  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <Connection>
      <Toaster />
      <ReactTooltip place="bottom" effect="solid" className="tooltip" />
      <Menu onHelpOpen={openHelp} />
      {helpOpen && <Help onClose={closeHelp} />}
      <div className="global-wrapper">
        <header className="global-header">
          {isHomePage ? (
            <>
              <h1 className="main-heading">
                <Link to="/">{parse(title)}</Link>
              </h1>
              <Navigation />
            </>
          ) : (
            <Link className="header-link-home" to="/">
              {title}
            </Link>
          )}
        </header>

        <main>{children}</main>

        <footer>© {new Date().getFullYear()} Klaanon.fi</footer>
      </div>
    </Connection>
  );
};

export default Layout;
