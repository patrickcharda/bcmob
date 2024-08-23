import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import * as React from "react";
import { useDispatch } from "react-redux";
import { recordSelectedBc } from "../redux/actions";

const BcHeader = ({ currentBc }) => {

  let bc = currentBc;
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [text, setText] = React.useState(bc.bc_observ);

  const handleConfirm = (bc) => {
    // Handle the confirm action here
    //console.log('OBSERVATIONS BC ', text);
    const updatedBc = { ...bc, bc_observ: text };
    dispatch(recordSelectedBc(updatedBc));
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Handle the cancel action here
    //console.log('Cancelled');
    setModalVisible(false);
  };

  const hasNullValue = (field) => {
    if (field === null) {
      return true;
    }
    return false;
  }

  const strToDate= (strDate) => {
    /* let newDate = new Date(strDate);
    let newStrFormatedDate = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    return newStrFormatedDate; */
    var newDate = new Date(strDate);
    var dd = String(newDate.getDate()).padStart(2, '0');
    var mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = newDate.getFullYear();

    var hh = String(newDate.getHours()).padStart(2, '0');
    var min = String(newDate.getMinutes()).padStart(2, '0');
    var ss = String(newDate.getSeconds()).padStart(2, '0');

    newDate = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss;
    return newDate;
  }

  return (

        <ScrollView style={{position: 'absolute', right: 0, top: 0, left:0,  backgroundColor: 'white', zIndex:3}}>
            {/* <Text>{'\n'}</Text> */}
            <View style={{flexDirection: 'row', justifyContent:'flex-start', paddingRight: 10, backgroundColor: '#fff', minHeight: 40}}><Text style={{...styles.textHeader, maxWidth: '40%'}}>Observations : </Text><Text style={{...styles.textContent, maxWidth: '50%'}}>{hasNullValue(bc.bc_observ)?"" : bc.bc_observ}</Text>
            {/* <View style={{flexDirection: 'row', justifyContent:'space-between', paddingRight: 10, backgroundColor: '#fff', minHeight: 40}}><Text style={styles.textHeader}>Observations : </Text><Text style={{...styles.textContent, maxWidth: '50%'}}>{hasNullValue(bc.bc_observ)?"" : bc.bc_observ}</Text> */}
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={handleCancel}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                          style={{...styles.textModalView, borderColor: 'gray', borderWidth: 1, textAlignVertical: 'top', textAlign: 'left', marginBottom:10 }}
                          onChangeText={setText}
                          value={text}
                          placeholder='Saisissez le texte ici'
                          multiline
                          maxLength={600}
                        />
                        <View style={styles.modalBtns}>
                        {/* <Button title="Confirmer" onPress={() => {handleConfirm(bc)}} />
                        <Button title="Annuler" onPress={() => handleCancel()} /> */}
                          <Pressable style={styles.oneBtn} onPress={() => {handleConfirm(bc)}}>
                            <Text style={styles.txtBtn}>Confirmer</Text>
                          </Pressable>
                          <Pressable style={styles.oneBtn} onPress={() => handleCancel()}>
                            <Text style={styles.txtBtn}>Annuler</Text>
                          </Pressable>
                      </View>
                    </View>
                  </View>
              </Modal>
              {/* <Button
                  title="Show Modal - Edition"
                  onPress={() => {
                    setModalVisible(true);
                  }}
                /> */}
              <Pressable onPress={() => { setModalVisible(true); }} style={{position: 'absolute', right: 0, top: 0}}>
                {/* <FontAwesome name="pencil-square" size={28} color="gray" /> */}
                <Image source={require('../../assets/pencil-box.jpg')} style={{width: 40, height: 40}}/>
              </Pressable>
          </View>
          <ScrollView>
            <View style={{flexDirection: 'row', backgroundColor: '#82CFD8'}}><Text style={{...styles.textHeader, color: 'black'}}>Mis à jour le : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_date_web)?"" : strToDate(bc.bc_date_web)}</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.textHeader}>N° Aff : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_num_affaire)?"" : bc.bc_num_affaire}</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.textHeader}>Client : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_client)?"" : bc.bc_client}</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.textHeader}>Chantier : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_chantier)?"" : bc.bc_chantier}</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.textHeader}>Livraison : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_ville_livraison)?"" : bc.bc_ville_livraison}</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.textHeader}>Date Chargt prev : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_date_chargement_prev)?"" : strToDate(bc.bc_date_chargement_prev).substring(0, 10)}</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.textHeader}>Date Livr prev : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_date_livraison_prev)?"" : strToDate(bc.bc_date_livraison_prev).substring(0, 10)}</Text></View>
            {/* <Text style={{fontSize: 25, fontWeight: 'bold'}}>{hasNullValue(bc.bc_date_livraison_prev)?"Date Livr prev: " : "Date Livr prev: "+strToDate(bc.bc_date_livraison_prev).substring(0, 10)}</Text> */}
            <View style={{flexDirection: 'row'}}><Text style={styles.textHeader}>Transporteur : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_transporteur)?"" : bc.bc_transporteur}</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.textHeader}>Statut : </Text><Text style={styles.textContent}>{hasNullValue(bc.bc_statut)?"" : bc.bc_statut}</Text></View>
          </ScrollView>

            
        </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    color: "#bdc3c7",
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 3,
  },
  textContent: {
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
    alignItems: 'stetch',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleModalView: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textModalView: {
    fontSize: 20,
  },
  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'stretch',
  },
  oneBtn: {
    flex: 0.5,
    margin :2,
    padding : 20
  },
  txtBtn: {
    fontSize: 20,
    padding: 5,
    backgroundColor: '#007FA9',
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BcHeader;
