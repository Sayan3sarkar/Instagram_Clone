import { Button, Input } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InstagramEmbed from 'react-instagram-embed';

import ImageUpload from './components/ImageUpload/ImageUpload';
import Post from './components/Post/Post';
import Header from './components/shared/Header/Header';
import Modal from './components/shared/Modal/Modal';

import { db, auth } from './shared/firebase';

import { useStateValue } from './context/StateProvider';
import * as actionTypes from './context/actionTypes';

const App = () => {

  const [open, setOpen] = useState(false); // For Signup
  const [openSignIn, setOpenSignIn] = useState(false); // For Login
  // The above 2 are for the modal

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Above 3 for authentication

  const [{ posts, user }, dispatch] = useStateValue(); // Global app state import via context API

  // Fetches Posts from Firestore
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      dispatch({
        type: actionTypes.SET_POSTS,
        post: snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      });
    })
  }, [])

  // Checks whether user exists or not
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null
        })
      }
    });

    return () => {
      unsubscribe();
    }
  }, [user])

  // Signs Up the user
  const signUp = e => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch(error => alert(error.message));
    setUsername('');
    setEmail('');
    setPassword('');
    setOpen(false);
  }

  // Signs In the user
  const signIn = e => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
      .then(authUser => {
        if (authUser) {
          setEmail('');
          setPassword('');
          setOpenSignIn(false);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }

  // SignUpForm
  const signUpForm = (
    <Modal
      openModal={open}
      closeModal={() => { setOpen(false) }}
    >
      <Input
        placeholder="User Name"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input
        placeholder="Email ID"
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={signUp} variant="contained" color="secondary" style={{ marginTop: '10px' }}>Sign up</Button>
    </Modal>
  );

  const signInForm = (
    <Modal
      openModal={openSignIn}
      closeModal={() => { setOpenSignIn(false) }}
    >
      <Input
        placeholder="Email ID"
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={signIn} variant="contained" color="secondary" style={{ marginTop: '10px' }}>Sign In</Button>
    </Modal>
  );

  return (
    <div className="app">
      {signUpForm}
      {signInForm}

      <Header>
        {user ? (
          <Button onClick={() => auth.signOut()} variant="contained" color="secondary">Logout</Button>
        ) : (
          <>
            <Button onClick={() => { setOpenSignIn(true) }} variant="contained" color="secondary">Sign In</Button>
            <Button onClick={() => { setOpen(true) }} style={{ marginLeft: '10px' }}>Sign up</Button>
          </>
        )}
      </Header>

      {/* New Post Uploader */}
      {
        user ? <ImageUpload /> : (
          <div className="app__unAuthFooter" onClick={() => { setOpenSignIn(true) }}>
            Login to upload
          </div>
        )
      }


      {/* Instagram Posts */}
      <div className="app__posts">
        <div className="app_postsLeft">
          {
            posts?.map(post => (
              <Post
                key={post.id}
                postId={post.id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              // user={user}
              />
            ))
          }
        </div>
        <div className="app_postsRight">
          <InstagramEmbed
            url='https://www.instagram.com/p/CLuUdduBuU3/'
            clientAccessToken='<facebook_appID>|<facebook_app_client_token>' // Steps to put unique token mentioned in README
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
            className="app__instaEmbed"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
