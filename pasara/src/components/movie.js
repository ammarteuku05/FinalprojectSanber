import React from 'react';
import {useSelector} from 'react-redux';
import {removeList} from '../redux/action';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const movies = ({data, onpres, poster, addList}) => {
  const {user, myMov} = useSelector((global) => global);
  const removeHandler = () => {
    removeList(user.uid, data.key)
      .then((result) => {
        console.log('hapus ' + result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cek = () => {
    for (let i = 0; i < myMov.length; i++) {
      if (myMov[i].imdbID === data.imdbID) {
        return (
          <TouchableOpacity
            onPress={removeHandler}
            style={{
              flexDirection: 'row',
              backgroundColor: '#1995AD',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: 100,
            }}>
            <Image style={{height: 15, width: 15, marginRight: 5}} source={require('../image/dustbin.png')} />
            <Text style={{color: 'white', fontWeight: '600'}}>Delete</Text>
          </TouchableOpacity>
        );
      }
    }
    return (
      <TouchableOpacity
        onPress={addList}
        style={{
          flexDirection: 'row',
          backgroundColor: '#A1D6E2',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          width: 130,
        }}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>+ </Text>
        <Text style={{fontWeight: '900'}}> Add Watchlist </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginTop: 10, backgroundColor: '#e4e4e6', borderRadius: 5, paddingRight: 50}}>
      <View style={{ flexDirection: 'row', marginHorizontal: 5}}>
        <TouchableOpacity onPress={poster}>
          <View style={{height: 100, width: 100}}>
            <Image
              source={{uri: data.Poster}}
              style={{margin: 5, height: 100, width: 90, borderRadius: 5}}
            />
          </View>
        </TouchableOpacity>
        <View style={{width: '90%', padding: 10}}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={onpres}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>{data.Title}</Text>
              <Text>{data.Year}</Text>
              <Text>{data.Type}</Text>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>

          <View style={{paddingTop: 5}}>{cek()}</View>
        </View>
        <View />
      </View>
    </View>
  );
};

export default movies;

const styles = StyleSheet.create({
  line: {
    borderWidth: 0.2,
    width: '80%',
    marginTop: 5,
    borderColor: 'grey',
  },
});
