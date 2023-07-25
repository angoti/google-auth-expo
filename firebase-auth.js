import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

GoogleSignin.configure({
  webClientId:
    '941958989879-31n65cgn19brq0tgr5tfume35rf9drhs.apps.googleusercontent.com',
});

export const logOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const getSilentlyCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};

export const isGoogleSignedIn = async () => {
  return await GoogleSignin.isSignedIn();
};

function GoogleLogin({ setUser }) {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  async function onGoogleButtonPress() {
    setIsSigninInProgress(true);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    try {
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
      // const { idToken } = await GoogleSignin.signIn();
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.error('----------------> ', e);
    }
  }

  return (
    <View>
      {isSigninInProgress ? (
        <ActivityIndicator />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() =>
            onGoogleButtonPress().then(user => {
              console.log('********** ', user.user);
              setUser(user.user);
            })
          }
          disabled={isSigninInProgress}
        />
      )}
    </View>
  );
}

export default GoogleLogin;
