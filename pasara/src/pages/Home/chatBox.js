import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Tweet from '../../components/tweet';
import {useSelector} from 'react-redux';
import {sendTwitt} from '../../redux/action';

const chatBox = () => {
  const {tweets, user} = useSelector((global) => global);
  const [textTweet, setTextTweet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputTextHandle = (val) => {
    setTextTweet(val);
  };

  const sendTweet = () => {
    if (textTweet !== '') {
      setIsLoading(true);
      sendTwitt(user, textTweet)
        .then((res) => {
          setTextTweet('');
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch((err) => {
          console.log('dari chat => ' + err);
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 5}}>
        <Text>ChatBox</Text>
      </View>
      {/* Input tweet */}
      <View style={styles.inputTweet}>
        <View style={{width: '90%', paddingHorizontal: 3}}>
          <TextInput
            style={{}}
            placeholder="type here ..."
            multiline={true}
            numberOfLines={2}
            value={textTweet}
            onChangeText={(val) => inputTextHandle(val)}
          />
        </View>
        {isLoading || textTweet === '' ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#e2e2e5',
              width: 50,
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View>
              <Image
                style={{height: 30, width: 30}}
                source={require('../../image/send.png')}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={sendTweet} style={styles.button}>
            <View>
              <Image
                style={{height: 30, width: 30}}
                source={require('../../image/send.png')}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {/* Body */}
      <View style={{flex: 1, paddingHorizontal: 5, paddingVertical: 5}}>
        <FlatList
          data={tweets}
          renderItem={({item}) => <Tweet data={item} />}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );
};

export default chatBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
    padding: 5,
  },
  inputTweet: {
    minHeight: 30,
    borderWidth: 1,
    borderColor: '#d4d4d8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 3,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#A1D6E2',
    width: 50,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
