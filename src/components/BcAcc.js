import {
  ScrollView,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  View,
  Pressable,
  Image
} from "react-native";
import { useDispatch } from "react-redux";
import { changeAccQte, changeAccObservBc, changeLoadAcc } from "../redux/actions";
import * as React from "react";
import { AntDesign } from '@expo/vector-icons';



const BcAcc = ( {accessoire, loaded, headColor} ) => {

  let acc = accessoire;
  //let accJson = JSON.stringify(acc);
  const dispatch = useDispatch();
  let observ = acc.pdt_observ_bc;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [text, setText] = React.useState(observ);
  const [qte, setQte] = React.useState(acc.pdt_qte);
  const [isOpened, setIsOpened] = React.useState(false);

  const textInputRef = React.useRef(null);

  let txtHeader;
  if (headColor != '#007FA9') {
    txtHeader = 'black';
  } else {
    txtHeader = 'white';
  }

  React.useEffect(() => {
    if (modalVisible) {
      textInputRef.current.focus();
    }
  }, [modalVisible]);

  const handleConfirm = (id) => {
    // Handle the confirm action here
    //console.log('Confirmed:', text);
    let obj = {'id': id, 'observ': text}
    dispatch(changeAccObservBc(obj));
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Handle the cancel action here
    //console.log('Cancelled');
    setModalVisible(false);
  };

  const increment = (id, charge) => {
    let newQte = qte + 1;
    setQte(newQte);
    let obj = {'id':id,'charge':charge,'qte':newQte};
    dispatch(changeAccQte(obj));
  }

  const decrement = (id, charge) => {
    if (qte >= 1) {
    let newQte = qte - 1;
    setQte(newQte);
    let obj = {'id':id,'charge':charge,'qte':newQte};
    dispatch(changeAccQte(obj));
    }
  }

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
    //console.log(strDate);
    var newDate = new Date(strDate);
    var dd = String(newDate.getDate()).padStart(2, '0');
    var mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = newDate.getFullYear();

    var hh = String(newDate.getHours()).padStart(2, '0');
    var min = String(newDate.getMinutes()).padStart(2, '0');
    var ss = String(newDate.getSeconds()).padStart(2, '0');

    newDate = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss;
    //console.error(newDate);
    return newDate;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>      
          <ScrollView>
            <Pressable onPress={() => setIsOpened(!isOpened)} >
              <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start', paddingRight: 5, backgroundColor: headColor}}>
                <Text style={{ paddingLeft: 3, color: txtHeader}}>{ isOpened ? acc.pdt_code : acc.pdt_code }</Text>
                <Text style={{fontWeight: 'bold', fontSize: 15, flexGrow: 0.5, maxWidth: '50%', color: txtHeader}}>{acc.pdt_libel}</Text>
                {/* <Button title={loaded ? "Unload" : "Load"} onPress={() => dispatch(changeLoadAcc(acc.id))}>
                </Button> */}
                <Pressable onPress={() => dispatch(changeLoadAcc(acc.id))} style={{ marginRight: -4}}>
                 {loaded?<Image source={require('../../assets/download-box-outline.jpg')} style={{width: 40, height: 40}}/>: <Image source={require('../../assets/upload-box-outline.jpg')} style={{width: 40, height: 40}}/>}
                  {/* <Text>{loaded?<MaterialCommunityIcons name="truck-remove" size={28} color="red" />: <MaterialCommunityIcons name="truck-plus" size={28} color="green" />}</Text> */}
                </Pressable>
              </View>
            </Pressable>
            <ScrollView contentContainerStyle={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start', backgroundColor: '#fff', paddingTop: 0}}>
              <Text style={{fontWeight: 'bold'}}>Observations : </Text>
              <Text style={{flexGrow: 0.5, maxWidth: '50%'}}>{hasNullValue(acc.pdt_observ_bc)?"": acc.pdt_observ_bc} </Text>
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
                          style={{ height: 120, borderColor: 'gray', borderWidth: 1, textAlignVertical: 'top', textAlign: 'left' }}
                          onChangeText={setText}
                          value={text}
                          placeholder='Saisissez le texte ici'
                          multiline
                          maxLength={600}
                          ref={textInputRef}
                        />
                        <View style={styles.modalBtns}>
                        {/* <Button title="Confirm" onPress={() => handleConfirm(acc.id)} />
                        <Button title="Cancel" onPress={handleCancel} /> */}
                          <Pressable style={styles.oneBtn} onPress={() => handleConfirm(acc.id)}>
                            <Text style={styles.txtBtn}>Confirmer</Text>
                          </Pressable>
                          <Pressable style={styles.oneBtn} onPress={handleCancel}>
                            <Text style={styles.txtBtn}>Annuler</Text>
                          </Pressable>
                        </View>
                    </View>
                  </View>
                </Modal>
                <Pressable  style={{paddingRight: 0, paddingTop: 0, borderColor: 'black', borderWidth: 1}}onPress={() => { setModalVisible(true); }}>
                  {/* <FontAwesome name="pencil-square" size={28} color="#007AFF" /> */}
                  <Image source={require('../../assets/pencil-box.jpg')} style={{width: 40, height: 40}}/>
                </Pressable>
              </View>
            </ScrollView>
            <ScrollView contentContainerStyle={{flexDirection: 'row', justifyContent:'center', alignItems: 'flex-start', backgroundColor: '#fff', paddingTop: 10, paddingBottom: 5}}>
              <Text style={{fontWeight: 'bold'}}>Quantité : </Text>
              <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start', backgroundColor: '#fff'}}>
              {/* <Button title="+" onPress={() => increment(acc.id, acc.pdt_charge)} /> */}
              <Pressable onPress={() => increment(acc.id, acc.pdt_charge)}><AntDesign name="plussquareo" size={24} color="#007AFF" /></Pressable>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>  {qte}  </Text>
              <Pressable onPress={() => decrement(acc.id, acc.pdt_charge)}><AntDesign name="minussquareo" size={24} color="#007AFF" /></Pressable>
              {/* <Button title="-" onPress={() => decrement(acc.id, acc.pdt_charge)} /> */}
              </View>
            </ScrollView>
            
            { isOpened &&
              <ScrollView>
              <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start', backgroundColor: headColor}}>
                <Text style={{fontStyle: 'normal', fontWeight: 'bold', color: txtHeader}}>Date Heure mise à jour : </Text>
                <Text style={{color: txtHeader}}>{hasNullValue(acc.pdt_date_web)?"":strToDate(acc.pdt_date_web)}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>N° de série : </Text>
                <Text>{hasNullValue(acc.pdt_num_serie)?"":acc.pdt_num_serie}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'flex-start'}}>
                <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>Consigne : </Text>
                <Text>{hasNullValue(acc.pdt_consigne)?"":acc.pdt_consigne?"OUI":"NON"}</Text>
              </View>
              {/* <Text>{accJson}</Text> */}
              </ScrollView> }
              
          </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopColor: 'white',
    borderTopWidth: 1,
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
});

export default BcAcc;
