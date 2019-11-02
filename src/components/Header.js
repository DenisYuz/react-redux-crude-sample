import React from 'react'
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/"
import ToolBar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/Delete"
import state from "../store/index"
import { DELETE_PFM } from '../constatnts/action-types'

const styles = {};
class Header extends React.Component {
    state = {
        checked: []
    };
    handleDeletePfms = () => {
        store.dispatch({
            type: DELETE_PFM
        });
    }

    componentDidMount() {
        this.setState({
            checked: store.getState()["uiState"]["checked"]
        });

        store.subscribe(() => {
            this.setState({
                checked: store.getState()["uiState"]["checked"]
            })
        })
    }
    render() {

        return (
            <div>
                This is Header
            </div>
        )
    }
}

export default Header;