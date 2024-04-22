import {
  Text,
  StyleSheet,
  SafeAreaView,
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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const Login = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  var logged = useSelector((state) => state.tokenReducer.isLogged);
  var refreshToken = useSelector((state) => state.tokenReducer.refreshToken);
  var accessToken = useSelector((state) => state.tokenReducer.token);
  var appliname = "bcweb";
  var fingerprint = Application.getAndroidId().toString()+Application.nativeBuildVersion+Device.deviceYearClass.toString();
  
  const endpointRefreshToken = "https://back-xxx.monkey-soft.fr:54443/apps/apprefresh/";
  const endpointPreLogin = "https://back-xxx.monkey-soft.fr:54443/apps/preapplogin/";
  const endpointLogin = "https://back-xxx.monkey-soft.fr:54443/apps/applogin/";
  const endpointLogout = "https://back-xxx.monkey-soft.fr:54443/apps/userapplogout/";
  const endpointCommandLine = "https://back-xxx.monkey-soft.fr:54443/bcweb/hascommandline/";

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
      dispatch(addToken(response.data.access));
      console.log("the new access token : "+accessToken);
      dispatch(addUser(username));
      dispatch(toggleIsLogged(logged));
      console.log("the new logged value : "+logged);
      await hasCommandLine();
    } catch (error) {
      Alert.alert("Error", `There was an error while refreshing : ${error}`);
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
      const response = await axios.post(
        endpointPreLogin,
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "appliname": appliname,
          },
        }
      );
      let hasSession = response.data.opened_session;
      console.log(hasSession);
      if (hasSession === "no") {
        /* appeler fonction asynchrone de login */
        await appLogin();
      } else {
        console.log("session déjà ouverte");
        navigation.push('ShootSession', { username, password, appLogin, renewToken, hasCommandLine, appLogout, endpointRefreshToken, endpointLogin, endpointLogout, endpointCommandLine, appliname, fingerprint })
      }
    } catch (error) {
      Alert.alert("Error", `Problème rencontré durant la phase d'authentification : ${error}`);
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
        {/* <TextInput
            style={styles.input}
            onChangeText={onPasswordChange}
            value={password}
            placeholder="Password"
        /> */}
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