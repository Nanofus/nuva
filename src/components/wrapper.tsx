import React from "react";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import Help from "./help";
import Menu from "./menu";

export default class Wrapper extends React.Component<any, any> {
    private openHelpFunc: any;
    private closeHelpFunc: any;

    constructor(props) {
        super(props);
        this.state = {
            helpOpen: false,
        }
        this.openHelpFunc = this.openHelp.bind(this);
        this.closeHelpFunc = this.closeHelp.bind(this);
    }

    openHelp() {
        this.setState({ helpOpen: true });
    }
    closeHelp() {
        this.setState({ helpOpen: false });
        ReactTooltip.hide();
    }

    render() {
        return (
            <div>
                <Toaster />
                <ReactTooltip place="bottom" effect="solid" className="tooltip" />
                <Menu onHelpOpen={this.openHelpFunc} />
                {this.state.helpOpen && <Help onClose={this.closeHelpFunc} />}
                {this.props.element}
            </div >
        )
    };
}