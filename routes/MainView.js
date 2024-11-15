//Main View where all the RSS feeds will be displayed
import { Text, Card, Button, Surface, FAB, Appbar, ActivityIndicator, Badge, Menu } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { FeedInputDialog } from "./FeedAddDialog";
import { useState, useEffect } from "react";
import { deleteFeed, getData, storeData } from "../modules/DataManager";
import { DeletePopup } from "../components/DeletePopup";

export default function MainView({navigation}){

    useEffect(()=>{
        navigation.setOptions({rightBar:[{icon:'cog', onClick:()=>{navigation.navigate('Settings')}}]})
    },[])
    
    const [visible, setVisible] = useState(false); //for the feed input menu
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deletingURL, setdeletingURL] = useState(false)
    const saveFeeds = async () => {
        await storeData('saved-feeds',feedList)
    }
    
      const [feedList, setFeedList] = useState([]);
      const [feedsLoaded, setLoaded] = useState(false); //TODO: Add a loading bar to this var
      
    
      useEffect(() => {
        //load feedlist from disk on boot
        getData('saved-feeds').then(data => {
         
          if(data !== undefined){
            setFeedList(JSON.parse(data))
          }
          setLoaded(true);
          
       }).catch(err => {
        console.error(err);
        setLoaded(true);
       }
    
       )},[])


    async function onFeedDelete(){
        await deleteFeed(deletingURL + 'feed');
        console.log(deletingURL + 'feed');
        const updatedFeedList = feedList.filter(entry => entry.feedLink !== deletingURL)
        setFeedList(updatedFeedList);
        console.log('new list: ' + updatedFeedList)
        await storeData('saved-feeds', updatedFeedList)

        setDeleteVisible(false)
    }

    return (
        <Surface style={styles.surface}>
            <DeletePopup onDelete={onFeedDelete} name={'feed'} visible={deleteVisible} hideDialog={()=>{setDeleteVisible(false)}}></DeletePopup>
            <FeedInputDialog saveFeedFN={saveFeeds} feedList={feedList} visible={visible} setVisible={setVisible} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                
                {feedList.map(elem => {
                    return (<FeedCard feed={elem} key={elem.link} style={styles.card} navigation={navigation}
                        setDeletingURL={setdeletingURL} onDeleteQueue={() => { setDeleteVisible(true) }}></FeedCard>)
                })}
            
            </ScrollView>
            <FAB icon="plus" size='large' style={styles.fab} onPress={() => setVisible(true)}>Add New Feed</FAB>
        </Surface>
    );
}


//<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

function FeedCard({ feed, navigation, setDeletingURL, onDeleteQueue}) {



    const [visible, setVisible] = useState(false);
    const closeMenu = () => {setVisible(false)}
    return (
        
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={

                /*navigate to feed menu with item on the onpressc*/
                <Card elevation={5} onPress={() => {navigation.push("Feed", {title:feed.title,baseURL:feed.feedLink, pageURL:feed.link})}} style={styles.card} onLongPress={() => setVisible(true)}>
                    <Card.Title title={feed.title} subtitle={feed.link} />
                    <Card.Content>
                        <Text>{feed.description}</Text>
                    </Card.Content>
                </Card>


            }>
            {/* <Menu.Item onPress={() => {closeMenu(); }} title="Mark as Read" />
            <Menu.Item onPress={() => {closeMenu(); }} title="Edit" /> */}
            <Menu.Item onPress={() => { setDeletingURL(feed.feedLink); onDeleteQueue(); closeMenu();}} title="Delete" />
        </Menu>

    );
}




const styles = StyleSheet.create({
    surface: {
        flex: 1,
        height:'100%'
    },
    surface:{
        height:'100%'
    },
    credit: {
        textAlign: 'center',
        margin: 16
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    card: {
        margin: 8
    },


})
