import {
  Text,
  View,
  Image,
} from "react-native";

const FooterLogin = () => {
  return (

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5 }}>
            <View style={{width: '37%'}}><Text></Text></View>
            <View style={{width: '30%'}} ><Image style= {{ width: 100, height: 40}} source={require('../../assets/MKS.png')} /></View>
            <View style={{width: '30%'}}>
            <Text></Text>
            </View>
          </View>

  );
};

export default FooterLogin;
