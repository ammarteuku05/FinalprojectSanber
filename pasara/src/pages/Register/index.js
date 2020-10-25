import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button} from '../../components/button';
import {useSelector, useDispatch} from 'react-redux';
import {regis} from '../../redux/action';
import {getMyMov} from '../../redux/action';

const register = ({navigation}) => {
  let form = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  const [state, setState] = useState(form);
  const globalState = useSelector((global) => global);
  const dispatch = useDispatch();
  const [warningText, setWarningText] = useState('');
  const [successText, setSuccessText] = useState('');

  const onInputChange = (value, input) => {
    setState({...state, [input]: value});
  };
  const daftarSubmit = () => {
    dispatch({type: 'SET_STATE', inputType: 'isLoading', inputValue: true});
    regis(state.email, state.password, state.password2, state.name)
      .then((user) => {
        console.log('register sukses ===> ' + user.email);
        dispatch({
          type: 'SET_LOGIN',
          inputValue: user,
        });
        getMyMov(dispatch, user.uid);
        setSuccessText(`Register Success ${user.name}, please wait..`);
        setTimeout(() => {
          setSuccessText('');
          navigation.navigate('Home');
        }, 5000);
        setState(form);
        dispatch({
          type: 'SET_STATE',
          inputType: 'isLoading',
          inputValue: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setWarningText(err);
        setTimeout(() => {
          setWarningText('');
        }, 5000);
        dispatch({
          type: 'SET_STATE',
          inputType: 'isLoading',
          inputValue: false,
        });
        setState({name: state.name, email: state.email, password1: '', password2: ''});
      });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={{alignSelf: 'baseline', marginBottom: 50}}>
        <Text style={{fontSize: 18}}>Proceed your</Text>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Sign up</Text>
      </View>
      <View style={{backgroundColor: '#F1F1F2', alignItems: 'center'}}>
        {/* name */}
        <View style={{borderBottomWidth: 0.2, width: '100%'}}>
          <Text>Name</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="input name"
              value={state.name}
              onChangeText={(value) => onInputChange(value, 'name')}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../image/user.png')}
                style={{height: 20, width: 20}}
              />
            </View>
          </View>
        </View>
        {/* email */}
        <View style={{borderBottomWidth: 0.2, width: '100%', marginTop: 20}}>
          <Text>Email</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
        <View style={{borderBottomWidth: 0.2, width: '100%', marginTop: 20}}>
          <Text>Password</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="min 6 characters"
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
        {/* password2 */}
        <View style={{borderBottomWidth: 0.2, width: '100%', marginTop: 20}}>
          <Text>Retype Password</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="retype password"
              secureTextEntry={true}
              value={state.password2}
              onChangeText={(value) => onInputChange(value, 'password2')}
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
            <Text style={{marginTop: 20, color: 'red', textAlign: 'center'}}>{warningText}</Text>
          </View>
        )}
        {successText !== '' && (
          <View>
            <Text style={{marginTop: 20, color: 'green', textAlign: 'center'}}>{successText}</Text>
          </View>
        )}
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#BCBABE',
            marginTop: 40,
            marginBottom: 20,
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Button
            name="Register"
            onPress={daftarSubmit}
            loading={globalState.isLoading}
          />
        </View>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{color: '#1995AD'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F1F1F2',
    padding: 40,
  },
});
