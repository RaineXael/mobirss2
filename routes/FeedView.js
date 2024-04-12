//FeedView where each feed's articles will be displayed

import {Button,Text, Appbar, List, Portal, Surface,Modal, Menu, Divider} from 'react-native-paper';
import {View, ScrollView, Linking, RefreshControl } from 'react-native';
import {useState, useCallback} from 'react';

function ArticleItem({item, navigation, baseURL}){
  return(<>
    <List.Item key={item.title} title={item.title}
               onPress={() => {navigation.push('Article', {URL:baseURL+item.link})}}></List.Item>
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
    return <ArticleItem item={elem} navigation={navigation} baseURL={route.params.baseURL}></ArticleItem>
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

