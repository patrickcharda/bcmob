import { API_PENDING, API_SUCCESS, API_ERROR, API_EMPTY_DATA, DEFINE_MESSAGE, DEFINE_ERROR, DEFINE_MSG, DEFINE_ERRORMSG, SIGNOUT, CLEAN_ALL_MESSAGES_ERRORS } from "./actions";

const initialState = { 
    loading: false,
    data: '',
    error: '',
    message:'',
    msg:'',
    errormsg: '',
};

const apiReducer = (state=initialState, action) => {
    switch(action.type){
        case API_PENDING:
            return {
                ...state,
                loading: true,
                message: 'en cours de traitement...'
            };
        case API_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                message: '',
            };
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                message: "Le serveur rencontre un problème. Veuillez réessayer ultérieurement. ",
            };
        case API_EMPTY_DATA:
            return {
                ...state,
                data:'',
            }
        case DEFINE_MESSAGE:
            return {
                ...state,
                message: action.payload,
            }
        case DEFINE_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case DEFINE_MSG:
            return {
                ...state,
                msg: action.payload,
            }
        case DEFINE_ERRORMSG:
            return {
                ...state,
                errormsg: action.payload,
            }
        case SIGNOUT:
            return {
                ...state,
                loading: false,
                data: '',
                error: '',
                message:'',
                msg:'',
                errormsg: '',
            }
        case CLEAN_ALL_MESSAGES_ERRORS:
            return {
                ...state,
                error: "",
                errormsg: "",
                message: "",
                msg: "",
            };
        default:
            return state;
    }
}

export default apiReducer