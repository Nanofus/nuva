import ReactTooltip from "react-tooltip";

import ViewerInformation from "./viewer-information";
import Login from "./login";
import React from "react";
import { fetchUserInfo, handleLogin, handleLogout } from "./connection";
import { isBrowser, loggedIn } from "../util";

export default class Menu extends React.Component<any, any> {
  private loginFunc: any;
  private toggleMenuFunc: any;
  private setLoadingFunc: any;
  private wrapperRef: any;

  constructor(props) {
    super(props);
    this.state = {
      ...fetchUserInfo(),
      loggedIn: loggedIn(),
      menuOpen: false,
    };
    this.loginFunc = this.login.bind(this);
    this.toggleMenuFunc = this.toggleMenu.bind(this);
    this.setLoadingFunc = this.setLoading.bind(this);
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.setState({ menuOpen: false });
    }
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  login(userInfo) {
    this.setState({ loggedIn: true });
    handleLogin(userInfo.authToken, userInfo.userName, userInfo.email);
    this.setState(fetchUserInfo());
  }
  logout() {
    handleLogout();
    this.setState({ loggedIn: false });
    this.setState(fetchUserInfo());
  }
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }
  setLoading(isLoading) {
    this.setState({ loading: isLoading });
  }

  render() {
    return (
      <div
        ref={this.wrapperRef}
        className={"menu window " + (this.state.menuOpen ? "open" : "closed")}
      >
        <div className="wrapper">
          <div className="iconRow">
            <i
              className="icon left fas fa-bars"
              onClick={this.toggleMenuFunc}
            ></i>
            <i
              className="icon fa-brands fa-wordpress"
              data-tip="Kirjoita ropeosa"
              onClick={() =>
                window.open("https://klaanon.fi/wp/wp-admin/", "_blank")
              }
            ></i>
            <i
              className="icon fas fa-question-circle"
              data-tip="Tietoa"
              onClick={() => this.props.onHelpOpen()}
            ></i>
            {this.state.loggedIn && (
              <i
                className="icon fas fa-sign-out-alt"
                data-tip="Kirjaudu ulos"
                onClick={() => this.logout()}
              ></i>
            )}
          </div>
          <hr className="separator" />
          {this.state.loading ? (
            <div className="loadingSpinner">
              <div className="lds-dual-ring"></div>
            </div>
          ) : (
            <div className="menuContent">
              <ViewerInformation userInfo={this.state.userInfo} />
              <Login
                loggedIn={this.state.loggedIn}
                onLogin={this.loginFunc}
                setLoading={this.setLoadingFunc}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
