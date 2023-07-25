import 'react-native-gesture-handler';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createContext, useContext, useEffect, useState } from 'react';
import GoogleLogin, {
  getSilentlyCurrentUserInfo,
  isGoogleSignedIn,
  logOut,
} from './firebase-auth';

// Contexto controla o estado da autenticação
export const AuthContext = createContext({
  hasUser: false,
  setUser: estado => {
    hasUser = estado;
  },
});

// botão logout
export const botaoSair = setUser => {
  return (
    <View style={{ marginRight: 12 }}>
      <Button
        title="Sair"
        onPress={() => {
          setUser(false);
          logOut();
        }}
      />
    </View>
  );
};

// Telas
export const PrimeiraTela = () => {
  const { setUser } = useContext(AuthContext);
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Login</Text>
      <GoogleLogin setUser={setUser} />
    </View>
  );
};

export const SegundaTela = () => {
  const { hasUser } = useContext(AuthContext);
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Tela A</Text>
      <Text style={styles.title}>{hasUser.email}</Text>
    </View>
  );
};

export const TerceiraTela = () => {
  const { hasUser } = useContext(AuthContext);
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Tela B</Text>
      <Image
        source={{ uri: hasUser.photo }}
        style={{ flex: 1, width: '100%', width: '100%' }}
        resizeMode="contain"
      />
    </View>
  );
};

export const DrawerNavigator = ({ renderHeaderButton }) => {
  const Drawer = createDrawerNavigator();
  const { setUser } = useContext(AuthContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => renderHeaderButton(setUser), // Adiciona o botão no cabeçalho
      }}>
      <Drawer.Screen
        name="Tela A"
        component={SegundaTela}
        options={
          {
            // title: 'App',
          }
        }
      />
      <Drawer.Screen
        name="Tela B"
        component={TerceiraTela}
        options={
          {
            // title: 'App',
          }
        }
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(false);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
    console.log(1);
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    console.log(2);
    const isGoogleSigned = await isGoogleSignedIn();
    console.log(3);
    if (isGoogleSigned) {
      console.log('User is already signed in');
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await getSilentlyCurrentUserInfo();
      console.log('User Info --> ', info.user);
      setUser(info.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ hasUser: user, setUser }}>
      {gettingLoginStatus ? (
        <View style={styles.layout}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : !user ? (
        <PrimeiraTela />
      ) : (
        <NavigationContainer>
          <DrawerNavigator renderHeaderButton={botaoSair} />
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
