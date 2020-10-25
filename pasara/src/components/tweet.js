import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const tweet = ({data}) => {
  return (
    <View style={styles.a}>
      <View style={styles.b}>
        <View style={{marginRight: 5}}>
          <Image source={require('../image/profile.png')} style={styles.c} />
        </View>
        <View>
          <Text style={{fontSize: 13}}>{data.name}</Text>
          <Text style={{fontSize: 8}}>{data.time}</Text>
        </View>
      </View>
      <View style={styles.d} />
      <View style={styles.e}>
        <Text>{data.tweet}</Text>
      </View>
    </View>
  );
};

export default tweet;

const styles = StyleSheet.create({
  a: {
    width: '100%',
    backgroundColor: '#eaeaec',
    borderRadius: 10,
    padding: 5,
    marginVertical: 2,
  },
  b: {
    flexDirection: 'row',
    padding: 1,
    marginHorizontal: 3,
    marginTop: 3,
  },
  c: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#A1D6E2',
    opacity: 0.3,
  },
  d: {
    borderWidth: 0.2,
    borderColor: '#e2e2e5',
    width: '100%',
  },
  e: {
    padding: 2,
    marginHorizontal: 5,
    marginTop: 5,
  },
});
