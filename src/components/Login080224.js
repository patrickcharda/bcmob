import {
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Alert,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
import { useSelector, useDispatch } from "react-redux";  
import { addToken, addRefreshToken, toggleIsLogged } from '../redux/actions';
import * as React from "react";
import axios from 'axios';


const Login = () => {


  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.tokenReducer.token);
  const refreshToken = useSelector((state) => state.tokenReducer.refreshToken);
  const logged = useSelector((state) => state.tokenReducer.isLogged);

  const endpointRefreshToken = "https://demo-btw.monkey-soft.fr/refresh-token/";

  const renewToken = async (newRefreshToken) => {
    try {
      const response = await axios.post(
        endpointRefreshToken,
        JSON.stringify({
          refresh: newRefreshToken,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      //let tok = response.data.access + "€";
      dispatch(addToken(response.data.access));
      //Alert.alert("new AccessToken : ", response.data.access);
    } catch (error) {
      //Alert.alert("Error", `There was an error while refreshing : ${error}`);
    }
  };



  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const endpointLogin = "https://demo-btw.monkey-soft.fr/login/";

  const onSave = async () => {
    try {
      const response = await axios.post(
        endpointLogin,
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      let accessToken = response.data.access;
      let newRefreshToken = response.data.refresh;

      dispatch(addToken(accessToken));
      dispatch(toggleIsLogged(logged));
      dispatch(addRefreshToken(newRefreshToken));
     
      //console.log(store.getState());

      //Alert.alert("Success", "Login successfull");
      //console.log (store.getState());
      renewToken(newRefreshToken);

    } catch (error) {
      //Alert.alert("Error", `There was an error while logging: ${error}`);
    }
  };

  const onUsernameChange = (username) => setUsername(username);
  const onPasswordChange = (password) => setPassword(password);


    return (

        <SafeAreaView style={styles.container}>
          <Text style={styles.toolbar}>LOGIN</Text>
          <ScrollView style={styles.content}>
          <TextInput
              style={styles.input}
              onChangeText={onUsernameChange}
              value={username}
              placeholder="Username"
          />
          <TextInput
              style={styles.input}
              onChangeText={onPasswordChange}
              value={password}
              placeholder="Password"
          />
          <TouchableOpacity onPress={onSave} style={styles.button}>
              <Text>Envoyer</Text>
          </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
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
  });

export default Login;