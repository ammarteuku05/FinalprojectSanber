import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

const modalDetail = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}>
        <View style={styles.centeredView}>
          {!props.loading && (
            <View style={styles.modalView}>
              <TouchableHighlight
                style={{
                  marginVertical: 7,
                  alignSelf: 'flex-end',
                  paddingRight: 10,
                  backgroundColor: '#1995AD',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                onPress={props.set}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>  Close</Text>
              </TouchableHighlight>

              <ScrollView style={{paddingHorizontal: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                      {props.dataModal.Title} ({' '}
                      <Text>{props.dataModal.Year}</Text> )
                    </Text>
                    <Text style={{opacity: 0.7}}>
                      {props.dataModal.Runtime} |{' '}
                      <Text>{props.dataModal.Genre}</Text>
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../image/star.png')}
                        style={{
                          height: 40,
                          width: 40,
                        }}
                      />
                      <View style={{marginLeft: 2}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                          {props.dataModal.imdbRating}
                          <Text style={{fontWeight: '500', fontSize: 14}}>
                            /10
                          </Text>
                        </Text>
                        <Text>{props.dataModal.imdbVotes}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.line} />

                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{flex: 1, marginRight: 10}}>
                    <Image
                      source={{uri: props.dataModal.Poster}}
                      style={{height: 100, width: '100%'}}
                    />
                  </View>
                  <View style={{flex: 4}}>
                    <Text style={{textAlign: 'justify'}}>
                      {props.dataModal.Plot}
                    </Text>
                  </View>
                </View>
                {/* Director */}
                <View style={styles.line} />
                <View style={{alignSelf: 'baseline'}}>
                  <Text style={styles.title}>
                    Director :{' '}
                    <Text style={styles.text}>{props.dataModal.Director}</Text>
                  </Text>
                  <Text style={styles.title}>
                    Writer :{' '}
                    <Text style={styles.text}>{props.dataModal.Writer}</Text>
                  </Text>
                  <Text style={styles.title}>
                    Actors :{' '}
                    <Text style={styles.text}>{props.dataModal.Actors}</Text>
                  </Text>
                </View>
                <View style={styles.line} />
                {/* Country */}
                <View style={{alignSelf: 'baseline'}}>
                  <Text style={styles.title}>
                    Country :{' '}
                    <Text style={styles.text}>{props.dataModal.Country}</Text>
                  </Text>
                  <Text style={styles.title}>
                    Language :{' '}
                    <Text style={styles.text}>{props.dataModal.Language}</Text>
                  </Text>
                  <Text style={styles.title}>
                    Awards :{' '}
                    <Text style={styles.text}>{props.dataModal.Awards}</Text>
                  </Text>
                </View>
                <View style={styles.line} />
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default modalDetail;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    height: '90%',
  },
  imageModal: {
    width: '90%',
    height: '90%',
  },
  line: {
    borderWidth: 0.2,
    width: '100%',
    marginTop: 10,
    borderColor: 'grey',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  text: {
    fontWeight: '800',
  },
});
