import {
  Text,
  StyleSheet,
  Alert,
  BackHandler,
  View,
  Pressable,
} from 'react-native';
import { useSelector } from "react-redux";  
import * as React from "react";
import axios from 'axios';

const Session = ({ username, password, appLogin, endpointLogout, appliname }) => {

  var logged = useSelector((state) => state.tokenReducer.isLogged);
  //console.log("first logged "+logged);
  var refreshToken = useSelector((state) => state.tokenReducer.refreshToken);
  //console.log("first refresh token "+refreshToken);
  var accessToken = useSelector((state) => state.tokenReducer.token);
  //console.log("first token "+accessToken);

  const userAppLogout = async () => {
    try {
      const response = await axios.get(
        endpointLogout,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "appliname": appliname,
            "username": username,
          },
        }
      );
    } catch (error) {
      Alert.alert("Error", `There was an error while user app logout: ${error}`);
    }
  }

  const continuer = async () => {
    try {
      await userAppLogout();
      await appLogin();
    } catch (error) {
      Alert.alert("Error", `Problème rencontré durant la phase d'authentification : ${error}`);
    }
  };


  return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleModalView}>{`!!! \n`}</Text>
          <Text style={styles.textModalView}>{`Une session est déjà ouverte pour cet utilisateur.\n
Vous pouvez au choix : \n
+ CONTINUER - une nouvelle session prendra alors la place de l'existante
+ QUITTER - pour sortir de l'application \n`}
        </Text>
      </View>
      <View style={styles.modalBtns}>
          <Pressable style={styles.oneBtn} onPress={() => {continuer();}} >
            <Text style={styles.txtBtn}>Continuer</Text>
          </Pressable>
          <Pressable style={styles.oneBtn} >
            <Text style={styles.txtBtn} onPress={() => BackHandler.exitApp()}>Quitter</Text>
          </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttons: {
    flexDirection: 'row', backgroundColor: "#007FA9", justifyContent: "space-between"
  },
  half: {
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: "#3498db",
    color: "#fff",
    textAlign: "center",
    padding: 5,
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
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
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

export default Session;