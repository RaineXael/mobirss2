import {  Button,  Dialog, Portal, TextInput, ActivityIndicator, HelperText } from "react-native-paper";
import { fetchFeed, parseXML, processFeed } from '../modules/FeedFetcher'
import {useEffect, useState} from 'react'
import { StyleSheet } from "react-native";
import { storeArticleList, storeData } from "../modules/DataManager";

const sampleXML = '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Slightly Damned</title><atom:link href="https://www.sdamned.com/comic/rss" rel="self" type="application/rss+xml"/><link>https://www.sdamned.com/</link><description>Slightly Damned: latest comics and news</description><language>en-us</language><item><title><![CDATA[Slightly Damned - 1136]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1136"><img src="https://www.sdamned.com/comicsthumbs/1728725238-SD1136.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1136</link><pubDate>Sat, 12 Oct 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1136</guid></item><item><title><![CDATA[Slightly Damned - 1135]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1135"><img src="https://www.sdamned.com/comicsthumbs/1728125746-SD1135.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1135</link><pubDate>Sat, 05 Oct 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1135</guid></item><item><title><![CDATA[Slightly Damned - 1134]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1134"><img src="https://www.sdamned.com/comicsthumbs/1727337460-SD1134.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1134</link><pubDate>Sat, 28 Sep 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1134</guid></item><item><title><![CDATA[Slightly Damned - 1133]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1133"><img src="https://www.sdamned.com/comicsthumbs/1726300307-SD1133.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1133</link><pubDate>Sat, 21 Sep 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1133</guid></item><item><title><![CDATA[Slightly Damned - 1132]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1132"><img src="https://www.sdamned.com/comicsthumbs/1726300275-SD1132.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1132</link><pubDate>Sat, 14 Sep 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1132</guid></item><item><title><![CDATA[Slightly Damned - 1131]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1131"><img src="https://www.sdamned.com/comicsthumbs/1724493779-SD1131.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1131</link><pubDate>Sat, 31 Aug 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1131</guid></item><item><title><![CDATA[Slightly Damned - 1130]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1130"><img src="https://www.sdamned.com/comicsthumbs/1723879576-SD1130.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1130</link><pubDate>Sat, 24 Aug 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1130</guid></item><item><title><![CDATA[Slightly Damned - 1129]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1129"><img src="https://www.sdamned.com/comicsthumbs/1723878028-SD1129.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1129</link><pubDate>Sat, 17 Aug 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1129</guid></item><item><title><![CDATA[Slightly Damned - 1128]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1128"><img src="https://www.sdamned.com/comicsthumbs/1723295317-SD1128.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1128</link><pubDate>Sat, 10 Aug 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1128</guid></item><item><title><![CDATA[Slightly Damned - 1127]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1127"><img src="https://www.sdamned.com/comicsthumbs/1722742594-SD1127.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1127</link><pubDate>Sat, 03 Aug 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1127</guid></item><item><title><![CDATA[Slightly Damned - 1126]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1126"><img src="https://www.sdamned.com/comicsthumbs/1720857236-SD1126.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1126</link><pubDate>Sat, 13 Jul 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1126</guid></item><item><title><![CDATA[Slightly Damned - 1125]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1125"><img src="https://www.sdamned.com/comicsthumbs/1720293773-SD1125.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1125</link><pubDate>Sat, 06 Jul 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1125</guid></item><item><title><![CDATA[Slightly Damned - 1124]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1124"><img src="https://www.sdamned.com/comicsthumbs/1719647535-SD1124.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1124</link><pubDate>Sat, 29 Jun 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1124</guid></item><item><title><![CDATA[Slightly Damned - 1123]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1123"><img src="https://www.sdamned.com/comicsthumbs/1719041169-SD1123.png" /><br />New comic!</a><br /><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd"><p><br></p>]]></description><link>https://www.sdamned.com/comic/1123</link><pubDate>Sat, 22 Jun 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1123</guid></item><item><title><![CDATA[Slightly Damned - 1122]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1122"><img src="https://www.sdamned.com/comicsthumbs/1717231314-SD1122.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1122</link><pubDate>Sat, 15 Jun 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1122</guid></item><item><title><![CDATA[Slightly Damned - 1121]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1121"><img src="https://www.sdamned.com/comicsthumbs/1717231284-SD1121.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1121</link><pubDate>Sat, 08 Jun 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1121</guid></item><item><title><![CDATA[Slightly Damned - 1120]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1120"><img src="https://www.sdamned.com/comicsthumbs/1717231244-SD1120.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1120</link><pubDate>Sat, 01 Jun 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1120</guid></item><item><title><![CDATA[Slightly Damned - 1119]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1119"><img src="https://www.sdamned.com/comicsthumbs/1716027486-SD1119.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1119</link><pubDate>Sat, 25 May 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1119</guid></item><item><title><![CDATA[Slightly Damned - 1118]]></title><description><![CDATA[<a href="https://www.sdamned.com/comic/1118"><img src="https://www.sdamned.com/comicsthumbs/1716027356-SD1118.png" /><br />New comic!</a><br />]]></description><link>https://www.sdamned.com/comic/1118</link><pubDate>Sat, 18 May 2024 00:00:00 -0700</pubDate><guid>https://www.sdamned.com/comic/1118</guid></item></channel></rss>'

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


  const fetchSampleURL = async () => {
    //should fetch from URL
    setLoading(true);
    try{
      let foundFeed = parseXML(sampleXML)
      
      if(foundFeed !== null){
        foundFeed.feedLink = 'https://www.sdamned.com/comic/rss';
        
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
          value={text}
          onChangeText={text => setText(text)}
          error={(error.length > 0)}></TextInput>
          {(error.length > 0) && <HelperText>Error: {error}</HelperText>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={fetchURL}>Add</Button>
          <Button onPress={fetchSampleURL}>Fetch Sample</Button>
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
