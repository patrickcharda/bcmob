import BcHeader from "./BcHeader";
import BcPce from "./BcPce";
import BcAcc from "./BcAcc";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { defineMessage, changePceDate, changePceLoadedDate, changePcePropDate, changePceOtherDate, loadFullPcesTab, loadLoadedPcesTab,
   loadPropPcesTab, loadOtherPcesTab, loadLoadedAccs, loadPropAccs, loadAccs, changeAccDate,
    purgeBc, purgePcesAccs, actionInProgress, defineErrormsg, defineMsg, recordSelectedBc, emptyPcesChanged } from "../redux/actions";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as Device from "expo-device";
import * as Application from 'expo-application';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
//import { BASE_URL } from "../env";


const appliname = "bcweb";

const getFingerprint = async () => {
  let fp = await AsyncStorage.getItem('fp');
  if (!fp) {
    fp = uuid.v4();
    await AsyncStorage.setItem('fp', fp);
  }
  fp += Application.nativeBuildVersion + Device.deviceYearClass.toString();
  return fp;
};
var fingerprint;
getFingerprint().then(result => {
  fingerprint = result;
});
console.log("UUID : "+fingerprint);
const NB_ITER = 5;
const DELAY_N_SECONDS = 3000;

const Bc = ({ tabPces }) => {
  
  const token = useSelector((state) => state.tokenReducer.token);
  const username = useSelector((state) => state.tokenReducer.username);
  const BASE_URL = useSelector((state) => state.configReducer.url);
  const endpointCheckok = BASE_URL+"/bcweb/checkok/";
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = React.useState(false); //booleen pr affichage/masquage entête BC
  const [isLoadListOpen, setIsLoadListOpen] = React.useState(false);
  const [isPropListOpen, setIsPropListOpen] = React.useState(false);
  const [isOtherListOpen, setIsOtherListOpen] = React.useState(false);
  const [isLoadAccsOpen, setIsLoadAccsOpen] = React.useState(false);
  const [isPropAccsOpen, setIsPropAccsOpen] = React.useState(false);
  const [modalReinitVisible, setModalReinitVisible] = React.useState(false);
  const navigation = useNavigation();
  const bonChargement = useSelector((state) => state.bcReducer.bc);
  const [isActionBeingExecuted, setIsActionBeingExecuted] = React.useState(false);
  const [buttonColor1, setButtonColor1] = React.useState('#00334A');
  const [buttonColor2, setButtonColor2] = React.useState('#00334A');
  const [buttonColor3, setButtonColor3] = React.useState('#00334A');
  const [bgHeaderBCColor, setBgHeaderBCColor] = React.useState(true);
  const [btnListLoadColor, setBtnListLoadColor] = React.useState('#007FA9');
  const [btnListPropColor, setBtnListPropColor] = React.useState('#82CFD8');
  const [btnListOtherColor, setBtnListOtherColor] = React.useState('#CEDDDE');
  
  const handleClickInLoadList = () => {
    setBtnListLoadColor('#6DA557')
  };
  const handleClickOutLoadList = () => {
    setBtnListLoadColor('#007FA9')
  };

  const handleClickInPropList = () => {
    setBtnListPropColor('#6DA557')
  };
  const handleClickOutPropList = () => {
    setBtnListPropColor('#82CFD8')
  };

  const handleClickInOtherList = () => {
    setBtnListOtherColor('#6DA557')
  };
  const handleClickOutOtherList = () => {
    setBtnListOtherColor('#CEDDDE')
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
      //console.error(formatedDate);
    return formatedDate;
  }

  const defineBgHeaderBCColor = () => {
    return bgHeaderBCColor ? "#00334A" : "#6DA557";
  };

  /* recupération des listes de pièces du state */
  const pces = useSelector((state) => state.pcesAccsReducer.pces);
  const pcesLoaded = useSelector((state) => state.pcesAccsReducer.pcesLoaded);
  const pcesProp = useSelector((state) => state.pcesAccsReducer.pcesProp);
  const pcesOther = useSelector((state) => state.pcesAccsReducer.pcesOther);
  const pcesChanged = useSelector((state) => state.pcesAccsReducer.pcesChanged);

  /* récupération des produits du state */
  const accs = useSelector((state) => state.pcesAccsReducer.accs);
  const accsLoaded = useSelector((state) => state.pcesAccsReducer.accsLoaded);
  const accsProp = useSelector((state) => state.pcesAccsReducer.accsProp);

  //const BASE_URL = "https://back-xxx.monkey-soft.fr:54443";
  const URL_SLICER_NB_CHAR = BASE_URL.length + 11;

  let piecesLoaded = [];
  let piecesProp = [];
  let piecesOther = [];

  /* tabPces est le tableau de tableaux des différentes catégories de pièces (loaded, prop, other); "ce tableau est en RAM";
  il va servir à afficher les pièces immédiatement (donc le BC), avant que les pièces soient stockées dans le state, en ROM donc */
  if (pces.length === 0 && tabPces != undefined && Array.isArray(tabPces) && tabPces.length > 0) { // au 1er chargement du Bc, lorsqu'il n'est pas déjà ds le state
    piecesLoaded = tabPces[0];
    piecesProp = tabPces[1];
    piecesOther = tabPces[2];
  } else if (tabPces != undefined && Array.isArray(tabPces) && tabPces.length > 0) { // le state pces n'est pas vide, on va l'utiliser
    piecesLoaded = pcesLoaded;
    piecesProp = pcesProp;
    piecesOther = pcesOther;
  }


  /*  pour optimiser l'affichage le calcul du poids et du nombre de pièces chargées sera fait une fois les listes affichées, le state étant alors seulement mis à jour à ce moment là;
  ce calcul se base sur le state et non les listes en RAM */
  let nbPcesChargees = pcesLoaded.length;
  let poids = 0;
  if (pcesLoaded.length > 0) {
    pcesLoaded.map((pce) => (poids += parseFloat(pce.pce_poids)));
  }

  // on stocke une référence au tableau de tableaux des pièces pour pouvoir l'appeler via useEffect une fois le composant rendered
  let refTabPces = React.useRef(tabPces);

  /* ce hook se charge avec la référence au tableau de tableaux de pièces pour alimenter le state;
  le hook intervient après le 1er (et slt le 1er) rendu du composant */
  React.useEffect(() => {
    let newPcesLoaded = [];
    let newPcesProp = [];
    let newPcesOther = [];
    newPcesLoaded = refTabPces.current[0];
    newPcesProp = refTabPces.current[1];
    newPcesOther = refTabPces.current[2];
    dispatch(loadLoadedPcesTab(newPcesLoaded));
    dispatch(loadPropPcesTab(newPcesProp));
    dispatch(loadOtherPcesTab(newPcesOther));
    let fullPcesTab = newPcesLoaded.concat(newPcesProp, newPcesOther);
    dispatch(loadFullPcesTab(fullPcesTab));
  }, []);

  
  /* ce hook permet de récupérer les éventuels accessoires après le 1er rendu et slt après celui-ci;*/
  React.useEffect(() => {
    const getAcc = async (acc_id) => {
      /* console.log(acc_id);
      console.log(token);
      console.log(fingerprint);
      console.log(appliname); */
      let produit;
      try {
        produit = await axios.get(
          BASE_URL+"/bcweb/pdt/"+acc_id,
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Authorization": "Bearer " + token,
              "fingerprint": fingerprint,
              "appliname": appliname,
            },
          }
        );
        
      } catch (error) {
        console.error("Error fetching data: ", error);
        // handle error appropriately
      }
      return produit.data;
    }
    const fetchAccessories = async () => {
      if (bonChargement.produits !== undefined && bonChargement.produits.length > 0) {
        let pdtsLoaded = [];
        let pdtsProp = [];
        let pdts = [];
        let acc_id;
        //let endPointAcc;
        let accessoire;
        for (let i = 0; i < bonChargement.produits.length; i++) {
          acc_id = bonChargement.produits[i];
          acc_id = acc_id.slice(URL_SLICER_NB_CHAR, acc_id.length);
          accessoire = await getAcc(acc_id);
          //console.log(accessoire);
          if (accessoire.pdt_charge) {
            pdtsLoaded.push(accessoire);
          } else {
            pdtsProp.push(accessoire);
          }
          pdts.push(accessoire);
        }
        /* passer les accessoires dans le state */
        dispatch(loadLoadedAccs(pdtsLoaded));
        dispatch(loadPropAccs(pdtsProp));
        dispatch(loadAccs(pdts));
      }
    };
    /* si le state accs est à 0, on veut voir s'il y a des accessoires à charger;
    sinon cela signifie qu'il y a des accessoires ds le state (en cache donc) et qu'on cherche à charger depuis le cache un BC en cours */
    if (accs.length === 0 ) {
      fetchAccessories();
    }
    postReprise();
  }, []);


  /* fct enregistrement d'un bon de chargement   */
  const recordBc = async() => {
    /*
    Rem : pour économiser de la bande passante et de la charge, on pourrait ne se baser que sur le tableau pces chargées du state pour executer les appels api de mise à jour de la base de données 
    Le traitement se fait toujours par lots, mais il y a moins de données (pièces) à traiter
    */

    /* mise à jour du champ date pour horodater l'enreg ds la bdd (champs pce_date_web) */
  
    try {
      setIsActionBeingExecuted(true);
      dispatch(actionInProgress(true));
      dispatch(defineMsg("enregistrement en cours"));

      /* pces.map(pce => dispatch(changePceDate(pce)));
      pcesLoaded.map(pce => dispatch(changePceLoadedDate(pce)));
      pcesProp.map(pce => dispatch(changePcePropDate(pce)));
      pcesOther.map(pce => dispatch(changePceOtherDate(pce))); */
      
      /* let newPces, newPcesLoaded, newPcesProp, newPcesOther;

      newPces = cloneDeep(pces);
      newPcesLoaded = cloneDeep(pcesLoaded);
      newPcesProp = cloneDeep(pcesProp);
      newPcesOther = cloneDeep(pcesOther);

      newPces.map(pce => pce.pce_date_web = recordDate);
      newPcesLoaded.map(pce => pce.pce_date_web = recordDate);
      newPcesProp.map(pce => pce.pce_date_web = recordDate);
      newPcesOther.map(pce => pce.pce_date_web = recordDate);

      dispatch(loadFullPcesTab(newPces));
      dispatch(loadLoadedPcesTab(newPcesLoaded));
      dispatch(loadPropPcesTab(newPcesProp));
      dispatch(loadOtherPcesTab(newPcesProp)); */

      // Tronçonner le tableau des pièces en tableaux de 250 pièces
      let sliced_tabs = []; // tableau de tableaux tronçons de 250 pièces
      for (let i = 0; i < pces.length; i += 250) {
        let chunk = pces.slice(i, i + 250);
        sliced_tabs.push(chunk);
      }
      // mise à jour via tableau des seules pces modifiées
      /* for (let i = 0; i < pcesChanged.length; i += 250) {
        let chunk = pcesChanged.slice(i, i + 250);
        sliced_tabs.push(chunk);
      } */

      //màj les pces ds la bdd, tronçon de n par tronçon de n
      for (let j = 0; j < sliced_tabs.length; j++) {
        await patchBlocPces(sliced_tabs[j]);
      }
      //dispatch(emptyPcesChanged());
      //màj les accessoires s'il y en a
      if (accs.length > 0) {
        accs.map(access => dispatch(changeAccDate(access)));
        for (let access of accs) {
          await patchAcc(access);
        }
      }

      // Forcer màj date pce_date_web des pces du bc
      /* let reqBody = {
        "bc_num": bonChargement.bc_num,
        "username": username,
      }
      await axios.post(
        BASE_URL+"/bcweb/bc/updatedatepces/",
        JSON.stringify(reqBody),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer "+token,
            appliname: appliname,
            fingerprint: fingerprint,
          },
        }
      ); */

      //màj a) la date pr le state du BC b) les observations du BC au niveau de PostgreSQL
      let recordDate = getFormatedDate();
      //console.log("LA DATE "+recordDate);
      let reqBody2 = {
        "bc_observ": bonChargement.bc_observ,
        "bc_date_web": recordDate,
        "bc_webuser": username,
      }
      await axios.patch(
        BASE_URL+"/bcweb/bc/"+bonChargement.bc_num,
        JSON.stringify(reqBody2),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer "+token,
            appliname: appliname,
            fingerprint: fingerprint,
          },
        }
      );
      //recordDate = recordDate.slice(0, -6);
      const updatedBonChargement = { ...bonChargement, bc_date_web: recordDate };
      dispatch(recordSelectedBc(updatedBonChargement));
    } catch (error) {
      //console.log("erreur dans la fonction recordBc du Bc ", error)
      dispatch(defineErrormsg("erreur dans la fonction recordBc du Bc "+error))
      dispatch(defineMsg(""));
    } finally {
      setIsActionBeingExecuted(false);
      dispatch(actionInProgress(false));
      //return result
    }
  };

  const valideBc = async() => {
    //let result;
    try { 
      dispatch(defineMsg("Validation en cours..."));
      setIsActionBeingExecuted(true);
      dispatch(actionInProgress(true));
      await recordBc();
      setIsActionBeingExecuted(true);
      dispatch(actionInProgress(true));

      await valider();
      await checkOK();
      await reprise();

    } catch (error) {
      //console.log("erreur dans la fonction valideBc du Bc ", error);
      dispatch(defineErrormsg("erreur dans la fonction valideBc du Bc "+error));
      dispatch(defineMsg(""));
    } finally {
      setIsActionBeingExecuted(false);
      dispatch(actionInProgress(false));
      dispatch(purgeBc());
      navigation.goBack();
    }
    
    //return result;
  }

  const livreBc = async() => {
    //let result;
    try {
      dispatch(defineMsg("Livrable en cours..."));
      setIsActionBeingExecuted(true);
      dispatch(actionInProgress(true));
      await recordBc();
      //await recordBc();
      setIsActionBeingExecuted(true);
      dispatch(actionInProgress(true));

      await livrer();
      await checkOK();
      await reprise();

    } catch (error) {
      //console.log("erreur dans la fonction valideBc du Bc ", error);
      dispatch(defineErrormsg("erreur dans la fonction livreBc du Bc "+error));
      dispatch(defineMsg(""));
    } finally {
      setIsActionBeingExecuted(false);
      dispatch(actionInProgress(false));
      dispatch(purgeBc());
      navigation.goBack();
    }
    
  }
  
  const reprise = async() => {
    let result;
    try {
      let endpointReprise = BASE_URL+"/bcweb/reprise/"
      result = await axios.post(
        endpointReprise,
        JSON.stringify({
          "username": username,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer "+token,
            appliname: appliname,
            fingerprint: fingerprint,
          },
        }
      );
    } catch (error) {
      //console.log("erreur dans la fonction valider du Bc ", error)
      dispatch(defineErrormsg("erreur dans la fonction reprise "+error));
    } finally {
      return result
    }
  }

  const valider = async() => {
    let result;
    try {
      let endpointValider = BASE_URL+"/bcweb/valider/"
      result = await axios.post(
        endpointValider,
        JSON.stringify({
          "username": username,
          "bc_num": bonChargement.bc_num,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer "+token,
            appliname: appliname,
            fingerprint: fingerprint,
          },
        }
      );
    } catch (error) {
      //console.log("erreur dans la fonction valider du Bc ", error)
      dispatch(defineErrormsg("erreur dans la fonction valider du Bc "+error));
    } finally {
      return result
    }
  }

  const livrer = async() => {
    let result;
    try {
      let endpointLivrer = BASE_URL+"/bcweb/livrable/"
      result = await axios.post(
        endpointLivrer,
        JSON.stringify({
          "username": username,
          "bc_num": bonChargement.bc_num,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer "+token,
            appliname: appliname,
            fingerprint: fingerprint,
          },
        }
      );
    } catch (error) {
      //console.log("erreur dans la fonction valider du Bc ", error)
      dispatch(defineErrormsg("erreur dans la fonction Livrer du Bc "+error));
    } finally {
      return result
    }
  }
  
  /* fct enregistrement d'un ensemble/lot/bloc/tableau/tronçon de pièces   */
  const patchBlocPces = async (tabDePces) => {
    let endpointPcesToPatch = BASE_URL+"/bcweb/pcestopatch/";
    let result;
    try {
      dispatch(defineMsg("Enregistrement bloc des pièces du BC "));
      result = await axios.patch(
      endpointPcesToPatch,
      tabDePces,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer "+token,
          appliname: appliname,
          fingerprint: fingerprint,
        },
      }
    );
  } catch (error) {
    //console.log("erreur fonction patch bloc pieces du Bc", error)
    dispatch(defineErrormsg("Erreur enregistrement bloc des pièces du BC "+error));
  } finally {
    return result;
  }
  };


  const patchAcc = async (access) => {
    let endpointAccToPatch = BASE_URL+"/bcweb/pdt/"+access.id
    let result;
    try {
      result = await axios.patch(
        endpointAccToPatch,
        access,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer "+token,
            appliname: appliname,
            fingerprint: fingerprint,
          },
        }
      );
    } catch {
      //console.log("erreur ds la fonction patch acc ", error);
      dispatch(defineErrormsg("erreur ds la fonction patch acc "+error));
    } finally {
      return result
    }
    
  };

  const postReprise = async() => {
    try {
      let endpointReprise = BASE_URL+"/bcweb/reprise/";
    await axios.post(
      endpointReprise,
      JSON.stringify({
        "username": username,
      }),
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer "+token,
          appliname: appliname,
          fingerprint: fingerprint,
        },
      }
      );
    } catch (error) {
      //console.log("erreur ds la fonction postReprise de Bc ", error)
      dispatch(defineErrormsg("Erreur fct postReprise du BC "+error));
    }
  }

  const reinit = async (bonChargement) => {
    setIsActionBeingExecuted(true);
    dispatch(actionInProgress(true));
    let signalToGo = false;
    try {
      let bc_num = bonChargement.bc_num;
      let msg = "bc_num to reinit "+bc_num;
      dispatch(defineMessage(msg));
      let body = {"username":username, "bc_num": bc_num};
      let fermer = await reinitialiser(token, appliname, fingerprint, body);
      if (fermer.data.message === "fermer") {
        signalToGo = await checkOK();
      }
      if (signalToGo) {
        await reprise();
        msg = "La réinitialisation s'est bien déroulée";
        dispatch(defineMessage(msg));
      } else {
        await reprise();
        msg = "La réinitialisation ne s'est pas bien déroulée, merci de réessayer ultérieurement";
        dispatch(defineMessage(msg));
      }
    } catch (error) {
      //console.log("erreur ds fonction reinit du Bc ", error);
      dispatch(defineErrormsg("Erreur fct reinit du BC "+error));
    } finally {
      setIsActionBeingExecuted(false);
      dispatch(actionInProgress(false));
      return signalToGo;
    }
  }

  const reinitialiser = async(token, appliname, fingerprint, body) => {
    let fermer;
    try {
      fermer = await axios.post(
      BASE_URL+"/bcweb/fermer/",
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": "Bearer "+token,
          "appliname": appliname,
          "fingerprint": fingerprint,
        },
      }
    );
    //console.log("fermer :" + JSON.stringify(fermer));
    } catch (error) {
      //console.log("erreur action fermer/reinitialiser ds Bc")
      dispatch(defineErrormsg("Erreur fct reinitialiser du BC "+error));
    } finally {
      return fermer;
    }
  }

  /* const checkOK = async () => {
    try {
      let i = 0;
      let signalToGo = false;
      let response ="";
      console.error("FINGERPRINT "+fingerprint);
      console.error("NB_ITER "+NB_ITER);
      console.error("signalToGo "+signalToGo);
      console.error("username "+username);
      console.error("DELAY_N_SECONDS "+DELAY_N_SECONDS);
      while (i < NB_ITER && !signalToGo) {
        await new Promise(resolve => setTimeout(resolve,DELAY_N_SECONDS));
          response = await axios.post(
          endpointCheckok,
          JSON.stringify({
            "username": username,
            }),
            {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Authorization": 'Bearer '+token,
              "appliname": appliname,
              "fingerprint": fingerprint,
              },
            }
          );
          console.error("Response: ", response.data);
        
        if (response.data.message === "> ok") {
          signalToGo = true;
        }
        i++;
      }
      if (signalToGo === true) {
        return true;
      } 
    } catch (error) {
      console.error('error fct checkOK ds Bc : ', error);
      dispatch(defineErrormsg(`Erreur fct checkOK du BC ${error}`));
      return false
    }
  }; */

  const checkOK = async () => {
    try {
      let i = 0;
      let signalToGo = false;
      let response = "";
  
      /* console.error("FINGERPRINT: " + fingerprint);
      console.error("NB_ITER: " + NB_ITER);
      console.error("signalToGo: " + signalToGo);
      console.error("username: " + username);
      console.error("DELAY_N_SECONDS: " + DELAY_N_SECONDS);
      console.error("appliname: " + appliname); */
  
      while (i < NB_ITER && !signalToGo) {
        await new Promise(resolve => setTimeout(resolve, DELAY_N_SECONDS)); // Assuming DELAY_N_SECONDS is in seconds
        response = await axios.post(
          endpointCheckok,
          JSON.stringify({ username }),
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Authorization": `Bearer ${token}`,
              "appliname": appliname,
              "fingerprint": fingerprint,
            }
          }
        );
  
        //console.error("Response: ", response.data);
  
        if (response.data.message === "> ok") {
          signalToGo = true;
        }
        i++;
      }
  
      return signalToGo;
    } catch (error) {
      console.error('Error in checkOK function:', error);
      dispatch(defineErrormsg(`Erreur fct checkOK du BC ${error}`));
      return false;
    }
  };

  const handleReinitCancel = () => {
    // Handle the cancel action here
    setModalReinitVisible(false);
  };

  const handleReinitConfirm = (bonChargement) => {
    // Handle the confirm action here
    //console.log("CURRENT BC "+JSON.stringify(bonChargement));
    reinit(bonChargement);
    // si le bc reinitialisé est celui sur lequel on travaillait on réinitialise le state

    dispatch(purgeBc());
    dispatch(purgePcesAccs());
    setModalReinitVisible(false);
    /* navigation.navigate('BcList'); */
    navigation.goBack();
  }

  const formatPoids = (poids) => {
    return poids.toFixed(3)
  }
  
  return (
    isActionBeingExecuted ? <ActivityIndicator color="red" size="large" /> : 
    <View style={{ flex: 1, justifyContent: 'flex-start'}}>
      <View style={styles.container1}>
        {/* espace pr entête BC + listes de pièces */}

          <Pressable onPress={() => {setIsOpened(!isOpened);}} onPressIn={() => setBgHeaderBCColor(!bgHeaderBCColor)} onPressOut={() => setBgHeaderBCColor(!bgHeaderBCColor)} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: defineBgHeaderBCColor(), maxHeight:46, padding: 5 }}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 25, maxHeight: 40, color: 'white'}}>BC {bonChargement.bc_num}  </Text>
              {/* {isOpened ?<AntDesign name="downcircleo" size={20} color="white" style={{paddingTop: 10}}/>:<AntDesign name="leftcircleo" size={20} color="white" style={{paddingTop: 10}}/>} */}
              
            </View>
            <View>
              <Text style={{color:"white", fontWeight: 'bold', fontSize: 18}}>{formatPoids(poids) + " T"}</Text>
            </View>
          </Pressable>

        {isOpened && <View><BcHeader currentBc={bonChargement} /></View>}
        <ScrollView>
          <Pressable onPress = {()=>{setIsLoadListOpen(!isLoadListOpen)}} style={{backgroundColor:btnListLoadColor}} onPressIn={ handleClickInLoadList } onPressOut={ handleClickOutLoadList }>
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 5}}>
              <Text style={{...styles.defaultText, color: 'white'}}> Pièces chargées {piecesLoaded.length} / {pces.length}</Text>
              {isLoadListOpen?<AntDesign name="downcircle" size={24} color="white" />:<AntDesign name="leftcircle" size={24} color="white" />} 
            </View>
          </Pressable>
          {isLoadListOpen &&
            piecesLoaded.map((piece) => (
            <BcPce key={piece.id} piece={piece} loaded={true} headColor='#007FA9'/>
          ))}
          <Pressable onPress = {()=>{setIsPropListOpen(!isPropListOpen)}} style={{backgroundColor:btnListPropColor}} onPressIn={ handleClickInPropList } onPressOut={ handleClickOutPropList }>
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 5}}>
              <Text style={styles.defaultText}> Pièces Proposées {piecesProp.length} / {pces.length}</Text>
              {isPropListOpen?<AntDesign name="downcircle" size={24} color="black" />:<AntDesign name="leftcircle" size={24} color="black" />} 
            </View>
          </Pressable>
          {isPropListOpen &&
            piecesProp.map((piece) => (
            <BcPce key={piece.id} piece={piece} loaded={false} headColor='#82CFD8'/>
          ))}
          <Pressable onPress = {()=>{setIsOtherListOpen(!isOtherListOpen)}} style={{backgroundColor:btnListOtherColor}} onPressIn={ handleClickInOtherList } onPressOut={ handleClickOutOtherList }>
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 5}}>
              <Text style={styles.defaultText}> Pièces Autres {piecesOther.length} / {pces.length}</Text>
              {isOtherListOpen?<AntDesign name="downcircle" size={24} color="black" />:<AntDesign name="leftcircle" size={24} color="black" />} 
            </View>
          </Pressable>
          {isOtherListOpen && 
            piecesOther.map((piece) => (
            <BcPce key={piece.id} piece={piece} loaded={false} headColor='#CEDDDE'/>
          ))}
          <Pressable onPress = {()=>{setIsLoadAccsOpen(!isLoadAccsOpen)}} style={{backgroundColor:'#007FA9'}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 5}}>
              <Text style={{...styles.defaultText, color: '#ffffff'}}> Accessoires chargés {accsLoaded.length} / {accs.length}</Text>
              {isLoadAccsOpen?<AntDesign name="downcircle" size={24} color="white" />:<AntDesign name="leftcircle" size={24} color="white" />} 
            </View>
          </Pressable>
          {isLoadAccsOpen && 
            accsLoaded.map((acc) => (
            <BcAcc key={acc.id} accessoire={acc} loaded={true} headColor='#007FA9'/>
          ))}
          <Pressable onPress = {()=>{setIsPropAccsOpen(!isPropAccsOpen)}} style={{backgroundColor:'#82CFD8'}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', padding: 5}}>
              <Text style={styles.defaultText}> Accessoires proposés {accsProp.length} / {accs.length}</Text>
              {isPropAccsOpen?<AntDesign name="downcircle" size={24} color="black" />:<AntDesign name="leftcircle" size={24} color="black" />} 
            </View>
          </Pressable>
          {isPropAccsOpen && 
            accsProp.map((acc) => (
            <BcAcc key={acc.id} accessoire={acc} loaded={false} headColor='#82CFD8' />
          ))}
        </ScrollView>
      </View>
      <View style={styles.container2}>
        <View style={styles.container2_1}>
          {/* espace pr btns enregistrer valier et réinitialiser */}
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'yellow', alignItems: 'stretch', flex: 1}}> */}

            {/*<View style={{flex: 3, margin: 2}}>
              <Pressable style={{backgroundColor: '#00334A', padding: 4}} onPress={() => recordBc()} disabled={isActionBeingExecuted}>
                <Text style={{ color: 'white', fontSize: 18, textAlign: "center", fontWeight: 'bold' }}>Enregistrer pg</Text>
              </Pressable>
            </View>*/}

            {/* <Text>{"\n"}</Text> */}
            {/* <Button onPress={() => valideBc()} title="Valider"></Button> */}
            <View style={{flex: 3, margin: 2}}>
              <Pressable style={{backgroundColor: buttonColor1, padding: 4}}  onPress={() => valideBc()} onPressIn={() => setButtonColor1('#6DA557')} onPressOut={() => setButtonColor1('#00334A')} disabled={isActionBeingExecuted}>
              <Text style={{ color: '#ffffff', fontSize: 15, textAlign: "center", fontWeight: 'bold' }}>Enregistrer</Text>
              </Pressable>
              {/* <Text>{"\n"}</Text> */}
            </View>
            <View style={{flex: 3, margin: 2}}>
              <Pressable style={{backgroundColor: buttonColor2, padding: 4}}  onPress={() => livreBc()} onPressIn={() => setButtonColor2('#6DA557')} onPressOut={() => setButtonColor2('#00334A')} disabled={isActionBeingExecuted}>
              <Text style={{ color: '#ffffff', fontSize: 15, textAlign: "center", fontWeight: 'bold' }}>Livrable</Text>
              </Pressable>
              {/* <Text>{"\n"}</Text> */}
            </View>
            {/* <Button title="Réinitialiser" onPress={() => {setModalReinitVisible(true);}} /> */}
            <View style={{flex: 3, margin :2}}>
              <Pressable style={{backgroundColor: buttonColor3, padding: 4}}  onPress={() => {setModalReinitVisible(true);}} onPressIn={() => setButtonColor3('#6DA557')} onPressOut={() => setButtonColor3('#00334A')} disabled={isActionBeingExecuted}>
                <Text style={{ color: '#ffffff', fontSize: 15, textAlign: "center", fontWeight: 'bold' }}>Réinitialiser</Text>
              </Pressable>
              { modalReinitVisible &&
                  <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalReinitVisible}
                  onRequestClose={handleReinitCancel}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                          <Text style={{...styles.titleModalView, textAlign: 'center'}}>{`REINITIALISER\n`}</Text>
                          <Text style={styles.textModalView}>{`ATTENTION, en réinitialisant le BC, vous perdrez toutes les données non validées. 
Réinitialiser un BC revient à le récupérer tel qu'il se trouve actuellement dans l'application BTSystem - BTLivraison.\n`}
                          </Text>
                          <View style={ styles.modalBtns}>
                            <Pressable style={styles.oneBtn} onPress={() => {handleReinitConfirm(bonChargement)}} disabled={isActionBeingExecuted}>
                              <Text style={styles.txtBtn}>Confirmer</Text>
                            </Pressable>
                            {/* <Button title="Cancel" onPress={handleReinitCancel}/> */}
                            <Pressable style={styles.oneBtn} onPress={handleReinitCancel}>
                              <Text style={styles.txtBtn}>Annuler</Text>
                            </Pressable>
                          </View>
                    </View>
                  </View>
                </Modal>
              }
            {/* </View> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 4.2
  },
  container2: {
    flex: 1, marginLeft: 8, marginRight: 8
  },
  container2_1: {
    flexDirection: 'row', justifyContent: 'stretch', alignItems: 'center', borderTopColor:'#9CD2D5', borderTopWidth: 0, backgroundColor: '#ffffff', maxHeight: 60
  },
  View3: {
    position : 'absolute', bottom : 55, backgroundColor: 'black'
  },
  toolbar: {
    backgroundColor: "#3498db",
    color: "#fff",
    textAlign: "center",
    padding: 25,
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    backgroundColor: "#bdc3c7",
    flex: 1,
    height: 500,
  },
  input: {
    backgroundColor: "#ecf0f1",
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
  defaultText:{
    fontSize: 20,
    fontWeight: "bold",
  },
  text1: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text3: {
    color: "gray",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stetch',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleModalView: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textModalView: {
    fontSize: 20,
  },
  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'stretch',
  },
  oneBtn: {
    flex: 0.5,
    margin :2,
    padding : 20
  },
  txtBtn: {
    fontSize: 15,
    padding: 5,
    backgroundColor: '#007FA9',
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Bc;