import { SET_BACKURL, SET_URL } from "./actions";

const initialState = { 
    backurl: false,
    url: "",
};

const configReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_BACKURL:
            return {
                ...state,
                backurl: !state.backurl,
            };
        case SET_URL:
            return {
                ...state,
                url: action.payload,
            };
        default:
            return state;
    }
};

export default configReducer;