import { ADD_PFM } from "../constatnts/action-types"
import { UPDATE_PFM } from "../constatnts/action-types"
import { SELECT_PFM } from "../constatnts/action-types"
import { DELETE_PFM } from "../constatnts/action-types"

import { OPEN_NEW_PFM_FORM } from "../constatnts/action-types"
import { CLOSE_NEW_PFM_FORM } from "../constatnts/action-types"
import { OPEN_EDIT_PFM_FORM } from "../constatnts/action-types"
import { CLOSE_EDIT_PFM_FORM } from "../constatnts/action-types"
import { ActionInfo } from "material-ui/svg-icons"
const initialState = {
    pfms: [
        {
            id: "pfmId1",
            name: "pfm1",
            description: "description for pfm1",
            date: "July 20, 2019"
        },
        {
            id: "pfmId2",
            name: "pfm2",
            description: "description for pfm2",
            date: "April 05, 2019"
        }
    ],
    uiState: {
        // Create new pfm
        openNewPfmForm: false,
        // Update Pfm
        openEditPfmForm: false,
        pfmToEdit: {},
        //Delete pfm
        checked: []
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action) {
        // Create Pfm
        case ADD_PFM:
            console.log('Add new Pfm');
            return {
                ...state,
                pfms: [...state.pfms, action.payload]
            };
        case OPEN_NEW_PFM_FORM:
            console.log('Open Add new Pfm Form' + JSON.stringify(action));
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    openNewPfmForm: true
                }
            }

        case CLOSE_NEW_PFM_FORM:
            console.log('Close Add new Pfm Form' + JSON.stringify(action));
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    openNewPfmForm: false
                }
            }

        // Update Pfm
        case UPDATE_PFM:
            console.log('Update Pfm');
            return {
                ...state,
                pfms: state.pfms.map(pfm => {
                    if (pfm.id !== action.payload.id) {
                        return pfm;
                    }
                    else {
                        return {
                            ...pfm, name: action.payload.name, date: action.payload.date,
                            description: action.payload.description
                        }
                    }
                })
            };

        case OPEN_EDIT_PFM_FORM:
            console.log('Open Edit Pfm Form' + JSON.stringify(action));
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    openEditPfmForm: true
                }
            }

        case CLOSE_EDIT_PFM_FORM:
            console.log('Close Edit Pfm Form' + JSON.stringify(action));
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    openEditPfmForm: false
                }
            }



        // Delete Pfm
        case DELETE_PFM:
            for (var check in state.uiState.checked) {
                var pfm = state.pfms[check];
                // remove pfm
                state.pfms.splice(check, 1);

                // remove index
                var index = state.uiState.checked.indexOf(check);
                if (index > -1) {
                    state.uiState.checked.splice(index, 1);
                }
            }
            state.uiState.checked = [];
            return state;

        default:
            return state;


    }
};


export default rootReducer;