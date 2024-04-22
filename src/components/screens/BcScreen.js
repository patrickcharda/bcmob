//import { CommonActions } from '@react-navigation/native';
import Bc from '../Bc';
import LogoutButton from "../LogoutButton";
import ScanInput from "../ScanInput";
import { SafeAreaView, StyleSheet, BackHandler, Button, View, Pressable, Text } from "react-native";
import Message from "../Message";
import Footer from "../Footer";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchPceId } from "../../redux/actions";
import { MaterialIcons } from '@expo/vector-icons';

const BcScreen = ({ route, navigation }) => {
  const { tabPces } = route.params;
  const isActionBeingExecuted = useSelector((state) => state.tokenReducer.isActionBeingPerformed);

  const scanView = useSelector((state) => state.tokenReducer.scanView);

  return (
    <View style={{flex:1}}>
      <Message />
      <View style={styles.container}>
        {/* {isActionBeingExecuted? null : <LogoutButton/> } */}
        {scanView?<ScanInput />:null}
        <Bc tabPces={ tabPces } />  
        {/* {isActionBeingExecuted? null :<Button title="Quitter BCWeb" onPress={() => BackHandler.exitApp()} />} */}
      </View>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 55, backgroundColor: '#00334A'}}>
        {isActionBeingExecuted? null : <Footer/>}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text1: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text3: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BcScreen;