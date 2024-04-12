//Main View where all the RSS feeds will be displayed
import { Text, Card, Button, Surface, FAB, Appbar, ActivityIndicator, Badge, Menu } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { FeedInputDialog } from "./FeedAddDialog";
import { useState, useEffect } from "react";
import { getData, storeData } from "../modules/DataManager";

export default function MainView({navigation}){

    navigation.setOptions({rightBar:{icon:'cog', onClick:()=>{navigation.navigate('Settings')}}})
    
    const [visible, setVisible] = useState(false); //for the feed input menu
    const saveFeeds = async () => {
        await storeData('saved-feeds',feedList)
      }
    
      const [feedList, setFeedList] = useState([]);
      const [feedsLoaded, setLoaded] = useState(false);
      
    
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




       
    const feedJSX = feedList.map(elem => {
        return (<FeedCard feed={elem} key={elem.link} style={styles.card} navigation={navigation}></FeedCard>)
    });
    console.log(feedJSX)


    return (
        <Surface style={styles.surface}>
            <FeedInputDialog saveFeedFN={saveFeeds} feedList={feedList} visible={visible} setVisible={setVisible} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {feedJSX}
            </ScrollView>
            <FAB icon="plus" size='large' style={styles.fab} onPress={() => setVisible(true)}>Add New Feed</FAB>
        </Surface>
    );


}


//<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

function FeedCard({ feed, navigation }) {

    const [visible, setVisible] = useState(false);
    const closeMenu = () => {setVisible(false)}
    return (
        
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={

                /*navigate to feed menu with item on the onpressc*/
                <Card elevation={5} onPress={() => {navigation.push("Feed", {title:feed.title,baseURL:feed.feedLink,feeds:feed.item})}} style={styles.card} onLongPress={() => setVisible(true)}>
                    <Card.Title title={feed.title} subtitle={feed.link} 
                    right={() => <Badge>24</Badge>}/>
                    <Card.Content>
                        <Text>{feed.description}</Text>
                    </Card.Content>
                </Card>


            }>
            <Menu.Item onPress={() => { }} title="Edit" />
            <Menu.Item onPress={() => { }} title="Delete" />
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
