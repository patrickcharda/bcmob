import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';


// Composant récupérant dans le state le dernier bon de chargement utilisé

const BcLast = () => {
  
  //const lastEditedBc = useSelector((state) => state.bcReducer.bc);
  const lastEditedBc = useSelector((state) => state.bcReducer.bc);
  const navigation = useNavigation();
  const isBcEmpty = Object.keys(lastEditedBc).length === 0;

  /* le composant Bc attend un tableau de tableaux de pièces qui lui est passé à travers le composant BcScreen;
     il faut donc préparer ce tableau à partir du state */
  const pcesLoaded = useSelector((state) => state.pcesAccsReducer.pcesLoaded);
  const pcesProp = useSelector((state) => state.pcesAccsReducer.pcesProp);
  const pcesOther = useSelector((state) => state.pcesAccsReducer.pcesOther);
  /* const tabPces = [];
  tabPces.push(pcesLoaded, pcesProp, pcesOther); */
  const tabPces = React.useMemo(() => [pcesLoaded, pcesProp, pcesOther], [pcesLoaded, pcesProp, pcesOther]);

  /* const openBc = (tabPces) => {
    navigation.navigate('Bc', { tabPces });
  }; */
  const openBc = () => {
    navigation.navigate('Bc', { tabPces });
  };


  return (
    <View style={{backgroundColor: '#9CD2D5', position : 'absolute', bottom: 55, left: 0, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', minWidth: '100%'}}>
      {!isBcEmpty && (
        <TouchableOpacity onPress={() => openBc(tabPces)} >
          <Text style={{color: 'black', fontSize: 20}}>{ 'Réouvrir le BC '}{lastEditedBc.bc_num}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
});

export default BcLast;