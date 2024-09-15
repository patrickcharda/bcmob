import { cloneDeep } from 'lodash';
import {
  FETCH_ACC_SUCCESS,
  FETCH_PCE_SUCCESS,
  LOAD_FULL_PCES_TAB,
  LOAD_LOADED_PCES_TAB,
  LOAD_PROP_PCES_TAB,
  LOAD_OTHER_PCES_TAB,
  PURGE_PCES_ACCS,
  API_PENDING_PCES_ACCS,
  CHANGE_PCE_LOADED_STATUS,
  CHANGE_PCE_DATE,
  CHANGE_PCE_LOADED_DATE,
  CHANGE_PCE_PROP_DATE,
  CHANGE_PCE_OTHER_DATE,
  CHANGE_PCE_OBSERV_BC,
  LOAD_LOADED_ACCS,
  LOAD_PROP_ACCS,
  LOAD_ACCS,
  CHANGE_ACC_QTE,
  CHANGE_ACC_DATE,
  CHANGE_ACC_OBSERV_BC,
  CHANGE_LOAD_ACC,
  SEARCH_PCE_ID,
  ADD_PCE,
  EMPTY_PCES_CHANGED,
} from "./actions";

const initialState = {
  loading: false,
  pces: [],
  pcesLoaded:[],
  pcesProp:[],
  pcesOther:[],
  accs: [],
  accsLoaded:[],
  accsProp:[],
  pcesChanged:[],
};

const getFormatedDate = () => {
  let dateMajBLModifie = new Date();
  let formatedDate =
    dateMajBLModifie.getFullYear() +
    "-" +
    String(dateMajBLModifie.getMonth() + 1).padStart(2, '0') +
    "-" +
    String(dateMajBLModifie.getDate()).padStart(2, '0');
  formatedDate +=
    " " +
    String(dateMajBLModifie.getHours()).padStart(2, '0') +
    ":" +
    String(dateMajBLModifie.getMinutes()).padStart(2, '0') +
    ":" +
    String(dateMajBLModifie.getSeconds()).padStart(2, '0');
  return formatedDate;
}

const pcesAccsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPTY_PCES_CHANGED:
      return {
        ...state,
        pcesChanged:[]
      }
    case ADD_PCE:
      console.error(action.payload);
      let changedPce = Object.assign({},action.payload);
      return {
        ...state,
        pcesChanged: [...state.pcesChanged, changedPce]
      }
    case SEARCH_PCE_ID:
      let pce_num = action.payload;
      console.log("SEARCH... PCE_NUM : "+pce_num);
      const searchedIdx = state.pces.findIndex(pce => pce.pce_num === String(pce_num));
      console.log("INDEX PCE DS PCES : "+searchedIdx)
      let searchedPce="";
      if (searchedIdx !== -1) {
        searchedPce = state.pces[searchedIdx];
        console.log("SEARCHED PCE : "+JSON.stringify(searchedPce));
      }
      if (searchedPce !== "") {
        if (searchedPce.pce_charge) { //la pce est déjà chargée, on retourne le state inchangé
          return {
            ...state,
          }
        } else { // on va actualiser le state en fonction des cas
          const new_ArrayPces = cloneDeep(state.pces);
          const new_ArrayPcesLoaded = cloneDeep(state.pcesLoaded);
          const new_ArrayPcesProp = cloneDeep(state.pcesProp);
          const new_ArrayPcesOther = cloneDeep(state.pcesOther);

          // chercher la piece ds le tableau cloné
          const index = new_ArrayPces.findIndex(pce => pce.pce_num === pce_num);
          new_ArrayPces[index].pce_charge = true;
          // ajouter la piece ds le tableau des pces chargées
          new_ArrayPcesLoaded.push(new_ArrayPces[index]);
          // si la pce est ds le tableau des pces proposées on le retire de là
          const idx = new_ArrayPcesProp.findIndex(pce => pce.pce_num === pce_num)
          if (idx !== -1) {
            new_ArrayPcesProp.splice(idx, 1);
            return {
              ...state,
              pces: new_ArrayPces,
              pcesLoaded: new_ArrayPcesLoaded,
              pcesProp: new_ArrayPcesProp,
            }
          } else { // ds ce cas la pce est ds le tableau des autres pieces, on la retire de là
            const idx = new_ArrayPcesOther.findIndex(pce => pce.pce_num === pce_num)
            if (idx !== -1) {
              new_ArrayPcesOther.splice(idx, 1);
              return {
                ...state,
                pces: new_ArrayPces,
                pcesLoaded: new_ArrayPcesLoaded,
                pcesOther: new_ArrayPcesOther,
              }
            }
          }
        } 
      }
      return {
        ...state,
      }
    case CHANGE_ACC_QTE:
      let obj = action.payload;
      let qte = obj.qte;
      let id = obj.id;
      let charge = obj.charge;
      let newArrayAccs = cloneDeep(state.accs);
      let newArrayLoadedAccs = cloneDeep(state.accsLoaded);
      let newArrayPropAccs = cloneDeep(state.accsProp);
      const indexAccs = newArrayAccs.findIndex(acc => acc.id === id);
      newArrayAccs[indexAccs].pdt_qte = qte;
      if (charge) {
        const indexLoadedAccs = newArrayLoadedAccs.findIndex(acc => acc.id === id);
        newArrayLoadedAccs[indexLoadedAccs].pdt_qte = qte;
      } else {
        const indexPropAccs = newArrayPropAccs.findIndex(acc => acc.id === id);
        newArrayPropAccs[indexPropAccs].pdt_qte = qte;
      }
      return {
        ...state, 
        accsLoaded: newArrayLoadedAccs,
        accsProp: newArrayPropAccs,
        accs: newArrayAccs,
      } 
    case CHANGE_LOAD_ACC:
      let acc_id = action.payload;
      let aNewArrayAccs = cloneDeep(state.accs);
      let aNewArrayLoadedAccs = cloneDeep(state.accsLoaded);
      let aNewArrayPropAccs = cloneDeep(state.accsProp);
      const idexAccs = aNewArrayAccs.findIndex(acc => acc.id == acc_id);
      let pdtCharge = aNewArrayAccs[idexAccs].pdt_charge; // reference ancien etat
      aNewArrayAccs[idexAccs].pdt_charge = !pdtCharge; // etat modifié
      let updatedPdt = aNewArrayAccs[idexAccs]; // pdt actualisé
      if (pdtCharge) {
        const idexLoadedAcc = aNewArrayLoadedAccs.findIndex(acc => acc.id == acc_id);
        aNewArrayLoadedAccs[idexLoadedAcc].pdt_charge = !pdtCharge;
        aNewArrayLoadedAccs.splice(idexLoadedAcc,1); // on retire l'ancien élément
        aNewArrayPropAccs.push(updatedPdt); // on rajoute le nouveau
      } else {
        const idexPropAcc = aNewArrayPropAccs.findIndex(acc => acc.id == acc_id);
        aNewArrayPropAccs.splice(idexPropAcc,1); // on retire l'ancien élément
        aNewArrayLoadedAccs.push(updatedPdt); // on rajoute le nouveau
      }
      return {
        ...state, 
        accsLoaded: aNewArrayLoadedAccs,
        accsProp: aNewArrayPropAccs,
        accs: aNewArrayAccs,
      } 
    case CHANGE_PCE_OBSERV_BC:
      let modifiedElement = Object.assign({},action.payload.piece);
      let observ= action.payload.texte;
      //console.log("MODIFIED ELEMENT "+JSON.stringify(modifiedElement));
      //console.log("OBSERVATIONS "+observ);
      const new_ArrayPces = cloneDeep(state.pces);//JSON.parse(JSON.stringify(state.pces)); //[...state.pces];
      const new_ArrayPcesLoaded = cloneDeep(state.pcesLoaded);
      const new_ArrayPcesProp = cloneDeep(state.pcesProp);
      const new_ArrayPcesOther = cloneDeep(state.pcesOther);
      // on prépare tout de suite le changement de la valeur du champ d'observations pce_observ_bc dans la liste pces
      const index_Pces = new_ArrayPces.findIndex(pce => pce.id === modifiedElement.id);
      //console.log(new_ArrayPces[index_Pces].pce_observ_bc);
      new_ArrayPces[index_Pces].pce_observ_bc = observ; 
      // si c'est une pièce chargée
      if (modifiedElement.pce_charge) {
        const index_PcesLoaded = new_ArrayPcesLoaded.findIndex(pce => pce.id === modifiedElement.id);
        new_ArrayPcesLoaded[index_PcesLoaded].pce_observ_bc = observ; 
      } else if (modifiedElement.pce_prop_charge) {
        // sinon si c'est une pièce proposée
        const index_PcesProp = new_ArrayPcesProp.findIndex(pce => pce.id === modifiedElement.id);
        new_ArrayPcesProp[index_PcesProp].pce_observ_bc = observ; 
      } else {
        // sinon c'est une pièce autre
        const index_PcesOther = new_ArrayPcesOther.findIndex(pce => pce.id === modifiedElement.id);
        new_ArrayPcesOther[index_PcesOther].pce_observ_bc = observ; 
      }
      return {
        ...state, 
        pcesLoaded: new_ArrayPcesLoaded,
        pcesProp: new_ArrayPcesProp,
        pcesOther: new_ArrayPcesOther,
        pces: new_ArrayPces,
      }
    case CHANGE_ACC_OBSERV_BC:
      let obje = action.payload;
      //console.log("OBJ OBJ OBJ "+obj.id)
      let accObserv = obje.observ;
      let accId = obje.id;

      let newArrAccs = cloneDeep(state.accs);
      let newArrLoadedAccs = cloneDeep(state.accsLoaded);
      let newArrPropAccs = cloneDeep(state.accsProp);
      const idxAccs = newArrAccs.findIndex(acc => acc.id === accId);
      newArrAccs[idxAccs].pdt_observ_bc = accObserv;

      const idxLoadedAccs = newArrLoadedAccs.findIndex(acc => acc.id === accId);
      if (idxLoadedAccs !== -1) {
        newArrLoadedAccs[idxLoadedAccs].pdt_observ_bc = accObserv;
      } else {
        const idxPropAccs = newArrPropAccs.findIndex(acc => acc.id === accId);
        newArrPropAccs[idxPropAccs].pdt_observ_bc = accObserv;
      }
      return {
        ...state, 
        accsLoaded: newArrLoadedAccs,
        accsProp: newArrPropAccs,
        accs: newArrAccs,
      }
    case API_PENDING_PCES_ACCS:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PCE_LOADED_STATUS:
      let changedElement = Object.assign({},action.payload);
      changedElement.pce_charge = !changedElement.pce_charge; // on permute chargée/déchargée
      const newArrayPces = cloneDeep(state.pces);//JSON.parse(JSON.stringify(state.pces)); //[...state.pces];
      const newArrayPcesLoaded = cloneDeep(state.pcesLoaded);
      const newArrayPcesProp = cloneDeep(state.pcesProp);
      const newArrayPcesOther = cloneDeep(state.pcesOther);
      // on change tout de suite le statut de chargement de la pce ds la future liste des pieces 
      const indexPces = newArrayPces.findIndex(pce => pce.id === action.payload.id);
      newArrayPces[indexPces].pce_charge = changedElement.pce_charge; // on change le statut de la pce ds la liste des pces

      if (action.payload && action.payload.pce_charge === true) {
        // décharger = supprimer piece de la liste des pièces chargées et modifier statut pce ds liste ttes pces
        const indexPcesLoaded = newArrayPcesLoaded.findIndex(pce => pce.id === action.payload.id);
        newArrayPcesLoaded.splice(indexPcesLoaded, 1); //on supprime à l'index

        if (action.payload.pce_prop_charge) {
          // ajouter la pce dans la liste des pièces proposées
          newArrayPcesProp.push(changedElement)
          return {
            ...state, 
            pcesLoaded: newArrayPcesLoaded,
            pcesProp: newArrayPcesProp,
            pces: newArrayPces,
          }
        } else {
          // ajouter la pce ds la liste des autres pces (ni chargées ni proposées)
          newArrayPcesOther.push(changedElement);
          return {
            ...state, 
            pcesLoaded: newArrayPcesLoaded,
            pcesOther: newArrayPcesOther,
            pces: newArrayPces,
          }
        }
      } else {
        // charger la pièce 
        newArrayPcesLoaded.push(changedElement);

        if (action.payload.pce_prop_charge) {
          // supprimer de la liste des pièces proposées (puisque pce passée dans la liste des pces chargées)
          const indexPcesProp = newArrayPcesProp.findIndex(pce => pce.id === action.payload.id);
          newArrayPcesProp.splice(indexPcesProp, 1);
          return {
            ...state,
            pcesLoaded: newArrayPcesLoaded,
            pcesProp: newArrayPcesProp,
            pces: newArrayPces,
          }
        } else {
          // supprimer de la liste des autres pièces (puisque pce passée dans la liste des pces chargées)
          const indexPcesOther = newArrayPcesOther.findIndex(pce => pce.id === action.payload.id);
          newArrayPcesOther.splice(indexPcesOther, 1);
          return {
            ...state,
            pcesLoaded: newArrayPcesLoaded,
            pcesOther: newArrayPcesOther,
            pces: newArrayPces,
          }
        }
      };
    case CHANGE_ACC_DATE:
      let currentDate = getFormatedDate();
      //console.log("DATE HEURE "+currentDate);
      let newTabAccs = cloneDeep(state.accs);
      let newTabAccsLoaded = cloneDeep(state.accsLoaded);
      let newTabAccsProp = cloneDeep(state.accsProp);
      let indexAcc = newTabAccs.findIndex(acc => acc.id === action.payload.id);
      
      //console.log('action.payload.id '+ action.payload.id);
      let indexAccLoaded = newTabAccsLoaded.findIndex(acc => acc.id === action.payload.id);
      //console.log("INDEX ACCS LOADED "+indexAccLoaded);
      let indexAccProp = newTabAccsProp.findIndex(acc => acc.id === action.payload.id);
      //console.log("INDEX ACCS PROP "+indexAccProp);
      newTabAccs[indexAcc].pdt_date_web = currentDate;
      if (indexAccLoaded !== -1) {newTabAccsLoaded[indexAccLoaded].pdt_date_web = currentDate;}
      if (indexAccProp !== -1) {newTabAccsProp[indexAccProp].pdt_date_web = currentDate;}
      return {
        ...state,
        accs: newTabAccs,
        accsLoaded: newTabAccsLoaded,
        accsProp: newTabAccsProp,
      }
    case CHANGE_PCE_DATE:
      // récupérer la date du jour et la formater la date pr la persister
      let formatedDate = getFormatedDate()
      console.log("formated pce date "+formatedDate);
      // Modifier date ds liste pces
      let newTabPces = cloneDeep(state.pces);
      let indexPce = newTabPces.findIndex(pce => pce.id === action.payload.id);
      //console.log("index tableau "+indexPce);
      newTabPces[indexPce].pce_date_web = formatedDate; // on change la date de la pce ds la liste des pces
      //console.log(newTabPces[indexPce]);
      return {
        ...state, 
        pces: newTabPces,
      }  
    case CHANGE_PCE_LOADED_DATE:
      // récupérer la date du jour et la formater la date pr la persister
      let formatedDat = getFormatedDate()
      //console.log(formatedDat);
      // Modifier date ds liste pces chargées
      let newTabPcesLoaded = cloneDeep(state.pcesLoaded);
      let indexPceLoaded = newTabPcesLoaded.findIndex(pce => pce.id === action.payload.id);
      //console.log("index tableau "+indexPceLoaded);
      newTabPcesLoaded[indexPceLoaded].pce_date_web = formatedDat; // on change la date de la pce ds la liste des pces chargées
      //console.log(newTabPcesLoaded[indexPceLoaded]);
      return {
        ...state, 
        pcesLoaded: newTabPcesLoaded,
      }
    case CHANGE_PCE_PROP_DATE:
      // récupérer la date du jour et la formater la date pr la persister
      let formatDate = getFormatedDate()
      //console.log(formatDate);
      // Modifier date ds liste pces proposées
      let newTabPcesProp = cloneDeep(state.pcesProp);
      let indexPceProp = newTabPcesProp.findIndex(pce => pce.id === action.payload.id);
      //console.log("index tableau "+indexPceProp);
      newTabPcesProp[indexPceProp].pce_date_web = formatDate; // on change la date de la pce ds la liste des pces proposées
      //console.log(newTabPcesProp[indexPceProp]);
      return {
        ...state, 
        pcesProp: newTabPcesProp,
      }  
    case CHANGE_PCE_OTHER_DATE:
      // récupérer la date du jour et la formater la date pr la persister
      let formDate = getFormatedDate()
      //console.log(formDate);
      // Modifier date ds liste pces proposées
      let newTabPcesOther = cloneDeep(state.pcesOther);
      let indexPceOther = newTabPcesOther.findIndex(pce => pce.id === action.payload.id);
      //console.log("index tableau "+indexPceOther);
      newTabPcesOther[indexPceOther].pce_date_web = formDate; // on change la date de la pce ds la liste des pces proposées
      //console.log(newTabPcesOther[indexPceOther]);
      return {
        ...state, 
        pcesOther: newTabPcesOther,
      } 
    case FETCH_PCE_SUCCESS:
      if (action.payload && action.payload.pce_charge) {
        return {
          ...state,
          pces: [...state.pces, action.payload],
          pcesLoaded: [...state.pcesLoaded, action.payload],
          loading: false,
        } 
      } else if (action.payload && action.payload.pce_prop_charge) {
        return {
          ...state,
          pces: [...state.pces, action.payload],
          pcesProp: [...state.pcesProp, action.payload],
          loading: false,
        }
      } else {
        return {
          ...state,
          pces: [...state.pces, action.payload],
          pcesOther: [...state.pcesOther, action.payload],
          loading: false,
        }
      }
    case LOAD_FULL_PCES_TAB:
      return {
        ...state,
        pces: action.payload,
      }
    case LOAD_LOADED_PCES_TAB:
      return {
        ...state,
        pcesLoaded: action.payload,
      }
    case LOAD_PROP_PCES_TAB:
      return {
        ...state,
        pcesProp: action.payload,
      }
    case LOAD_OTHER_PCES_TAB:
      return {
        ...state,
        pcesOther: action.payload,
      }
    case FETCH_ACC_SUCCESS:
      return {
        ...state,
        accs: [...state.accs, action.payload],
        loading: false,
      };
    case PURGE_PCES_ACCS:
      return {
        ...state,
        pces: [],
        accs: [],
        accsLoaded: [],
        accsProp: [],
        pcesLoaded: [],
        pcesProp: [],
        pcesOther: [],
      }
    case LOAD_LOADED_ACCS:
      return {
        ...state,
        accsLoaded: action.payload,
      }
    case LOAD_PROP_ACCS:
      return {
        ...state,
        accsProp: action.payload,
      }
    case LOAD_ACCS:
      return {
        ...state,
        accs: action.payload,
      }
    default:
      return state;
  }
};

export default pcesAccsReducer;