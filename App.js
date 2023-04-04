import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import the screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

import { LogBox } from 'react-native';
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
