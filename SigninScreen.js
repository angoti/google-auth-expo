import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { View } from 'react-native';

GoogleSignin.configure({
  webClientId:
    '941958989879-31n65cgn19brq0tgr5tfume35rf9drhs.apps.googleusercontent.com',
});

export const logOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};

function SigninScreen({ setUser }) {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  async function onGoogleButtonPress() {
    setIsSigninInProgress(true);

    console.log(1);
    // Get the users ID token
    GoogleSignin.signIn().then(idToken => {
      console.log(2);
      console.log(idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log(3);
      console.log(googleCredential);

      // Sign-in the user with the credential
      auth()
        .signInWithCredential(googleCredential)
        .then(userCredential => {
          console.log(4,userCredential)
          userCredential
        } 
        );
    });
  }

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() =>
          onGoogleButtonPress().then(user => {
            console.log(user);
            setUser(user.user);
          })
        }
        disabled={isSigninInProgress}
      />
    </View>
  );
}

export default SigninScreen;
