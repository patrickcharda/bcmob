import storeAndPersistor from "./store";
const { persistor } = storeAndPersistor;

//action's type for login
export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_REFRESH_TOKEN = "ADD_REFRESH_TOKEN";
export const ADD_USER = "ADD_USER";
export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED";
export const SIGNOUT = "SIGNOUT";
export const SET_ACTION_IN_PROGRESS = "SET_ACTION_IN_PROGRESS";
export const TOGGLE_SCANVIEW = "TOGGLE_SCANVIEW";

//action's type for api
export const API_PENDING = "API_PENDING";
export const API_SUCCESS = "API_SUCCESS";
export const API_ERROR = "API_ERROR";
export const API_EMPTY_DATA = "API_EMPTY_DATA"
export const API_PENDING_PCES_ACCS = "API_PENDING_PCES_ACCS"
export const DEFINE_MESSAGE = "DEFINE_MESSAGE"
export const DEFINE_ERROR = "DEFINE_ERROR"
export const DEFINE_MSG = "DEFINE_MSG"
export const DEFINE_ERRORMSG = "DEFINE_ERRORMSG"
export const CLEAN_ALL_MESSAGES_ERRORS = "CLEAN_ALL_MESSAGES_ERRORS"

//action's type for bc
export const RECORD_SELECTED_BC = "RECORD_SELECTED_BC";
export const PURGE_BC = "PURGE_BC";
//action's type for pces and accs (pièces et accessoires)
export const FETCH_PCE_SUCCESS = "FETCH_PCE_SUCCESS"
export const LOAD_FULL_PCES_TAB = "LOAD_FULL_PCES_TAB"
export const LOAD_LOADED_PCES_TAB = "LOAD_LOADED_PCES_TAB"
export const LOAD_PROP_PCES_TAB = "LOAD_PROP_PCES_TAB"
export const LOAD_OTHER_PCES_TAB = "LOAD_OTHER_PCES_TAB"
export const FETCH_ACC_SUCCESS = "FETCH_ACC_SUCCESS"
export const PURGE_PCES_ACCS = "PURGE_PCES_ACCS"
export const CHANGE_PCE_LOADED_STATUS = "CHANGE_PCE_LOADED_STATUS";
export const CHANGE_PCE_DATE = "CHANGE_PCE_DATE";
export const CHANGE_PCE_LOADED_DATE = "CHANGE_PCE_LOADED_DATE";
export const CHANGE_PCE_PROP_DATE = "CHANGE_PCE_PROP_DATE";
export const CHANGE_PCE_OTHER_DATE = "CHANGE_PCE_OTHER_DATE";
export const CHANGE_PCE_OBSERV_BC = "CHANGE_PCE_OBSERV_BC";
export const LOAD_LOADED_ACCS = "LOAD_LOADED_ACCS";
export const LOAD_PROP_ACCS = "LOAD_PROP_ACCS";
export const LOAD_ACCS = "LOAD_ACCS";
export const CHANGE_ACC_QTE = "CHANGE_ACC_QTE";
export const CHANGE_ACC_DATE = "CHANGE_ACC_DATE";
export const CHANGE_ACC_OBSERV_BC = "CHANGE_ACC_OBSERV_BC";
export const CHANGE_LOAD_ACC = "CHANGE_LOAD_ACC";
export const SEARCH_PCE_ID = "SEARCH_PCE_ID";
export const ADD_PCE = "ADD_PCE";
export const EMPTY_PCES_CHANGED = "EMPTY_PCES_CHANGED";

//action's type to set application
export const SET_BACKURL = "SET_BACKURL";
export const SET_URL = "SET_URL";

//action creators for API to get pces and accs...

export const emptyPcesChanged = () => {
  return {
    type: EMPTY_PCES_CHANGED,
  };
};

export const AddPce = (pce) => {
  //console.error("ID "+id);
  return { 
    type: ADD_PCE,
    payload: pce,
  };
};

export const searchPceId = (pce_num) => {
  return {
    type: SEARCH_PCE_ID,
    payload: pce_num,
  };
};

export const changeLoadAcc = (id) => {
  return { 
    type: CHANGE_LOAD_ACC,
    payload: id,
  };
};

export const changeAccQte = (obj) => {
  return {
    type: CHANGE_ACC_QTE,
    payload: obj,
  };
};
export const changePceObservBc = (data) => {
  return {
    type: CHANGE_PCE_OBSERV_BC,
    payload: data,
  };
};
export const changeAccObservBc = (obj) => {
  return {
    type: CHANGE_ACC_OBSERV_BC,
    payload: obj,
  };
};
export const changeAccDate = (access) => {
  return {
    type: CHANGE_ACC_DATE,
    payload: access,
  };
};
export const changePceDate = (pce) => {
  return {
    type: CHANGE_PCE_DATE,
    payload: pce,
  };
};
export const changePceLoadedDate = (pce) => {
  return {
    type: CHANGE_PCE_LOADED_DATE,
    payload: pce,
  };
};
export const changePcePropDate = (pce) => {
  return {
    type: CHANGE_PCE_PROP_DATE,
    payload: pce,
  };
};
export const changePceOtherDate = (pce) => {
  return {
    type: CHANGE_PCE_OTHER_DATE,
    payload: pce,
  };
};
export const changePceLoadedStatus = (pce) => {
  return {
    type: CHANGE_PCE_LOADED_STATUS,
    payload: pce,
  };
};

export const fetchPceSuccess = (pce) => {
  return {
    type: FETCH_PCE_SUCCESS,
    payload: pce,
  };
};

export const loadFullPcesTab = (tabPces) => {
  return {
    type: LOAD_FULL_PCES_TAB,
    payload: tabPces,
  };
}; 
export const loadLoadedPcesTab = (tabPcesLoaded) => {
  return {
    type: LOAD_LOADED_PCES_TAB,
    payload: tabPcesLoaded,
  };
};
export const loadPropPcesTab = (tabPcesProp) => {
  return {
    type: LOAD_PROP_PCES_TAB,
    payload: tabPcesProp,
  };
};
export const loadOtherPcesTab = (tabPcesOther) => {
  return {
    type: LOAD_OTHER_PCES_TAB,
    payload: tabPcesOther,
  };
};
export const fetchAccSuccess = (acc) => {
  return {
    type: FETCH_ACC_SUCCESS,
    payload: acc,
  };
};
export const purgePcesAccs = () => {
  return {
    type: PURGE_PCES_ACCS,
  };
};
export const loadLoadedAccs = (accsTab) => {
  return {
    type: LOAD_LOADED_ACCS,
    payload: accsTab,
  };
};
export const loadPropAccs = (accsTab) => {
  return {
    type: LOAD_PROP_ACCS,
    payload: accsTab,
  };
};
export const loadAccs = (accsTabs) => {
  return {
    type: LOAD_ACCS,
    payload: accsTabs,
  };
};
//action creators for bc
export const recordSelectedBc = (bc) => {
  return {
    type: RECORD_SELECTED_BC,
    payload: bc,
  };
};
export const purgeBc = () => {
  return {
    type: PURGE_BC,
  };
};

//action creators for login
export const addToken = (token) => {
  return {
    type: ADD_TOKEN,
    payload: token,
  };
};

export const addRefreshToken = (refreshToken) => {
  return {
    type: ADD_REFRESH_TOKEN,
    payload: refreshToken,
  };
};

export const addUser = (username) => {
  return {
    type: ADD_USER,
    payload: username,
  };
};

export const toggleIsLogged = (isLogged) => {
  return {
    type: TOGGLE_IS_LOGGED,
    payload: isLogged,
  };
};

export const toggleScanView = (scanView) => {
  return {
    type: TOGGLE_SCANVIEW,
    payload: scanView,
  };
};

export const signout = () => {
  persistor.purge();
  return {
    type: SIGNOUT,
  };
};

export const actionInProgress = (true_or_false) => {
  return {
    type: SET_ACTION_IN_PROGRESS,
    payload: true_or_false
  };
};

// action creators for API

export const fetchData = () => ({
  type: API_PENDING,
});

export const fetchDataPcesAccs = () => ({
  type: API_PENDING_PCES_ACCS,
});

export const fetchSuccess = (data) => (
  //console.log("the data : "+JSON.stringify(data)),
  {
  type: API_SUCCESS,
  payload: data,
});

export const fetchError = (error) => ({
  type: API_ERROR,
  payload: error,
});

export const apiEmptyData = () => ({
  type: API_EMPTY_DATA
});

export const defineMessage = (msg) => ({
  type: DEFINE_MESSAGE,
  payload: msg,
})

export const defineError = (error) => ({
  type: DEFINE_MESSAGE,
  payload: error,
})

export const defineMsg = (msg) => ({
  type: DEFINE_MSG,
  payload: msg,
})

export const defineErrormsg = (error) => ({
  type: DEFINE_ERRORMSG,
  payload: error,
})

export const cleanAllMessagesErrors = () => ({
  type: CLEAN_ALL_MESSAGES_ERRORS,
})

//action creators to setup application
export const setBackurl = () => {
  return {
    type: SET_BACKURL,
  };
};

export const setUrl = (anurl) => {
  return {
    type: SET_URL,
    payload: anurl,
  };
};
