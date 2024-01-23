import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { Text, PaperProvider, Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <PaperProvider>
      <NavigationContainer>
      
      <Stack.Navigator initialRouteName='First'>
        <Stack.Screen name="First" component={RouteOne}/>
        <Stack.Screen name="Second" component={RouteTwo}/>
        <Stack.Screen name="Pushed" component={PushedRoute}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
      </NavigationContainer>
      </PaperProvider>
      
    
  );
}

function RouteOne({navigation}){
  return(<View>
    <Text>This is the first view</Text>
    <Button onPress={() => navigation.navigate('Second')}>Navigate to second Page</Button>
    <Button onPress={() => navigation.push('Pushed')}>Nav to Nav</Button>
  </View>);
}

function RouteTwo({navigation}){
  return(<View>
    <Text>This is the 2nd view</Text>
    <Button onPress={() => navigation.navigate('First')}>Navigate to first Page</Button>
    <Button onPress={() => navigation.push('Pushed')}>Nav to Nav</Button>
  </View>);
}

function PushedRoute({navigation}){
  return(<View>
    <Button onPress={() => navigation.push('Pushed')}>Nav to Nav</Button>
  </View>)
}

