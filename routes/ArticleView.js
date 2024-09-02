//The webview where each article will be viewed
import { WebView } from 'react-native-webview';
import { Portal, Surface, ActivityIndicator, Appbar, Button } from 'react-native-paper';
import { Linking, StyleSheet } from 'react-native';
import { getData } from '../modules/DataManager';
import { useEffect, useState } from 'react';

export function ArticleWebView({ navigation, route }) {

    const [article, setArticle] = useState(null);

    let htmlString = ''
    if (article !== null) {
        htmlString = article.description
    }
    const handleShouldStartLoad = (event) => {
        // Check if the link is external
        if (event.url.startsWith('http://') || event.url.startsWith('https://')) {
            // Open in the device's default browser
            Linking.openURL(event.url);
            return false; // Stop the WebView from navigating
        }

        return true; // Allow the WebView to navigate for other URLs
    };


    useEffect(() => {
        getData(route.params.URL).then(json=>{
            setArticle(JSON.parse(json));
        }).catch(e=>{
            console.error(e);
            //navigation.pop;
        })
        navigation.setOptions({ title: route.params.title, rightBar: [{ icon: 'web', onClick: () => { } }] })
        
    },[]);
    
return (
    <Surface>
        {article === null ? <ActivityIndicator /> :
            <Portal>
                <Titlebar title={article.title} navigation={navigation} url={article.link}></Titlebar>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlString }}
                    onShouldStartLoadWithRequest={handleShouldStartLoad}>
                </WebView>
                <BottomNav/>

            </Portal>
        }
    </Surface>
);
}
function BottomNav(){
    //Buttons to go to the next / last article
    return(
        <Surface style={styles.bottomNav}>
            <Button icon='arrow-left' onPress={() => {alert('a')}}>Previous</Button>
            <Button icon='arrow-right' onPress={() => {alert('a')}}>Next</Button>
        </Surface>
    );
}
function Titlebar({title, navigation, url}){
    return(
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {navigation.pop()}} />
          <Appbar.Content title={title} />
          
          
          <Appbar.Action icon="web" onPress={() => {
            //should open the main page when in the feed list,
            //opens this article on a certain article view
            if(url !== undefined && url !== null) {
              Linking.openURL(url);
            }
          }} />   
        
        </Appbar.Header>
    );
  }

  const styles = StyleSheet.create({
    bottomNav: {
        display:'flex',
      'flexDirection': 'row',
      'justifyContent': 'space-evenly'
    },
  });