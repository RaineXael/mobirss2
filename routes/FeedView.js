//FeedView where each feed's articles will be displayed

import {ActivityIndicator, List, Surface, Divider} from 'react-native-paper';
import {View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import {useState, useEffect} from 'react';
import {getData} from '../modules/DataManager';

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
  
  feedURL = route.params.baseURL+'feed';
  const [feed, setFeed] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null); //REMOVE, a leftover from old rendering method
  const itemJSX = feed.map(elem => {
    //return <Text>{JSON.stringify(elem)}</Text>
    return <ArticleItem key={elem.link} item={elem} navigation={navigation} baseURL={route.params.baseURL}></ArticleItem>
  })

  useEffect(() => {
    //load feedlist from disk on boot
    getData(feedURL).then(data => {
     
      if(data !== undefined){
        setFeed(JSON.parse(data))
        navigation.setOptions({title:route.params.title,rightBar:{icon:'web', onClick:()=>{}}})
      }
     
      
   }).catch(err => {
    console.error(err);
    
   }

   )},[])

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
        <Surface style={styles.surface}>
          {/*<Titlebar title={feed.title} setter={setter} url={feed.link}></Titlebar>*/}
          {feed.length === 0? <ActivityIndicator/>:
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }>
            {currentArticle === null && (itemJSX)}
            {currentArticle !== null && (<ArticleWebView article={currentArticle}
                                                        setter={setCurrentArticle}></ArticleWebView>)}
          </ScrollView>
          }
          
        </Surface>
      </View>
  );

}

const styles = StyleSheet.create({
  surface:{
      height:'100%'
  },
})
