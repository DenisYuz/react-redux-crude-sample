import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import ListComponent from "./components/ListComponent"
import { OPEN_NEW_PFM_FORM } from "./constants/action-types"
import store from "./store/index";
import EditDialog from "./components/EditDialog"
import { UPDATE_PFM_LIST } from "./constants/action-types"

class App extends Component {
  openDialog = () => {
    store.dispatch({
      type: OPEN_NEW_PFM_FORM
    });
  };

  simulatePfmsList() {
    var pfmsArray = [];
    for (let i = 0; i < 100; i++) {
      let pfm = {
        id: i,
        name: `pfm ${i}`,
        description: `description for pfm ${i}`,
        date: "July 20, 2019"
      }
      pfmsArray.push(pfm);
    }

    return pfmsArray;
  }

  componentDidMount() {
    store.dispatch({
      type: UPDATE_PFM_LIST,
      payload: this.simulatePfmsList()
    })

    store.dispatch({
      type: SELECT_PFM,
      payload: "1"
    })

  }

  render() {

    return (
      <React.Fragment>
        <Header></Header>
        <ListComponent ></ListComponent>
        <EditDialog />
      </React.Fragment>
    )
  }
}

export default App;
