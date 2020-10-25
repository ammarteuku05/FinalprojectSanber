import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {getUser, getMyMov} from '../../redux/action';

const index = ({navigation}) => {
  const initial = {text: '', author: ''};
  const [quote, setQuote] = useState(initial);
  const dispatch = useDispatch();

  useEffect(() => {
    getQuote();
    setTimeout(() => {
      getUser().then((user) => {
        if (user) {
          console.log('sudah login => email: ' + user.email);
          dispatch({
            type: 'SET_LOGIN',
            inputValue: {uid: user.uid, email: user.email, name: user.displayName, photoUrl: user.photoUrl},
          });
          getMyMov(dispatch, user.uid);
          navigation.navigate('Home');
        } else {
          console.log('cek login => tak ada user! login dulu');
          navigation.navigate('Login');
        }
      });
    }, 5000);
  }, []);

  const getQuote = () => {
    axios
      .get(
        'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
      )
      .then(({data}) => {
        setQuote({
          text: data.quoteText,
          author: data.quoteAuthor,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={{height: 200, width: 200}} source={require('../../image/logobg.png')} />
      <View style={{marginTop: 100, width: '70%'}}>
        <Text style={{fontSize: 16, textAlign: 'center'}}>{quote.text}</Text>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>- {quote.author} -</Text>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
