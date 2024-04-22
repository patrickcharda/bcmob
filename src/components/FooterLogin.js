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

export default FooterLogin;
