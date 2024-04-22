import {
  ADD_TOKEN,
  ADD_REFRESH_TOKEN,
  TOGGLE_IS_LOGGED,
  SIGNOUT,
  ADD_USER,
  SET_ACTION_IN_PROGRESS,
  TOGGLE_SCANVIEW
} from "./actions";

const initialState = {
  token: "",
  refreshToken: "",
  isLogged: false,
  username: "",
  isActionBeingPerformed: false,
  scanView: false,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ADD_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        username: action.payload,
      };
    case TOGGLE_IS_LOGGED:
      return {
        ...state,
        isLogged: !action.payload,
      };
    case SIGNOUT:
      return {
        ...state,
        token: "",
        refreshToken: "",
        isLogged: false,
        username: "",
        isActionBeingPerformed:false,
      };
    case SET_ACTION_IN_PROGRESS:
      return {
        ...state,
        isActionBeingPerformed : action.payload,
      };
    case TOGGLE_SCANVIEW:
      return {
        ...state,
        scanView: !action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
