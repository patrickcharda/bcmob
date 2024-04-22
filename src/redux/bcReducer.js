import { RECORD_SELECTED_BC, PURGE_BC } from "./actions";

const initialState = {
  bc: {},
};

const bcReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORD_SELECTED_BC:
      return {
        ...state,
        bc: action.payload,
      };
    case PURGE_BC:
      return {
        ...state,
        bc: {},
      }
    default:
      return state;
  }
};

export default bcReducer;