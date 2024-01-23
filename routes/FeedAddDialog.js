import {  Button,  Dialog, Portal, TextInput, ActivityIndicator, HelperText } from "react-native-paper";
import { fetchFeed } from '../modules/FeedFetcher'
import {useEffect, useState} from 'react'
import { StyleSheet } from "react-native";


export function FeedInputDialog({feedList, saveFeedFN, visible, setVisible}) {
 
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const hideDialog = () => { setVisible(false) };
  const [error, setError] = useState('');
 

  const fetchURL = async () => {
    //should fetch from URL, for now just return placeholder text
    
    setLoading(true);
    try{
      const foundFeed = await fetchFeed(text);
      if(foundFeed !== null){
        foundFeed.rss.channel.feedLink = text;
        console.log();
        //add feed to list & save to cache
        feedList.push(foundFeed.rss.channel);
        await saveFeedFN();
        hideDialog();
      }
      else
      {
        console.log('caught')
        setError('Feed not found.')
      }
      setLoading(false);
    }
    catch (error){
      setError('Feed not found: ' + error)
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
          value={text}
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



const styles = StyleSheet.create({
  loding: {
    
  },
  dialog:{
    display:'flex',
    padding:16
  }
});
