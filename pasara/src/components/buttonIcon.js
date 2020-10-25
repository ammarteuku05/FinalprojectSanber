import React from 'react';
import {View} from 'react-native';

const buttonIcon = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 60,
        backgroundColor: '#A1D6E2',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <View style={{width: 60, borderRadius: 5, alignItems: 'center'}}>
        <Image
          style={{height: 30, width: 30}}
          source={require('../../image/loupe.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

export default buttonIcon;
