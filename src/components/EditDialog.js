import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../store/index";
import { CLOSE_EDIT_PFM_FORM } from "../constants/action-types";
import { UPDATE_PFM } from "../constants/action-types";
window.store = store;

export default class FormDialog extends React.Component {
    state = {
        open: false,
        pfm: {
            name: "",
            id: "",
            date: "",
            description: ""
        }
    };

    handleClose = () => {
        store.dispatch({
            type: CLOSE_EDIT_PFM_FORM
        });
    };

    handleChange = name => event => {
        console.log("New Value " + event.target.value);
        this.setState({
            newName: event.target.value
        });
    };

    handleSave = () => {
        store.dispatch({
            type: UPDATE_PFM,
            payload: {
                name: this.state.newName,
                id: this.state.pfm.id,
                date: this.state.pfm.date,
                description: this.state.pfm.description
            }
        });

        store.dispatch({
            type: CLOSE_EDIT_PFM_FORM
        });
    };

    componentDidMount() {
        this.setState({
            openEditPfmForm: false,
            open: store.getState()["uiState"]["openEditPfmForm"],
            pfm: store.getState()["uiState"]["pfmToEdit"]
        });

        store.subscribe(() => {
            console.log(
                "Edit Form Dialog State" + JSON.stringify(store.getState()["uiState"])
            );
            this.setState({
                open: store.getState()["uiState"]["openEditPfmForm"],
                pfm: store.getState()["uiState"]["pfmToEdit"]
            });
        });
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Update Pfm</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please Update Pfm.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Pfm"
                            multiline
                            defaultValue={this.state.pfm.name}
                            rowsMax="4"
                            rows="4"
                            fullWidth
                            onChange={this.handleChange("multiline")}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
