import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const Button = ({name, onPress, loading}) => {
  if (loading) {
    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
