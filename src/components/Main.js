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
import ConfigScreen from "./screens/ConfigScreen";
import { toggleScanView, setBackurl, setUrl } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();


const Main = () => {

  const dispatch = useDispatch();
  
  const logged = useSelector((state) => state.tokenReducer.isLogged);
  const scanView = useSelector((state) => state.tokenReducer.scanView);
  const setbackurl = useSelector((state) => state.configReducer.backurl);
  const username = useSelector((state) => state.tokenReducer.username);

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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
                {<View style={{ flexGrow:1, justifyContent: 'center' }}><Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}> </Text></View>}
                <View style={{marginRight: 30}}>
                  {/* <MaterialCommunityIcons name="account" size={24} color="gray" /> */}<Text style={{color: 'gray'}}>{username}</Text>
              </View>
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
        <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%', marginTop: 0}}>
          <View style={{ flexBasis: '60%', alignItems: 'center' }}>
            <Pressable onPress={() => {dispatch(toggleScanView(scanView))}}>
              <MaterialIcons name="qr-code-scanner" size={40} color="#ffffff" />
            </Pressable>
          </View>
          <View style={{ flexBasis: '26%', alignItems: 'flex-end' }}>
                  {/* <MaterialCommunityIcons name="account" size={24} color="gray" /> */}<Text style={{color: 'gray'}}>{username}</Text>
          </View>
        </View>
      ),
      })
    }
      key="2"
    /> 
      ]
       : ( !setbackurl ? [
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({}) => ({
          headerTintColor: '#fff',
          headerTitle: () => (
            <View  style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between',  width: '85%', marginTop: 0}}>
              <View>
                <Pressable onPress={() => {dispatch(setBackurl());}}>
                  <Octicons name="gear" size={24} color="gray" />
                </Pressable>
              </View>
            </View>
          ),
          })
        }
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
    ] : [
      <Stack.Screen
        name="Config"
        component={ConfigScreen}
        options={({}) => ({
          title: "Configuration",
          headerTintColor: '#fff',
          headerTitle: () => (
            <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 0}}>
              <View>
                <Pressable onPress={() => {dispatch(setBackurl());}}>
                  <Octicons name="gear" size={24} color="gray" />
                </Pressable>
              </View>
            </View>
          ),
          })
        }
        key="5"
      />
    ]
    )}
    </Stack.Navigator>
  );
  };

export default Main;