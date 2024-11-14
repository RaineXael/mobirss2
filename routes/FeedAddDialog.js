import {  Button,  Dialog, Portal, TextInput, ActivityIndicator, HelperText } from "react-native-paper";
import { fetchFeed, processFeed } from '../modules/FeedFetcher'
import {useEffect, useState} from 'react'
import { StyleSheet } from "react-native";
import { storeArticleList, storeData } from "../modules/DataManager";

export function FeedInputDialog({feedList, saveFeedFN, visible, setVisible}) {
 
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const hideDialog = () => { setVisible(false) };
  const [error, setError] = useState('');
 

  //Saves the feed data to disk (that was originally read)
  //and appends the needed data into the global feed object
  async function SaveFeedInitial(processedJSON){
    
    storeData(processedJSON.feed.feedLink+'feed', processedJSON.articleList)
    storeArticleList(processedJSON.feed.feedLink,processedJSON.articles)
    //Push article to statevar (up)
    feedList.push(processedJSON.feed);
    //Save that statevar to disk
    await saveFeedFN();
  }


  const fetchURL = async () => {
    //should fetch from URL
    setLoading(true);
    try{
      let foundFeed = await fetchFeed(text);
      console.log(foundFeed.feedLink);
      if(foundFeed !== null){
        foundFeed.feedLink = text;
        
        //add feed to list & save to cache
        const processedFeed = processFeed(foundFeed)
        await SaveFeedInitial(processedFeed);
        hideDialog();
      }
      else
      {
        console.log('caught')
        setError('Feed not found.')
      }     
    }
    catch (error){
      setError('Feed not found: ' + error)     
    }
    finally{
      setLoading(false);
    } 
  }


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
        {!loading && (
          <>
          <Dialog.Content>
          <TextInput label="RSS URL"  
          defaultValue={text}
          onChangeText={text => setText(text)}
          error={(error.length > 0)}></TextInput>
          {(error.length > 0) && <HelperText>Error: {error}</HelperText>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={fetchURL}>Add</Button>
        </Dialog.Actions>
        </>
        )}
        {loading && <ActivityIndicator size='large' style={styles.loading}/>}
      </Dialog>
    </Portal>
  );
}

export function FeedAddView(){
  return;
}


const styles = StyleSheet.create({
  loding: {
    
  },
  dialog:{
    display:'flex',
    padding:16
  }
});
