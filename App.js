import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { StyleSheet,  View, useColorScheme } from 'react-native';
import { Text, PaperProvider, Button, MD3DarkTheme,MD3LightTheme, Surface } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomNavigationBar from './routes/CustomAppBar';
import MainView from './routes/MainView';
import { useState, useEffect } from 'react';
import { getData } from "./modules/DataManager";
import { Appbar } from 'react-native-paper';
import Settings  from './routes/SettingsView';
import {FeedView} from './routes/FeedView'
import {ArticleWebView} from './routes/ArticleView'
import { KeyViewer } from './routes/DebugStorageViewer';

const Stack = createNativeStackNavigator();

export default function App() {



  const [isDark, setDark] = useState(false);

   const colorScheme = useColorScheme();
   const { theme } = useMaterial3Theme();
 
   const paperTheme =
      isDark
       ? { ...MD3DarkTheme, colors: theme.dark }
       : { ...MD3LightTheme, colors: theme.light };


       useEffect(()=>{
        getData('darkmode').then(storedDark => {
          setDark(storedDark === "true");
         
        })
       },[])


  return (
    
      <PaperProvider theme={paperTheme}>
      <Surface  style={styles.container}>
      <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Main'
       screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}>
        <Stack.Screen name="Main" component={MainView} options={{ title: 'MobiRSS'}}/>
        <Stack.Screen name="Settings">
          {props => <Settings {...props} isDark={isDark} setDark={setDark} />}
        </Stack.Screen>
        <Stack.Screen name="Feed" component={FeedView}/>
        <Stack.Screen name="Article" component={ArticleWebView}/>
        <Stack.Screen name="DebugStorageViewer" component={KeyViewer}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
      </NavigationContainer>
      </Surface>
      </PaperProvider>
      
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
});


//Below are demo navs to get used to React-Nav

// function RouteOne({navigation}){
//   return(<View>
//     <Text>This is the first view</Text>
//     <Button onPress={() => navigation.navigate('Second')}>Navigate to second Page</Button>
//     <Button onPress={() => navigation.push('Pushed')}>Nav to Nav</Button>
//   </View>);
// }

// function RouteTwo({navigation}){
//   return(<View>
//     <Text>This is the 2nd view</Text>
//     <Button onPress={() => navigation.navigate('First')}>Navigate to first Page</Button>
//     <Button onPress={() => navigation.push('Pushed')}>Nav to Nav</Button>
//   </View>);
// }

// function PushedRoute({navigation}){
//   return(<View>
//     <Button onPress={() => navigation.push('Pushed')}>Nav to Nav</Button>
//   </View>)
// }

