import BcList from '../BcList';
//import { CommonActions } from '@react-navigation/native';
import LogoutButton from '../LogoutButton';
import BcLast from '../BcLast';
import { BackHandler, Button, View, ScrollView } from 'react-native';
import Message from "../Message";
import Footer from "../Footer";
import { useSelector, } from "react-redux";

const BcListScreen = () => {

    const isActionBeingExecuted = useSelector((state) => state.tokenReducer.isActionBeingPerformed);

    return (
        <ScrollView contentContainerStyle={{flex:1}}>
            <Message />
            <ScrollView>
                {/* {isActionBeingExecuted? null : <LogoutButton/> } */}
                <BcList key={Math.floor(Math.random() * ((Math.random()) * 10000))} />
            </ScrollView>
            {isActionBeingExecuted? null : <BcLast></BcLast>}
            {/* {isActionBeingExecuted? null :<Button title="Quitter BCWeb" onPress={() => BackHandler.exitApp()} />} */}
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 55, backgroundColor: '#00334A'}}>
            {isActionBeingExecuted? null : <Footer/>}
            </View>
        </ScrollView>
        
    );
};

export default BcListScreen;