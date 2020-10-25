import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Movie from '../../components/movie';
import {db} from '../../../firebase';
import ModalDetail from '../../components/modalDetail';
import ModalPoster from '../../components/modalPoster';

const search = () => {
  const {user, myMov} = useSelector((global) => global);
  const [input, setInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPoster, setModalPoster] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [modalPosterUri, setModalPosterUri] = useState('');
  const [notifText, setNotifText] = useState('');
  const [active, setActive] = useState(true);
  const [modalLoad, setModalLoad] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const inputChange = (val) => {
    setInput(val);
  };

  const cari = () => {
    if (input !== '') {
      setIsSearch(true);
      setMovies([]);
      setActive(false);
      axios
        .get(`https://www.omdbapi.com/?s=${input}&apikey=bdf6b27b`)
        .then(({data}) => {
          if (data.Response === 'False') {
            console.log(data.Error);
            setIsSearch(false);
            setMovies([]);
            setNotifText(data.Error);
            setTimeout(() => {
              setActive(true);
              setNotifText('');
            }, 3000);
          } else {
            let result = [];
            data.Search.forEach((data1) => {
              let inc = true;
              myMov.forEach((data2) => {
                if (data1.imdbID === data2.imdbID) {
                  inc = false;
                }
              });
              if (inc) {
                result.push(data1);
              }
            });
            setIsSearch(false);
            setMovies(result);
            setTimeout(() => {
              setActive(true);
            }, 3000);
          }
        })
        .catch((err) => {
          setIsSearch(false);
          setMovies([]);
          setActive(true);
        });
    }
  };

  const goDetail = (id) => {
    setDataModal({});
    setModalLoad(true);
    setModalVisible(true);
    axios
      .get(`https://www.omdbapi.com/?apikey=bdf6b27b&plot=full&i=${id}`)
      .then(({data}) => {
        setDataModal(data);
        setModalLoad(false);
      })
      .catch((err) => {
        console.log('error => ' + err);
      });
  };

  const addList = (data) => {
    console.log('masukin ke list');
    var newPostKey = db.ref(`users/${user.uid}/movies`).push().key;
    db.ref(`users/${user.uid}/movies/${newPostKey}`).update({
      imdbID: data.imdbID,
      Title: data.Title,
      Year: data.Year,
      Type: data.Type,
      Poster: data.Poster,
      key: newPostKey,
    });
    let datas = [];
    movies.forEach((obj) => {
      if (obj.imdbID !== data.imdbID) {
        datas.push(obj);
      }
    });
    setMovies(datas);
  };

  const goPoster = (uri) => {
    setModalPosterUri(uri);
    setModalPoster(true);
  };

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>
        Search movie here & put your list
      </Text>
      <View>
        <View style={styles.a}>
          <TextInput
            placeholder="search movie here..."
            onChangeText={(val) => inputChange(val)}
            value={input}
          />
          {/*  */}

          
          {!active || input === '' ? (
            <TouchableOpacity style={styles.untouch}>
              <View style={{width: 60, borderRadius: 5, alignItems: 'center'}}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../../image/loupe.png')}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={cari} style={styles.touch}>
              <View style={{width: 60, borderRadius: 5, alignItems: 'center'}}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../../image/loupe.png')}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        {/*  */}
        {notifText !== '' && (
          <View>
            <Text style={styles.b}>{notifText}!</Text>
          </View>
        )}
        {isSearch ? (
          <Text style={{textAlign: 'center', color: '#9f9b9a'}}>
            Searching movies, please wait...
          </Text>
        ) : (
          <FlatList
            style={{marginBottom: 80}}
            data={movies}
            renderItem={({item}) => (
              <Movie
                data={item}
                onpres={() => goDetail(item.imdbID)}
                poster={() => goPoster(item.Poster)}
                addList={() => addList(item)}
              />
            )}
            keyExtractor={(item) => item.imdbID}
          />
        )}
      </View>
      <ModalDetail
        dataModal={dataModal}
        modalVisible={modalVisible}
        loading={modalLoad}
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

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F1F1F2',
  },
  touch: {
    width: 60,
    backgroundColor: '#A1D6E2',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  untouch: {
    width: 60,
    backgroundColor: '#e2e2e5',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  a: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    paddingLeft: 5,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  b: {
    marginTop: 20,
    color: '#1995ad',
    textAlign: 'center',
    fontSize: 16,
  },
});
