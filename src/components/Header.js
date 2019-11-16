import React from 'react'
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/Delete"
import store from "../store/index"
import { DELETE_PFM } from '../constants/action-types'

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
        const classes = this.props;

        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h3" color="primary">
                        PFM Library
                    </Typography>
                    {this.state.checked.length !== 0 ? (
                        <IconButton onClick={this.handleDeletePfms} color="inherit">
                            <AccountCircle />
                        </IconButton>
                    ) : null}
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;