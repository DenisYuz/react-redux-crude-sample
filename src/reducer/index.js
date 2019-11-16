import { ADD_PFM, UPDATE_PFM, SELECT_PFM, DELETE_PFM } from "../constants/action-types"
import { UPDATE_PFM_LIST } from "../constants/action-types"

import { OPEN_NEW_PFM_FORM } from "../constants/action-types"
import { CLOSE_NEW_PFM_FORM } from "../constants/action-types"
import { OPEN_EDIT_PFM_FORM } from "../constants/action-types"
import { CLOSE_EDIT_PFM_FORM } from "../constants/action-types"
import { ActionInfo } from "material-ui/svg-icons"

const initialState = {
    pfms: [
        {
            id: "1",
            name: "pfm1",
            description: "description for pfm1",
            date: "July 20, 2019"
        },
        {
            id: "2",
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
    switch (action.type) {
        case UPDATE_PFM_LIST:
            console.log("Update PFMs List");
            return {
                ...state,
                pfms: action.payload
            }
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
                    openEditPfmForm: true,
                    pfmToEdit: action.payload
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

        // Select Pfm
        case SELECT_PFM:
            console.log("@@@ Select Pfm " + JSON.stringify(action));
            const currentIndex = state.uiState.checked.indexOf(action.payload);
            if (currentIndex === -1) {
                state.uiState.checked.push(action.payload);
            }
            else {
                state.uiState.checked.splice(currentIndex, 1);
            }
            return state;

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