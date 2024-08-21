import {
    TextInput,
    StyleSheet,
    View,
    Pressable,
    Image,
    Button,
    Alert,
    Text
  } from "react-native";
  import { useDispatch, useSelector } from "react-redux";
  import { setBackurl, setUrl, defineError, defineMessage } from "../redux/actions";
  import * as React from "react";
  //import * as SQLite from 'expo-sqlite'; 
  import { useNavigation } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const UrlInput =  () => {

    /* const [db, setDb] = React.useState(null);
    const [isDbReady, setIsDbReady] = React.useState(false); */
    const navigation = useNavigation();
    const current_url = useSelector((state) => state.configReducer.url);
    const [url, setupUrl] = React.useState('');


    React.useEffect(() => {
      setupUrl(current_url);
    }, [current_url]);

    /* React.useEffect(() => {
      let isMounted = true; // Flag to track the mounted status of the component
    
      const fetchDb = async () => {
        try {
          const database = await SQLite.openDatabaseAsync('BTWEB');
          if (isMounted) {
            setDb(database);
            setIsDbReady(true); // Indique que la base de données est prête
            defineMessage("connexion db sqlite ok");
            defineError("");
          }
        } catch (error) {
          console.error('Erreur lors de l\'ouverture de la base de données :', error);
          setIsDbReady(false);
          defineMessage("connexion db sqlite pas ok");
          defineError(error);
          // Gérer l'erreur ici
        }
      };
      fetchDb();
      // Cleanup function to set the isMounted flag to false when the component unmounts
      return () => {
        isMounted = false;
      };
    }); */


  const setData = async () => {
    if (url.length == 0) {
        Alert.alert('Veuillez saisir une URL valide SVP')
    } else {
      dispatch(setUrl(url))
      dispatch(setBackurl());
      dispatch(defineMessage("nouvelle url enregistrée"))
    };
    
  }

    const inputRef = React.useRef();
  
    const dispatch = useDispatch();

    const focusOnInput = () => {
      inputRef.current.focus();
    };
  
    const handleInputChange = (newUrl) => {
      setupUrl(newUrl);
    };
     
    const onPressHandler = () => {
        setData();
    };
      
    return (
        <>
            <Text style={{padding: 15, fontSize:15}}>URL actuelle : {current_url}</Text>
            <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft:15, marginBottom:5, marginRight:15}}>
                
                <TextInput
                ref={inputRef}
                value={url}
                onChangeText={(newUrl) => {
                  handleInputChange(newUrl)
                }}
                style={styles.scanArea}
                />
                <View style={{flexDirection: 'row', justifyContent: "flex-end", alignItems: 'flex-start'}}>
                <Pressable onPress={() => {focusOnInput(); setupUrl("")}} style={{padding: 2,backgroundColor: '#CEDDED' }}>
                    {/* <MaterialIcons name="qr-code-scanner" size={32} color="#007ACC" /> */}
                    <Image source={require('../../assets/lightning-bolt-outline.jpg')} style={{width: 35, height: 35, backgroundColor: 'red'}}/>
                </Pressable>
                </View>
            </View>
            <Pressable onPress={onPressHandler} style={styles.button} >
              <Text style={styles.buttonText}>Valider</Text>
            </Pressable>
            {/* <Button title="Valider" color="#007FA9" onPress={onPressHandler}/> */}
        </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#aaa",
      color: "#bdc3c7",
    },
    scanArea: {
      backgroundColor: "white",
      color: "black",
      padding: 5,
      fontSize: 13,
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
      backgroundColor: '#007FA9',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      margin:15,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
  
  export default UrlInput;
  