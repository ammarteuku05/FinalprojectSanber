import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {logout} from '../../redux/action';
import {useSelector, useDispatch} from 'react-redux';

const profil = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((global) => global);
  const logoutHandle = () => {
    logout().then(() => {
      dispatch({type: 'LOGOUT'});
      navigation.navigate('Login');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>My Profile</Text>
      <Image style={{height: 100, width: 100, marginBottom: 15}} source={require('../../image/profile.png')} />
      <Text style={{fontSize: 16, marginBottom: 20}}>{user.name}</Text>
      <Text style={{fontSize: 16, marginBottom: 20}}>{user.email}</Text>
      <TouchableOpacity onPress={logoutHandle}>
        <View style={{backgroundColor: '#A1D6E2', paddingVertical: 7, paddingHorizontal: 20, borderRadius: 10}}>
          <Text style={{fontSize: 16, fontWeight: 'bold' }}>Sign Out</Text>
        </View>
      </TouchableOpacity>

      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
        <TouchableOpacity onPress={() => navigation.navigate('AboutMe')}>
          <Text style={{color: '#1995AD', textAlign: 'center'}}>MyList v.1.0.0</Text>
          <Text style={{color: '#1995AD', textAlign: 'center'}}>about developer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profil;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
