//FeedView where each feed's articles will be displayed

import { ActivityIndicator, List, Surface, Divider, Dialog, Portal, Button, Searchbar, IconButton } from 'react-native-paper';
import { View, ScrollView, RefreshControl, StyleSheet, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import { getData } from '../modules/DataManager';

function ArticleItem({ item, navigation, baseURL }) {
  return (<>
    <List.Item key={item.title} title={item.title}
      onPress={() => { navigation.push('Article', { URL: baseURL + item.link }) }}></List.Item>
    <Divider />
  </>);
}

const filterTypes =[
  //Title Asc
  (a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  },
  //Title Desc
  (a, b) => {
    if (a.title > b.title) {
      return -1;
    }
    if (a.title < b.title) {
      return 1;
    }
    return 0;
  },
  (a, b) => {
    if (Date.parse(a.pubDate) > Date.parse(b.pubDate)) {
      return -1;
    }
    if (Date.parse(a.pubDate) < Date.parse(b.pubDate)) {
      return 1;
    }
    return 0;
  },
  (a, b) => {
    if (Date.parse(a.pubDate) > Date.parse(b.pubDate)) {
      return 1;
    }
    if (Date.parse(a.pubDate) < Date.parse(b.pubDate)) {
      return -1;
    }
    return 0;
  }
]

export function FeedView({ navigation, options, route }) {
  feedURL = route.params.baseURL + 'feed';
  const [feed, setFeed] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null); //REMOVE, a leftover from old rendering method

  const [filterMenu, setFilterMenu] = useState(false);

  const [searchFilterText,setSearchFilterText] = useState("");

  const [filterType, setFilterType] = useState(2);

  

  //Mapping feeds with search
  let searchedFeeds = feed;
  if (searchFilterText != ""){
    searchedFeeds = feed.filter(elem=>
      //Search criteria goes here
      elem.title.includes(searchFilterText)
    )
  }
  searchedFeeds = searchedFeeds.sort(filterTypes[filterType])

  const itemJSX = searchedFeeds.map(elem => {
    //return <Text>{JSON.stringify(elem)}</Text>
    return <ArticleItem key={elem.link} item={elem} navigation={navigation} baseURL={route.params.baseURL}></ArticleItem>
  })

  useEffect(() => {
    //load feedlist from disk on boot
    getData(feedURL).then(data => {

      if (data !== undefined) {
        setFeed(JSON.parse(data))
        navigation.setOptions({
          title: route.params.title, rightBar: [
            { icon: 'filter', onClick: () => { setFilterMenu(true) } },
            { icon: 'web', onClick: () => { Linking.openURL(route.params.pageURL); } },           
          ]
        })
      };
    }).catch(err => {
      console.error(err);

    }

    )
  }, [])

  const [refreshing, setRefreshing] = useState(false);

  async function refresh() {

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

  

  return (
    <View>
      <FilterDialog isVisible={filterMenu} onDismiss={()=>{setFilterMenu(false)}} filterType={filterType} setFilterType={setFilterType}/>
      <Surface style={styles.surface}>
        {/*<Titlebar title={feed.title} setter={setter} url={feed.link}></Titlebar>*/}
        {feed.length === 0 ? <ActivityIndicator /> :
          <View>
            
          <ScrollView
           stickyHeaderIndices={[0]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }>
            <Surface style={styles.searchbarContainer}>
              <Searchbar style={styles.searchbar}
              value={searchFilterText}
              onChangeText={setSearchFilterText}
              traileringIcon='close'
              onTraileringIconPress={()=>setSearchFilterText("")}
              loading={false}></Searchbar>
              
            </Surface>
            {currentArticle === null && (itemJSX)}
            {currentArticle !== null && (<ArticleWebView article={currentArticle}
              setter={setCurrentArticle}></ArticleWebView>)}
              
          </ScrollView>
          </View>
        }
      </Surface>
    </View>
  );

}

function FilterDialog({isVisible, onDismiss, filterType,setFilterType}){
  
  function SetFilter(type){
    //from the order of the buttons: 0,1,2,3
    setFilterType(type)
    //onDismiss();
  }
  const buttons = [
    { id: 0, label: 'By Title (Ascending)' },
    { id: 1, label: 'By Title (Descending)' },
    { id: 2, label: 'By Date (Newer First)' },
    { id: 3, label: 'By Date (Oldest First)' },
  ];

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>Article Filters</Dialog.Title>
        <Dialog.Content>
          {buttons.map(button => (
            <Button
              key={button.id}
              onPress={() => SetFilter(button.id)} // Set active filter based on button id
              mode={filterType === button.id ? 'outlined' : 'text'} // Set type based on condition
            >
              {button.label}
            </Button>
          ))}

        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>

      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  surface: {
    height: '100%'
  },
  searchbarContainer:{
    
  },
  searchbar:{
    margin:6
  },
  
})
