import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork
} from 'firebase/firestore';

// import the screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

//track device internet status
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

const App = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDcPQZSUI2cSdBoSd0TfiEmZXkRN0upWmI',
    authDomain: 'shopping-list-app-e8762.firebaseapp.com',
    projectId: 'shopping-list-app-e8762',
    storageBucket: 'shopping-list-app-e8762.appspot.com',
    messagingSenderId: '33292358917',
    appId: '1:33292358917:web:2109791a6875349362d36c'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  //useNetInfo() to define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  //that will display an alert popup if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name='Welcome'
          component={Welcome}
        />
        <Stack.Screen name='ShoppingLists'>
          {(props) => (
            <ShoppingLists
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
