import * as React from "react";
import Main from "./src/components/Main";
//import store from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import storeAndPersistor from './src/redux/store';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


/* const endpointBc = "https://demo-btw.monkey-soft.fr/bcweb/bcx/";
const endpointRefreshToken = "https://demo-btw.monkey-soft.fr/refresh-token/"; */

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 255, 255)',
  },
};


const App = () => {
  const { store, persistor } = storeAndPersistor;
  return (
    
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={MyTheme}>
            <StatusBar style="light" />
            <Main/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    
  );
};

export default App;
