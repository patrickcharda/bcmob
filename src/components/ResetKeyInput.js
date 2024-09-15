import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, TextInput, Text, Pressable, StyleSheet, Alert, Modal } from 'react-native';
import axios from 'axios';



const ResetKeyInput = () => {
  const [inputValue, setInputValue] = useState('');
  const BASE_URL = useSelector((state) => state.configReducer.url);
  const [modalVisible, setModalVisible] = React.useState(false);
  const username = useSelector((state) => state.tokenReducer.username);
  const dispatch = useDispatch();
  
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

  const sendReset = async () => {
    let reqBody = {
      "reset_key": inputValue,
    }
    try {
        const result = await axios.post(
        BASE_URL+"/apps/cmdreset/",
        JSON.stringify(reqBody),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      //console.log('RESULT ', result);
      Alert.alert(result.data.message);
    } catch (error) {
      //Alert.alert(result.data.message);
      if (error.response && error.response.data) {
        Alert.alert(error.response.data.message);
      } else {
        Alert.alert('An error occurred');
      }
    }
  };

  const handleConfirm = async () => {
    // Handle the confirm action here
    await sendReset();
    await reprise();
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Handle the cancel action here
    setModalVisible(false);
  };


        {/* <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Go</Text>
      </Pressable> */}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Code de réinitialisation"
        value={inputValue}
        onChangeText={setInputValue}
        maxLength={20}
      />
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCancel}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Effacer le contexte de suivi des BC entre les terminaux et le serveur Web (T_BC_OPEN).{"\n"}
                Cette commande n'affecte pas les données de BT Livraison.
              </Text>
              <View style={styles.modalBtns}>
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
        <Pressable  style={styles.button} onPress={() => { setModalVisible(true); }}>
          <Text style={styles.buttonText}>Go</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#007FA9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
  },
});

  
export default ResetKeyInput;
  