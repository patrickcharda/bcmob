import { Button, StyleSheet, Pressable, Image,} from 'react-native';
import { signout, purgePcesAccs, purgeBc, apiEmptyData } from "../redux/actions";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";  
import apiCall from "../redux/apiCall";
/* import TooltipMenu from 'react-native-tooltip-menu'; */



const LogoutButton = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.tokenReducer.username);
  let tab = [];
  tab.push(username);
  let url = "https://back-xxx.monkey-soft.fr:54443/apps/userapplogout/";
  let token = "";

  /* return <Button onPress={() => {dispatch(apiCall(url, token, tab));dispatch(signout()); dispatch(purgePcesAccs()); dispatch(purgeBc()); dispatch(apiEmptyData());}} title="déconnecter" color="#00334A"/> */

  /* return (
    <TooltipMenu
      buttonComponent={
        <Image source={require('../../assets/logout.jpg')} style={{width: 30, height: 30}} />
      }
      items={[
        {
          label: "logout",
          onPress:() => {dispatch(apiCall(url, token, tab));dispatch(signout()); dispatch(purgePcesAccs()); dispatch(purgeBc()); dispatch(apiEmptyData());}
        },
      ]}
    />
  ); */
  return (
    <Pressable onPress={() => {dispatch(apiCall(url, token, tab));dispatch(signout()); dispatch(purgePcesAccs()); dispatch(purgeBc()); dispatch(apiEmptyData());}} style={{ position: 'absolute', left: 30, bottom: -10}}>
      <Image source={require('../../assets/logout.png')} style={{width: 30, height: 30}} />
    </Pressable>
  )
};

export default LogoutButton;