//FeedView where each feed's articles will be displayed

import {Button,Text, Appbar, List, Portal, Surface,Modal, Menu, Divider} from 'react-native-paper';
import {View, ScrollView, Linking, RefreshControl } from 'react-native';
import {useState, useCallback} from 'react';
import { WebView } from 'react-native-webview';
import { fetchFeed } from '../modules/FeedFetcher';
function ArticleItem({item, setter}){
  return(<>
    <List.Item key={item.title} title={item.title}
               onPress={() => {setter(item)}}></List.Item>
    <Divider/>
  </>);
}

// function Titlebar({title, setter, url}){
//   return(
//       <Appbar.Header>
//         <Appbar.BackAction onPress={() => {setter(null)}} />
//         <Appbar.Content title={title} />
//         <Appbar.Action icon="web" onPress={() => {
//           //should open the main page when in the feed list,
//           //opens this article on a certain article view
//           if(url !== undefined && url !== null) {
//             Linking.openURL(url);
//           }
//         }} />

//       </Appbar.Header>
//   );
// }

export function FeedView({navigation, options, route}){
  console.log(route.params.title);
  navigation.setOptions({title:route.params.title,rightBar:{icon:'web', onClick:()=>{}}})
  feed = route.params.feeds;
  
  const [currentArticle, setCurrentArticle] = useState(null); //REMOVE, a leftover from old rendering method
  const itemJSX = feed.map(elem => {
    //return <Text>{JSON.stringify(elem)}</Text>
    return <ArticleItem item={elem} navigation={navigation}></ArticleItem>
  })

  const [refreshing, setRefreshing] = useState(false);

  async function refresh(){
    
    //What was he cooking here
    
    // const newFeed = await fetchFeed(feed.feedLink);

    // console.log(newFeed.rss.channel.item);
    // const guids = feed.item.map(elem => elem.guid);
    // console.log(guids)
    // //compare the two and append new titles
    // newFeed.rss.channel.item.forEach(newFeed => {
    //   console.log(newFeed.guid)

    // });
    setRefreshing(false);
  }

  return(
      <View>
        <Surface>
          {/*<Titlebar title={feed.title} setter={setter} url={feed.link}></Titlebar>*/}
          <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }>
            {currentArticle === null && (itemJSX)}
            {currentArticle !== null && (<ArticleWebView article={currentArticle}
                                                        setter={setCurrentArticle}></ArticleWebView>)}
          </ScrollView>
        </Surface>
      </View>
  );

}

function ArticleWebView({article, setter}){
  const htmlString = article.description

  const handleShouldStartLoad = (event) => {
    // Check if the link is external
    if (event.url.startsWith('http://') || event.url.startsWith('https://')) {
      // Open in the device's default browser
      Linking.openURL(event.url);
      return false; // Stop the WebView from navigating
    }

    return true; // Allow the WebView to navigate for other URLs
  };

  return(
      <Portal>
        <Titlebar title={article.title} setter={() => {setter(null)}} url={article.link}></Titlebar>
        <WebView
            originWhitelist={['*']}
            source={{ html: htmlString}}
            onShouldStartLoadWithRequest={handleShouldStartLoad}>
        </WebView>


      </Portal>
  );
}

