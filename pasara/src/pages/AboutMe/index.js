import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const index = () => {
  return (
    <View style={styles.container}>
      <Image style={{height: 150, width: 150, borderRadius: 75}} source={require('../../image/profile.png')}/>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Teuku Muhammad Ammar</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 2}}>
        <Image style={{height: 25, width: 25, marginRight: 5}} source={require('../../image/icon.png')} />
        <Text>@ammarteuku05</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 2}}>
        <Image style={{height: 20, width: 20, marginRight: 5}} source={require('../../image/envelope.png')} />
        <Text>ammarponteuku59@gmail.com</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 2, marginTop: 100}}>
        <Text>Mail me for advice or else :)</Text>
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
