import {db, auth} from '../../firebase';
import Sound from 'react-native-sound';

let play = false;

const validate = (email, password) => {
  return new Promise((resolve, reject) => {
    if (password.length < 6) {
      reject('password min 6 characters!');
    }
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      reject('format email not valid');
    }
    resolve('ok');
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    validate(email, password)
      .then(() => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(({user}) => {
            const data = {
              email: user.email,
              uid: user.uid,
              name: user.displayName,
              photoUrl: user.photoUrl,
            };
            // console.log('sukses login ===> ' + data);
            resolve(data);
          })
          .catch((err) => {
            reject('email or password is wrong!');
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const regis = (email, password, password2, name) => {
  return new Promise((resolve, reject) => {
    if (name === '' || email === '' || password === '' || password2 === '') {
      reject('please input all form!');
    }
    if (password !== password2) {
      reject("password didn't match");
    }
    validate(email, password)
      .then(() => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(({user}) => {
            db.ref(`users/${user.uid}/movies`).set({id: user.uid});
            auth.currentUser
              .updateProfile({
                displayName: name,
              })
              .then(() => {
                resolve({name: name, uid: user.uid, email: user.email});
              })
              .catch((err) => {
                reject('update displayName error!');
              });
          })
          .catch((err) => {
            reject(err.message);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMyMov = (dispatch, uid) => {
  setTimeout(() => {
    play = true;
  }, 3000);
  db.ref(`/users/${uid}/movies`).on('value', (snapshot) => {
    let datas = snapshot.val();
    let movies = [];
    for (let a in datas) {
      if (a !== 'id') {
        movies.push(datas[a]);
      }
    }
    dispatch({type: 'SET_MOV', inputValue: movies});
  });
  // get Chat or Tweet
  db.ref('/chat').on('value', (snapshot) => {
    let datas = snapshot.val();
    let tweets = [];
    for (let a in datas) {
      tweets.push(datas[a]);
    }
    dispatch({type: 'SET_TWEET', inputValue: tweets.reverse()});
    if(tweets.length > 101){
      for(let i = 101; i < tweets.length; i++){
        db.ref(`chat/${tweets[i].key}`).remove();
      }
    }
    if (play) {
      notif();
      play = false;
      setTimeout(() => {
        play = true;
      }, 3000);
    }
  });
};

export const removeList = (uid, key) => {
  return new Promise((resolve, reject) => {
    db.ref(`users/${uid}/movies/${key}`).remove();
    resolve('success');
  });
};

export const getUser = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        resolve('LogoutSuccess');
      })
      .catch(function (error) {
        reject('LogoutFailed');
      });
  });
};

export const sendTwitt = (user, text) => {
  play = false;
  let currentdate = new Date();
  let datetime =
  currentdate.getDate() +
  '/' +
  (currentdate.getMonth() + 1) +
  '/' +
  currentdate.getFullYear() +
  ' @ ' +
  currentdate.getHours() +
  ':' +
  currentdate.getMinutes() +
  ':' +
  currentdate.getSeconds();
  return new Promise((resolve) => {
    var newPostKey = db.ref('chat').push().key;
    db.ref(`chat/${newPostKey}`).update({
      key: newPostKey,
      uid: user.uid,
      name: user.name,
      // pic: user.photoUrl,
      time: datetime,
      tweet: text,
    });
    resolve(true);
    setTimeout(() => {
      play = true;
    }, 5000);
  });
};

export const notif = () => {
  const requireAudio = require('../sound/notif.mp3');
  const s = new Sound(requireAudio, (e) => {
    if (e) {
      console.log('Error in SOUND', e);
      return;
    }
    s.play(() => s.release());
  });
};
