import {
  Text,
  StyleSheet,
  Alert,
  Button,
  BackHandler,
  View,
  Pressable,
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";  
import { addToken, addRefreshToken, toggleIsLogged } from '../redux/actions';
import * as React from "react";
import axios from 'axios';



const Session = ({ username, password, appLogin, renewToken, hasCommandLine, appLogout, endpointRefreshToken, endpointLogin, endpointLogout, endpointCommandLine, appliname, fingerprint }) => {

   const dispatch = useDispatch();

  //const token = useSelector((state) => state.tokenReducer.token);
  //const refreshToken = useSelector((state) => state.tokenReducer.refreshToken);
  var logged = useSelector((state) => state.tokenReducer.isLogged);
  console.log("first logged "+logged);
  var refreshToken = useSelector((state) => state.tokenReducer.refreshToken);
  console.log("first refresh token "+refreshToken);
  var accessToken = useSelector((state) => state.tokenReducer.token);
  console.log("first token "+accessToken);
  /*var appliname = "bcweb";
  var fingerprint = Application.getAndroidId().toString()+Application.nativeBuildVersion+Device.deviceYearClass.toString(); */
  
  /* const endpointRefreshToken = "https://back-xxx.monkey-soft.fr:54443/apps/apprefresh/";
  //const endpointLogin = "https://demo-btw.monkey-soft.fr/login/";
  const endpointPreLogin = "https://back-xxx.monkey-soft.fr:54443/apps/preapplogin/";
  const endpointLogin = "https://back-xxx.monkey-soft.fr:54443/apps/applogin/";
  const endpointLogout = "https://back-xxx.monkey-soft.fr:54443/apps/userapplogout/";
  const endpointCommandLine = "https://back-xxx.monkey-soft.fr:54443/bcweb/hascommandline/"; */

  
  /* const hasCommandLine = async () => {
    try {
      const response = await axios.post(
        endpointCommandLine,
        JSON.stringify({
          username: username,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": accessToken,
            "appliname": appliname,
            "fingerprint": fingerprint,
          },
        }
      );
      console.log("hascommandline : "+response.data.id);
    } catch (error) {
      Alert.alert("Error", `There was an error while refreshing : ${error}`);
    }
  };

  const renewToken = async () => {
    try {
      console.log("the refresh token : "+refreshToken);
      console.log("the access token : "+accessToken);
      const response = await axios.post(
        endpointRefreshToken,
        JSON.stringify({
          refresh: refreshToken,
          access: accessToken,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "appliname": appliname,
            "fingerprint": fingerprint,
          },
        }
      );
      //let tok = response.data.access + "€";
      console.log("TEST");
      
      dispatch(addToken(response.data.access));
      console.log("the new access token : "+accessToken);
      dispatch(toggleIsLogged(logged));
      console.log("the new logged value : "+logged);
      await hasCommandLine();
      //Alert.alert("new AccessToken : ", response.data.access);
    } catch (error) {
      //Alert.alert("Error", `There was an error while refreshing : ${error}`);
    }
  };

  const appLogin = async () => {
    try {
      console.log("the fingerprint is : "+fingerprint);
      console.log("the appliname is : "+appliname);
      const response = await axios.post(
        endpointLogin,
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "appliname": appliname,
            "fingerprint": fingerprint,
          },
        }
      );
      accessToken = response.data.access;
      console.log("second access token "+accessToken);
      refreshToken = response.data.refresh;
      console.log("second refresh token "+refreshToken);
      dispatch(addToken(accessToken));
      dispatch(addRefreshToken(refreshToken));
      await renewToken();
    }  catch (error) {
      //Alert.alert("Error", `There was an error while logging: ${error}`);
    }
  };

  const appLogout = async () => {
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
      //Alert.alert("Error", `There was an error while logging: ${error}`);
    }
  }; */

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
Vous pouvez au choix : \n\n
+ CONTINUER - une nouvelle session prendra alors la place de l'existante \n
+ QUITTER - pour sortir de l'application \n\n`}
        </Text>
        </View>
        <View style={styles.modalBtns}>
          {/* <View style={styles.half}>
          <Button onPress={() => {continuer();}} title="Continuer" style={styles.button}/>
          </View>
          <View style={styles.half}>
          <Button onPress={() => BackHandler.exitApp()} title="Quitter" style={styles.button}/>
          </View> */}
          <Pressable style={styles.oneBtn} onPress={() => {continuer();}} >
            <Text style={styles.txtBtn}>Continuer</Text>
          </Pressable>
          <Pressable style={styles.oneBtn} onPress={() => {continuer();}} >
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
    fontSize: 20,
    padding: 5,
    backgroundColor: '#007FA9',
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Session;