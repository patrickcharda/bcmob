import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";  
import { addToken, addRefreshToken, toggleIsLogged, addUser} from '../redux/actions';
import * as React from "react";
import axios from 'axios';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const appliname = "bcweb";
/* const fingerprint = Application.getAndroidId().toString()+Application.nativeBuildVersion+Device.deviceYearClass.toString(); */
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
  //console.log("UUID : "+fingerprint);
});


const Login = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  var logged = useSelector((state) => state.tokenReducer.isLogged);
  var refreshToken = useSelector((state) => state.tokenReducer.refreshToken);
  var accessToken = useSelector((state) => state.tokenReducer.token);
  const BASE_URL = useSelector((state) => state.configReducer.url);
    
  const endpointRefreshToken = BASE_URL+"/apps/apprefresh/";
  const endpointPreLogin = BASE_URL+"/apps/preapplogin/";
  const endpointLogin = BASE_URL+"/apps/applogin/";
  const endpointLogout = BASE_URL+"/apps/userapplogout/";
  const endpointCommandLine = BASE_URL+"/bcweb/hascommandline/";

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onUsernameChange = (username) => setUsername(username);
  const onPasswordChange = (password) => setPassword(password);
  const [hidePass, setHidePass] = React.useState(true);

  const hasCommandLine = async () => {
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
      //console.log("hascommandline : "+response.data.id);
    } catch (error) {
      Alert.alert("Error", `There was an error while refreshing : ${error}`);
    }
  };

  const renewToken = async () => {
    try {
      //console.log("the refresh token : "+refreshToken);
      //console.log("the access token : "+accessToken);
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
      dispatch(addToken(response.data.access));
      //console.log("the new access token : "+accessToken);
      dispatch(addUser(username));
      dispatch(toggleIsLogged(logged));
      //console.log("the new logged value : "+logged);
      await hasCommandLine();
    } catch (error) {
      Alert.alert("Error", `There was an error while refreshing : ${error}`);
    }
  };

  const appLogin = async () => {
    try {
      console.log("the fingerprint is : "+fingerprint);
      //console.log("the appliname is : "+appliname);
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
      //console.log("second access token "+accessToken);
      refreshToken = response.data.refresh;
      //console.log("second refresh token "+refreshToken);
      dispatch(addToken(accessToken));
      dispatch(addRefreshToken(refreshToken));
      await renewToken();
    }  catch (error) {
      Alert.alert("Error", `There was an error while logging: ${error}`);
    }
  };

  const appLogout = async () => {
    try {
      await axios.get(
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
      Alert.alert("Error", `Problème rencontré durant la phase de déconnexion : ${error}`);
    }
  };

  const onSave = async () => {
    try {
      console.log(fingerprint);
      console.log(endpointPreLogin);
      console.log(username);
      console.log(password);
      console.log(appliname);
      /* let response = await axios.post(
        endpointPreLogin,
        JSON.stringify({
          username: username,
          password: password
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "appliname": appliname
          },
        }
      ); */
      //let hasSession = response.data.opened_session;
      let response = await fetch(
        endpointPreLogin,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "appliname": "bcweb"
          },
          body: JSON.stringify({
            "username": username,
            "password": password,
          }),
          redirect: "follow"
        }
      );
      /* const myHeaders = new Headers();
      myHeaders.append("appliname", "bcweb");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "username": "lpb654",
        "password": "test9876"
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://127.0.0.1:8000/apps/preapplogin/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error)); */


      let responseData = await response.json();
      let hasSession = responseData.opened_session;
      console.log("has session ? => "+hasSession);
      if (hasSession === "no") {
        // appeler fonction asynchrone de login
        console.log('no session');
        await appLogin();
      } else {
        console.log("session déjà ouverte");
        navigation.push('ShootSession', { username, password, appLogin, renewToken, hasCommandLine, appLogout, endpointRefreshToken, endpointLogin, endpointLogout, endpointCommandLine, appliname, fingerprint })
      }
    } catch (error) {
      Alert.alert("Error", ` -- Problème rencontré durant la phase d'authentification : ${error.message}`);
      console.log(error.error);
      console.log(error.message);
    }
  };

  return (

      <View style={styles.container}>
        <Text></Text>
        <ScrollView style={styles.content}>
        <TextInput
            style={styles.input}
            onChangeText={onUsernameChange}
            value={username}
            placeholder="Username"
            placeholderTextColor="#333333"
        />
        <View style={{...styles.input, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
          <TextInput
            style={{fontSize: 20, color: '#000000'}}
            secureTextEntry={hidePass}
            value={password}
            onChangeText={onPasswordChange}
            placeholder="Password"
            placeholderTextColor="#333333"
          />
          <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
            <Ionicons name={hidePass ? 'eye-off' : 'eye'} size={20} color="#4F4F4F" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onSave} style={{...styles.pressable, justifyContent: 'center', alignItems: 'center',  marginTop: 8}}>
            <Text style={{color: "#fff", fontSize: 20, fontWeight: 'bold',}}>GO</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
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
    backgroundColor: "#CEDDDE",
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 10,
    flex: 1,
    color: '#000000',
    fontSize: 20,
  },
  pressable: {
    backgroundColor: "#007FA9",
    color: "#fff",
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
  placeholder: {
    placeholderTextColor: "red",
  }
});

export default Login;