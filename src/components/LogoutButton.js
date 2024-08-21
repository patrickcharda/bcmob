import { Pressable, Image,} from 'react-native';
import { signout, purgePcesAccs, purgeBc, apiEmptyData, setBackurl } from "../redux/actions";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";  
import apiCall from "../redux/apiCall";
/* import TooltipMenu from 'react-native-tooltip-menu'; */
//import { BASE_URL } from '../env';



const LogoutButton = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.tokenReducer.username);
  const BASE_URL = useSelector((state) => state.configReducer.url);
  let tab = [];
  tab.push(username);
  let url = BASE_URL+"/apps/userapplogout/";
  let token = "";

  return (
    <Pressable onPress={() => {dispatch(apiCall(url, token, tab));dispatch(signout()); dispatch(purgePcesAccs()); dispatch(purgeBc()); dispatch(apiEmptyData());}} style={{ position: 'absolute', left: 30, bottom: -10}}>
      <Image source={require('../../assets/logout.png')} style={{width: 30, height: 30}} />
    </Pressable>
  )
};

export default LogoutButton;