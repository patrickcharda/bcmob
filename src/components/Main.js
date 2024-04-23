import * as React from "react";
import {
  View,
  Pressable,
  Text,
  Image
} from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import BcListScreen from "./screens/BcListScreen";
import BcScreen from "./screens/BcScreen";
import ShootSessionScreen from "./screens/ShootSessionScreen";
//import Message from "./Message";
import { toggleScanView } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

/* const endpointBc = "https://demo-btw.monkey-soft.fr/bcweb/bcx/";
const endpointRefreshToken = "https://demo-btw.monkey-soft.fr/refresh-token/"; */

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
                {/* <View style={{ flexGrow:0.5, justifyContent: 'flex-start'}}>
                  <Image
                  style={{ width: 50, height: 50, }}
                  source={require('../../assets/LPB.png')}
                  />
                </View> */}
                <View style={{ flexGrow:1, justifyContent: 'center' }}><Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}> </Text></View>
                {/* <View style={{ flex:1, justifyContent: 'flex-end' }}>
                  <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../assets/LPB.png')}
                  />
                </View> */}
              </View>
          ),
        }}
        key="1"
      />,
      <Stack.Screen 
      name="Bc" 
      component={BcScreen} 
      options={({}) => ({
        
/*       headerLeft: () => (
      <Pressable onPress={() => navigation.replace('BcList')}>
        <Text style={{color: 'white'}}>retour </Text>
      </Pressable>
      ), */
      /* headerLeft: () => (
        <Image 
          source={require('../../assets/chevron-left-white-removebg.png')} 
          style={{ marginLeft: 0, width: 20, height: 20}} 
        />
      ), */
      headerTitle: () => (
        <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '80%', marginTop: 0}}>
          {/* <View>
            <Pressable onPress={() => navigation.replace('BcList')}>
              <Text style={{color: 'white'}}>retour </Text>
            </Pressable>
          </View> */}
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