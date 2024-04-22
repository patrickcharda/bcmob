import Session from '../Session';
import { View } from 'react-native';
import Message from "../Message";
import Footer from "../Footer";

const ShootSessionScreen = ({ route }) => {

    const { username, password, appLogin, renewToken, hasCommandLine, appLogout, endpointRefreshToken, endpointLogin, endpointLogout, endpointCommandLine, appliname, fingerprint } = route.params;

    return (
        <View style={{flex:1}}>
            <Message />
            <Session
            username={username}
            password={password} 
            appLogin={appLogin}
            renewToken={renewToken} 
            hasCommandLine={hasCommandLine}
            appLogout={appLogout} 
            endpointRefreshToken={endpointRefreshToken} 
            endpointLogin={endpointLogin} 
            endpointLogout={endpointLogout} 
            endpointCommandLine={endpointCommandLine} 
            appliname={appliname} 
            fingerprint={fingerprint}/>
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 55, backgroundColor: '#00334A'}}>
                <Footer/>
            </View>
        </View>
    );
};

export default ShootSessionScreen;

