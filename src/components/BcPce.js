import {
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  Image
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changePceLoadedStatus, changePceObservBc, AddPce } from "../redux/actions";
import * as React from "react";

const BcPce = ( {piece, loaded, headColor} ) => {
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [text, setText] = React.useState(piece.pce_observ_bc);
  const [isOpened, setIsOpened] = React.useState(false);
  const [borderColor1, setBorderColor1] = React.useState('#00334A');
  const [borderColor2, setBorderColor2] = React.useState('#00334A');

  const isActionBeingExecuted = useSelector((state) => state.tokenReducer.isActionBeingPerformed);

  const textInputRef = React.useRef(null);
  
  let txtHeader;
  if (headColor === '#007FA9') {
    txtHeader = 'white';
  } else {
    txtHeader = 'black';
  }

  React.useEffect(() => {
    if (modalVisible) {
      textInputRef.current.focus();
    }
  }, [modalVisible]);

  const handleConfirm = () => {
    // Handle the confirm action here
    //console.log('Confirmed:', text);
    let data = {
      "piece": piece,
      "texte": text,
    }
    dispatch(changePceObservBc(data));
    //dispatch(AddPce(piece));
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Handle the cancel action here
    //console.log('Cancelled');
    setModalVisible(false);
  };

  const pieceJson = JSON.stringify(piece)
  let pce = piece;
  const dispatch = useDispatch();

  const hasNullValue = (field) => {
    if (field === null) {
      return true;
    }
    return false;
  }

  const strToDate= (strDate) => {
    /* let newDate = new Date(strDate);
    let newStrFormatedDate = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    return newStrFormatedDate; */
    //console.error('date reçue ' +strDate);
    var newDate = new Date(strDate);
    //console.error('old_newdate '+newDate);
    /*var dd = String(newDate.getDate()).padStart(2, '0');
    var mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = newDate.getFullYear();

    var hh = String(newDate.getHours()).padStart(2, '0');
    var min = String(newDate.getMinutes()).padStart(2, '0');
    var ss = String(newDate.getSeconds()).padStart(2, '0');

    newDate = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss; */
    
    // Convertir en heure locale
    let options = { timeZone: 'Europe/Paris', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let localDate = newDate.toLocaleString('fr-FR', options);

    // Extraire les composants de la date locale
    let [datePart, timePart] = localDate.split(' ');
    let [dd, mm, yyyy] = datePart.split('/');
    let [hh, min, ss] = timePart.split(':');

    newDate = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;

    //console.error('newdate '+newDate);
    return newDate;
  }

  const formatPoids = (piece) => {
    let pcePoids = Number(piece.pce_poids);
    if (!isNaN(pcePoids)) {
        return pcePoids.toFixed(3);
    } else {
        return "Invalid data";
    }
  } 

  return (
    isActionBeingExecuted ? <ActivityIndicator color="red" size="large" /> : 
    <ScrollView style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <Pressable onPress={() => setIsOpened(!isOpened)} >
              <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start', paddingRight: 0, backgroundColor: headColor}}>
                <Text style={{color: txtHeader, fontSize: 13}}> {piece.pce_num} </Text>
                <Text style={{fontWeight: 'bold', fontSize: 13, flexGrow: 0.5, maxWidth: '50%', color: txtHeader}}>{piece.pce_nom_etude}</Text>
                <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems: 'flex-start', marginRight: 0}}>
                  <Text style={{color: txtHeader, fontSize: 13}}>{hasNullValue(piece.pce_poids)?"": formatPoids(piece) +' T'}  </Text>
                  <Pressable style={{paddingRight: 0, paddingTop: 0, width: 40, height: 40, marginRight: 0 }}  onPress={() => {dispatch(changePceLoadedStatus(pce));}} onPressIn={() => setBorderColor1('#6DA557')} onPressOut={() => setBorderColor1('#00334A')}>
                    {/* <Text>{loaded?<MaterialCommunityIcons name="truck-remove" size={28} color="red" />: <MaterialCommunityIcons name="truck-plus" size={28} color="green" />}</Text> */}
                    {loaded?<Image source={require('../../assets/download-box-outline.jpg')} style={{width: 40, height: 40, borderColor: borderColor1, borderWidth: 3}}/>: <Image source={require('../../assets/upload-box-outline.jpg')} style={{width: 40, height: 40
                      , borderColor: borderColor1, borderWidth: 3}}/>}
                  </Pressable> 
                </View>
              </View>
            </Pressable>
            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start', backgroundColor: '#fff', paddingTop: 0, paddingRight: 0, marginRight: 0}}>
              <Text style={{fontWeight: 'bold'}}>Observations : </Text>
              <Text style={{flexGrow: 0.65, maxWidth: '57%'}}>{hasNullValue(piece.pce_observ_bc)?"": piece.pce_observ_bc} </Text>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={handleCancel}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                          style={{...styles.textModalView, borderColor: 'gray', borderWidth: 1, textAlignVertical: 'top', textAlign: 'left', marginBottom:10 }}
                          onChangeText={setText}
                          value={text}
                          placeholder='Saisissez le texte ici'
                          multiline
                          maxLength={600}
                          ref={textInputRef}
                        />
                        <View style={styles.modalBtns}>
                          {/* <Button title="Confirmer" onPress={handleConfirm} style={{...styles.oneBtn}}/>
                          <Button title="Annuler" onPress={handleCancel} style={{...styles.oneBtn, ...styles.txtBtn}}/> */}
                          <Pressable style={styles.oneBtn} onPress={handleConfirm}>
                            <Text style={styles.txtBtn}>Confirmer</Text>
                          </Pressable>
                          <Pressable style={styles.oneBtn} onPress={handleCancel}>
                            <Text style={styles.txtBtn}>Annuler</Text>
                          </Pressable>
                        </View>
                    </View>
                  </View>
                </Modal>
                <Pressable onPress={() => { setModalVisible(true); }} onPressIn={() => setBorderColor2('#6DA557')} onPressOut={() => setBorderColor2('#00334A')}>
                  {/* <FontAwesome name="pencil-square" size={28} color="#007AFF" /> */}
                  <Image source={require('../../assets/pencil-box.jpg')} style={{width: 40, height: 40, borderColor: borderColor2, borderWidth: 3}}/>
                </Pressable>
              </View>
            </View>
            <View style={{borderTopColor:'gray', borderTopWidth:0.}}>
              {isOpened && 
              <View>
                {/* <Text>{pieceJson}</Text> */}
                <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start', backgroundColor: headColor}}>
                  <Text style={{fontWeight: 'bold', fontStyle: 'normal', color: txtHeader }}>Date Heure mise à jour : </Text>
                  <Text style={{color: txtHeader}}>{hasNullValue(piece.pce_date_web)?"": strToDate(piece.pce_date_web)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>Etat pièce : </Text>
                  <Text>{hasNullValue(piece.pce_etat)?"":piece.pce_etat}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>Type : </Text>
                  <Text>{hasNullValue(piece.pce_type_pdt)?"":piece.pce_type_pdt}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>Nom Etude : </Text>
                  <Text style={{maxWidth: '70%'}}>{hasNullValue(piece.pce_nom_etude)?"":piece.pce_nom_etude}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>Date Prod : </Text>
                  <Text>{hasNullValue(piece.pce_date_prod)?"": strToDate(piece.pce_date_prod).substring(0, 10)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>Qté Unité : </Text>
                  <Text>{hasNullValue(piece.pce_qte)?"-": (piece.pce_qte)} {hasNullValue(piece.pce_unit)?"-": (piece.pce_unit)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>Observ Pce : </Text>
                  <Text style={{maxWidth: '65%'}}>{hasNullValue(piece.pce_observ_pce)?"":piece.pce_observ_pce}</Text>
                </View>
              </View>}
              {/* <Text>{pieceJson}</Text> */}
            </View>
            
          </ScrollView>
        </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopColor: 'white',
    borderWidth: 1,
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
    fontSize: 20,
    padding: 5,
    backgroundColor: '#007FA9',
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pseudoBtn: {
      borderRadius: 5, 
      padding: 10,
      overflow: 'hidden',
      fontSize: 20,
      backgroundColor:'#00334A',
      color: '#ffffff',
      fontWeight: 'bold',
      }
});

export default BcPce;