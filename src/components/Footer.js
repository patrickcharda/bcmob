import {
  View,
  Image,
} from "react-native";
import LogoutButton from "./LogoutButton";
import ExitButton from "./ExitButton";

const Footer = () => {
  return (

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 5 }}>
            <View style={{ flexGrow:2 }}>
              <LogoutButton/>
            </View>
            <View style={{ flexGrow:1  }}><Image style= {{ width: 100, height: 40}} source={require('../../assets/MKS.png')} /></View>
            <View style={{ flexGrow:1 }}>
              <ExitButton />
            </View>
          </View>

  );
};

export default Footer;
