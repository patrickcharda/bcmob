import {
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  Alert,
  View,
  ActivityIndicator,
  Pressable,
  Image
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changePceLoadedStatus, changePceObservBc } from "../redux/actions";
import * as React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const BcPce = ( {piece, loaded, headColor} ) => {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [text, setText] = React.useState(piece.pce_observ_bc);
  const [isOpened, setIsOpened] = React.useState(false);

  const isActionBeingExecuted = useSelector((state) => state.tokenReducer.isActionBeingPerformed);

  const handleConfirm = () => {
    // Handle the confirm action here
    console.log('Confirmed:', text);
    let data = {
      "piece": piece,
      "texte": text,
    }
    dispatch(changePceObservBc(data));
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Handle the cancel action here
    console.log('Cancelled');
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
    var newDate = new Date(strDate);
    var dd = String(newDate.getDate()).padStart(2, '0');
    var mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = newDate.getFullYear();

    var hh = String(newDate.getHours()).padStart(2, '0');
    var min = String(newDate.getMinutes()).padStart(2, '0');
    var ss = String(newDate.getSeconds()).padStart(2, '0');

    newDate = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss;
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
              <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start', paddingRight: 5, backgroundColor: headColor}}>
                <Text> {piece.pce_num} </Text>
                <Text style={{fontWeight: 'bold', fontSize: 15, flexGrow: 0.5, maxWidth: '50%'}}>{piece.pce_nom_etude}</Text>
                <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems: 'flex-start', marginRight: -5}}>
                  <Text>Poids : {hasNullValue(piece.pce_poids)?"": formatPoids(piece)}  </Text>
                  <Pressable onPress={() => dispatch(changePceLoadedStatus(pce))}>
                    {/* <Text>{loaded?<MaterialCommunityIcons name="truck-remove" size={28} color="red" />: <MaterialCommunityIcons name="truck-plus" size={28} color="green" />}</Text> */}
                    {loaded?<Image source={require('../../assets/download-box-outline.jpg')} style={{width: 40, height: 40}}/>: <Image source={require('../../assets/upload-box-outline.jpg')} style={{width: 40, height: 40}}/>}
                  </Pressable> 
                </View>
              </View>
            </Pressable>
            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start', backgroundColor: '#fff', paddingTop: 0}}>
              <Text style={{fontWeight: 'bold'}}>Observations : </Text>
              <Text style={{flexGrow: 0.5, maxWidth: '50%'}}>{hasNullValue(piece.pce_observ_bc)?"": piece.pce_observ_bc} </Text>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={handleCancel}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <ScrollView>
                        <TextInput
                          style={{ height: 120, borderColor: 'gray', borderWidth: 1, textAlignVertical: 'top', textAlign: 'left' }}
                          onChangeText={setText}
                          value={text}
                          placeholder='Saisissez le texte ici'
                          multiline
                        />
                        <Button title="Confirm" onPress={handleConfirm} />
                        <Button title="Cancel" onPress={handleCancel} />
                      </ScrollView>
                    </View>
                  </View>
                </Modal>
                <Pressable  style={{paddingRight: 0, paddingTop: 0, borderColor: 'black', borderWidth: 0.5}}onPress={() => { setModalVisible(true); }}>
                  {/* <FontAwesome name="pencil-square" size={28} color="#007AFF" /> */}
                  <Image source={require('../../assets/pencil-box.jpg')} style={{width: 40, height: 40}}/>
                </Pressable>
              </View>
            </View>
            <View style={{borderTopColor:'gray', borderTopWidth:0.5}}>
              {isOpened && 
              <View>
                {/* <Text>{pieceJson}</Text> */}
                <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start', backgroundColor: headColor}}>
                  <Text style={{fontWeight: 'bold', fontStyle: 'normal', }}>Date Heure mise à jour : </Text>
                  <Text>{hasNullValue(piece.pce_date_web)?"": strToDate(piece.pce_date_web)}</Text>
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
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    maxHeight: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BcPce;
