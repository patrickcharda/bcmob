import * as React from "react";
import Main from "./src/components/Main";
//import store from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import storeAndPersistor from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


/* const endpointBc = "https://demo-btw.monkey-soft.fr/bcweb/bcx/";
const endpointRefreshToken = "https://demo-btw.monkey-soft.fr/refresh-token/"; */



const App = () => {
  const { store, persistor } = storeAndPersistor;
  return (
    
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Main/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    
  );
};

export default App;
