import Login from '../Login';
import { View } from 'react-native';
import Message from "../Message";
import FooterLogin from "../FooterLogin";


const LoginScreen = ({ navigation }) => {
    return (
        <View style={{flex:1, justifyContent: 'flex-end'}}>
            <Message />
            <Login/>
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 55, backgroundColor: '#00334A'}}>
                <FooterLogin/>
            </View>
        </View>
    );
};

export default LoginScreen;

