import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Movie from '../../components/movie';
import ModalDetail from '../../components/modalDetail';
import axios from 'axios';
import ModalPoster from '../../components/modalPoster';

const listMov = () => {
  const {myMov} = useSelector((global) => global);
  const [dataModal, setDataModal] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPoster, setModalPoster] = useState(false);
  const [modalPosterUri, setModalPosterUri] = useState('');

  const detail = (id) => {
    axios
      .get(`https://www.omdbapi.com/?apikey=bdf6b27b&plot=full&i=${id}`)
      .then(({data}) => {
        setDataModal(data);
        setModalVisible(true);
      })
      .catch((err) => {
        console.log('error => ' + err);
        return err;
      });
  };

  const goPoster = (uri) => {
    setModalPosterUri(uri);
    setModalPoster(true);
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 105, alignItems: 'center'}}>
        <Text style={styles.a}>My Movies Watch List</Text>
        <View style={styles.line} />
        <View style={{borderColor: 'gray', height: '100%'}}>
          {myMov.length === 0 ? (
            <View style={styles.b}>
              <Text style={{color: 'gray'}}>You don't have list a movie</Text>
            </View>
          ) : (
            <FlatList
              data={myMov}
              renderItem={({item}) => (
                <Movie
                  data={item}
                  onpres={() => detail(item.imdbID)}
                  poster={() => goPoster(item.Poster)}
                />
              )}
              keyExtractor={(item) => item.imdbID}
            />
          )}
        </View>
      </View>
      <ModalDetail
        dataModal={dataModal}
        modalVisible={modalVisible}
        set={() => setModalVisible(false)}
      />
      <ModalPoster
        posterVis={modalPoster}
        modalPosterUri={modalPosterUri}
        setModalPoster={() => setModalPoster(false)}
      />
    </View>
  );
};

export default listMov;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
    paddingHorizontal: 10,
  },
  line: {
    borderWidth: 0.2,
    width: '100%',
    marginTop: 10,
    borderColor: '#d4d4d8',
  },
  a: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  b: {
    justifyContent: 'center',
    height: '100%',
    opacity: 0.4,
  },
});
