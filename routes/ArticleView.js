//The webview where each article will be viewed
import { WebView } from 'react-native-webview';
import { Portal, Surface, ActivityIndicator } from 'react-native-paper';
import { Linking } from 'react-native';
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
        navigation.setOptions({ title: route.params.title, rightBar: { icon: 'web', onClick: () => { } } })
        
    },[]);
    
return (
    <Surface>
        {article === null ? <ActivityIndicator /> :
            <Portal>
                {/*<Titlebar title={article.title} setter={() => {setter(null)}} url={article.link}></Titlebar>*/}
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlString }}
                    onShouldStartLoadWithRequest={handleShouldStartLoad}>
                </WebView>


            </Portal>
        }
    </Surface>
);
}

