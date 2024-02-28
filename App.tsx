import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login} from './src/screens/Login';
import {Principal} from './src/screens/Principal';
import { Colaboradores } from './src/screens/Colaboradores';
import { EditUser } from './src/components/EditUser';
import { Provider as PaperProvider } from 'react-native-paper';
import { EditSkills } from './src/components/EditSkills';
import { NewUser } from './src/components/NewUser';
import { ModSkills } from './src/components/ModSkills';
import { NewSkill } from './src/components/NewSkill';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="principal" component={Principal} />
        <Stack.Screen name='colaboradores' component={Colaboradores}/>
        <Stack.Screen name='EditUser' component={EditUser}/>
        <Stack.Screen name="EditSkills" component={EditSkills}/>
        <Stack.Screen name="NewUser" component={NewUser}/>
        <Stack.Screen name="ModSkills" component={ModSkills}/>
        <Stack.Screen name="NewSkill" component={NewSkill}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;