import * as React from "react";
import {
  View,
  Pressable,
  Text,
} from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import BcListScreen from "./screens/BcListScreen";
import BcScreen from "./screens/BcScreen";
import ShootSessionScreen from "./screens/ShootSessionScreen";
import { toggleScanView } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const Main = () => {
  const logged = useSelector((state) => state.tokenReducer.isLogged);
  const scanView = useSelector((state) => state.tokenReducer.scanView);
  const dispatch = useDispatch();
  
  return (

    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#00334A',
      }, title: "",}}>
    {logged ? 
      [<Stack.Screen
        name="BcList"
        component={BcListScreen}
        options={{
          title: "Bons de chargement",
          headerTintColor:'#fff',
          headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                <View style={{ flexGrow:1, justifyContent: 'center' }}><Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}> </Text></View>
              </View>
          ),
        }}
        key="1"
      />,
      <Stack.Screen 
      name="Bc" 
      component={BcScreen} 
      options={({}) => ({
      headerTintColor: '#fff',
      headerTitle: () => (
        <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '85%', marginTop: 0}}>
          <View>
            <Pressable onPress={() => {dispatch(toggleScanView(scanView))}}>
              <MaterialIcons name="qr-code-scanner" size={40} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      ),
      })
    }
      key="2"
    /> 
      ]
       : [
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        key="3"
      />,<Stack.Screen
        name="ShootSession"
        component={ShootSessionScreen}
        options={{
          title: "Session",
          headerTitle: () => (
            <View style={{flex:1}}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 0 }}></View>
            </View>
          ),
        }}
        key="4"
      />
      ]}
    </Stack.Navigator>
  );
};

export default Main;