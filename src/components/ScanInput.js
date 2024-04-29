import {
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { searchPceId } from "../redux/actions";
import * as React from "react";

const ScanInput =  () => {
  const [value, setValue] = React.useState(' ');
  const inputRef = React.useRef();

  const focusOnInput = () => {
    inputRef.current.focus();
  };

  const dispatch = useDispatch();
  const handleInputChange = (pce_num) => {
    setValue(pce_num);
    if (pce_num.length === 6) {
      //search pce
      dispatch(searchPceId(pce_num));
      setValue("");
    } else if (pce_num.length > 6) {
      //search #
      let regex = /#/g;
      let positionDiese = pce_num.search(regex);
      if (positionDiese != -1) {
          pce_num = pce_num.slice(
          positionDiese + 1,
          positionDiese + 7
        );
        if (numPiece.length === 6) {
          //search pce
          dispatch(searchPceId(pce_num));
          setValue("");
        }
      }
    }  
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start'}}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleInputChange}
        style={styles.scanArea}
      />
      <View style={{flexDirection: 'row', justifyContent: "flex-end", alignItems: 'flex-start'}}>
        <Pressable onPress={() => {focusOnInput(); setValue("")}} style={{padding: 2 }}>
          {/* <MaterialIcons name="qr-code-scanner" size={32} color="#007ACC" /> */}
          <Image source={require('../../assets/lightning-bolt-outline.jpg')} style={{width: 40, height: 40}}/>
        </Pressable>
      </View>
    </View>
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
    fontSize: 20,
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

export default ScanInput;
