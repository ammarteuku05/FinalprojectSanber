import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {Button} from '../../components/button';
import {useSelector, useDispatch} from 'react-redux';
import {login, getMyMov} from '../../redux/action';
import {TouchableOpacity} from 'react-native-gesture-handler';

const index = ({navigation}) => {
  const globalState = useSelector((global) => global);
  const dispatch = useDispatch();

  const input = {email: '', password: ''};
  const [state, setState] = useState(input);
  const [warningText, setWarningText] = useState('');

  const onInputChange = (value, type) => {
    setState({
      ...state,
      [type]: value,
    });
  };

  const handleLogin = () => {
    dispatch({type: 'SET_STATE', inputType: 'isLoading', inputValue: true});
    login(state.email, state.password)
      .then((data) => {
        console.log('sukses login ===> ' + data);
        dispatch({
          type: 'SET_LOGIN',
          inputValue: data,
        });
        dispatch({
          type: 'SET_STATE',
          inputType: 'isLoading',
          inputValue: false,
        });
        setState(input);
        getMyMov(dispatch, data.uid);
        dispatch({
          type: 'SET_STATE',
          inputType: 'isLoading',
          inputValue: false,
        });
        navigation.navigate('Home');
      })
      .catch((err) => {
        setWarningText(err);
        dispatch({
          type: 'SET_STATE',
          inputType: 'isLoading',
          inputValue: false,
        });
        setTimeout(() => {
          setWarningText('');
        }, 5000);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{marginTop: '20%'}}>
        <View style={{height: '80%', justifyContent: 'space-between'}}>
          <View>
            <View style={{alignSelf: 'baseline', marginBottom: 50}}>
              <Text style={{fontSize: 18}}>Process your</Text>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Login</Text>
            </View>
            {/* email */}
            <View style={{alignItems: 'center'}}>
              <View style={{borderBottomWidth: 0.2, width: '100%'}}>
                <Text>Email</Text>
                <View
                  style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TextInput
                    placeholder="input email"
                    value={state.email}
                    onChangeText={(value) => onInputChange(value, 'email')}
                  />
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      source={require('../../image/envelope.png')}
                      style={{height: 20, width: 20}}
                    />
                  </View>
                </View>
              </View>
              {/* password */}
              <View
                style={{borderBottomWidth: 0.2, width: '100%', marginTop: 20}}>
                <Text>Password</Text>
                <View
                  style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TextInput
                    placeholder="input password"
                    secureTextEntry={true}
                    value={state.password}
                    onChangeText={(value) => onInputChange(value, 'password')}
                  />
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      source={require('../../image/padlock.png')}
                      style={{height: 20, width: 20}}
                    />
                  </View>
                </View>
              </View>
              {/*  */}
              {warningText !== '' && (
                <View>
                  <Text style={{marginTop: 20, color: 'red'}}>{warningText}</Text>
                </View>
              )}

              <View
                style={{
                  width: '100%',
                  height: 40,
                  backgroundColor: '#BCBABE',
                  marginTop: 40,
                  marginBottom: 20,
                  borderRadius: 5,
                }}>
                <Button
                  name="Sign In"
                  onPress={handleLogin}
                  loading={globalState.isLoading}
                />
              </View>
              <TouchableOpacity
                style={{}}
                onPress={() => navigation.navigate('Register')}>
                <Text style={{color: '#1995AD'}}>Don't have account ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          {/*  */}
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate('AboutMe')}>
                <View>
                  <Text style={{color: '#1995AD', textAlign: 'center'}}>MyList v.1.0.0</Text>
                  <Text style={{color: '#1995AD', textAlign: 'center'}}>about developer</Text>
                </View>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
});
