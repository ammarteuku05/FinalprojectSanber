import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image, Modal} from 'react-native';

const modalPoster = ({posterVis, modalPosterUri, setModalPoster}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={posterVis}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableHighlight
              style={{marginRight: 20, alignSelf: 'flex-end'}}
              onPress={() => {
                setModalPoster(false);
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>X - Close</Text>
            </TouchableHighlight>
            <Image source={{uri: modalPosterUri}} style={styles.imageModal} />
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default modalPoster;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
    width: '90%',
    height: '90%',
  },
  imageModal: {
    width: '90%',
    height: '90%',
  },
});
