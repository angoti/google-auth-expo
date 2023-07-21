import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useState } from 'react';
import SigninScreen from './SigninScreen';


// Contexto controla o estado da autenticação
export const AuthContext = createContext({
  hasUser: false,
  setUser: (estado) => {
    hasUser = estado;
  },
});

// botão logout
export const renderHeaderButton = setUser => {
  return (
    <View style={{ marginRight: 12 }}>
      <Button
        title="Sair"
        onPress={() => {
          setUser(false);
        }}
      />
    </View>
  );
};

// Telas
export const LoginScreen = () => {
  const { setUser } = useContext(AuthContext);
  
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Login</Text>
      <Button title="Entrar" onPress={() => setUser(true)} />
      <SigninScreen setUser={setUser} />
    </View>
  );
};

export const OverviewScreen = ({navigation}) => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Overview</Text>
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export const SettingsScreen = () => (
  <View style={styles.layout}>
    <Text style={styles.title}>Settings</Text>
  </View>
);


export const StackNavigator = ({ renderHeaderButton }) => {
  const Stack = createNativeStackNavigator();
  const { setUser } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => renderHeaderButton(setUser), // Adiciona o botão no cabeçalho
      }}>
      <Stack.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          title: 'Profile / Overview',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Profile / Settings',
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [hasUser, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{ hasUser, setUser }}>
      {!hasUser ? (
        <LoginScreen />
      ) : (
        <NavigationContainer>
          <StackNavigator renderHeaderButton={renderHeaderButton} />
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