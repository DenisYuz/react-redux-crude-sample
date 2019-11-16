import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import store from "../store/index";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Edit";
import Comment from "@material-ui/icons/Error";
import { OPEN_EDIT_PFM_FORM } from "../constants/action-types";
import { SELECT_PFM } from "../constants/action-types";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/Search";
window.store = store;

const styles = theme => ({
    root: {
        width: "100%",
        height: 360,
        backgroundColor: theme.palette.background.paper
    },
    avatar: {
        color: "#fff",
        backgroundColor: "#F00"
    }
});

class ListComponent extends React.Component {
    state = {
        checked: [],
        items: []
    };

    openEditDialog = value => {
        console.log("Edit");
        store.dispatch({
            type: OPEN_EDIT_PFM_FORM,
            payload: value
        });
    };

    componentDidMount() {
        this.setState({
            items: store.getState()["pfms"],
            checked: store.getState()["uiState"]["checked"]
        });

        store.subscribe(() => {
            this.setState({
                items: store.getState()["pfms"],
                checked: store.getState()["uiState"]["checked"]
            });
        });
    }

    handleChange = event => {
        // if (event.target.value.trim() !="")
        // {
        console.log("Search----------" + event.target.value);

        var updatedList = this.state.items;
        updatedList = updatedList.filter(function (item) {
            return (
                item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
            );
        });

        this.setState({ items: updatedList });

    };

    handleToggle = value => () => {
        console.log("Select----------" + value);

        store.dispatch({
            type: SELECT_PFM,
            payload: value
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="input-with-icon-grid"
                            label="Search"
                            onChange={this.handleChange}
                        />
                    </Grid>
                </Grid>

                {this.state.items.length == 0 ? (
                    <Card>
                        <CardContent>
                            <Comment />

                            <Typography color="primary">No Data</Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                No Article found ¯\_(ツ)_/¯
              </Typography>
                        </CardContent>
                    </Card>
                ) : (
                        <List>
                            {this.state.items.map(value => (
                                <ListItem
                                    key={value.id}
                                    dense
                                    button
                                    className={classes.listItem}
                                >
                                    <Checkbox
                                        onChange={this.handleToggle(value.id)}
                                        checked={this.state.checked.indexOf(value.id) !== -1}
                                    />

                                    <Avatar alt="Remy Sharp" className={classes.avatar}>
                                        {value.id}
                                    </Avatar>

                                    <ListItemText primary={value.name} secondary={value.date} />

                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="Comments"
                                            onClick={() => this.openEditDialog(value)}
                                        >
                                            <CommentIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
            </div>
        );
    }
}

ListComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListComponent);
