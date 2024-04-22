import {
  ScrollView,
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
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

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    color: "#bdc3c7",
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
  buttonOld: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
}); */

export default Footer;
