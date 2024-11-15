//Settings Menu
import {Surface, Button, Checkbox, Portal, Dialog, Text, Divider, IconButton} from 'react-native-paper';
import { storeData} from "../modules/DataManager";
import { ScrollView, StyleSheet,Linking } from 'react-native';
import {useState} from 'react';
import { PopupButton } from '../components/PopupButton';
export default function Settings({ navigation, isDark, setDark }) {

    const siteURL = 'http://www.rainexael.xyz';
    const repoURL = 'https://github.com/RaineXael/mobirss2';

    return (
        <Surface style={styles.surface}>           
            <ScrollView style={styles.options}>

                <DarkModeSetter isDark={isDark} setDark={setDark} />
                
                <ShowNavOnFeedShower />
                <Divider />
                <ResetDataButton/>
            </ScrollView>
            <Surface elevation='1'>
                <Button onPress={()=>{navigation.navigate("DebugStorageViewer")}}>View Storage (DEBUG)</Button>
                <Text style={styles.credit}>App by RaineXael</Text>
                <Surface elevation='0' style={styles.creditLinks}>
                    <IconButton icon='web' onPress={()=>{Linking.openURL(siteURL)}}></IconButton>
                    <IconButton icon='github' onPress={()=>{Linking.openURL(repoURL)}}></IconButton>
                </Surface> 
            </Surface>
        </Surface>

    );
}

function ResetDataButton() {

    const resetData = () => { storeData('saved-feeds', []) }
    const [visible, setVisible] = useState(false);


    const confirmDeletion = () => {
        resetData();
        alert('Feeds Deleted.'); //TODO: Change this to a native-paper thing for visual consistency
        setVisible(false);
    }
    return (
        <>
        <Button onPress={()=>{setVisible(true)}}>Reset All Stored Data</Button>
        <PopupButton visible={visible} setVisible={setVisible} onYes={confirmDeletion} onNo={()=>{}}></PopupButton>
        </>
    );
}

function DarkModeSetter({ isDark, setDark }) {

    const toggleDark = () => {
        setDark(!isDark);
        storeData('darkmode', !isDark);
    }

    return (
        <Checkbox.Item label="Dark Mode" status={isDark ? 'checked' : 'unchecked'} onPress={toggleDark} />
    );
}

function ShowNavOnFeedShower() {
    const [isDark, setDark] = useState(false);

    const toggleDark = () => {
        setDark(!isDark);
        storeData('darkmode', !isDark);
    }
    return (
        <Checkbox.Item label="Show Navigation Bar under Article" status={isDark ? 'checked' : 'unchecked'} onPress={toggleDark} />
    );
}


const styles = StyleSheet.create({

    surface:{
        height:'100%'
    },
    options:{
        'flex-grow':1
    },
    credit: {
        textAlign: 'center',
        margin: 16,       
    },
    creditLinks:{
        flexDirection:'row',
   
        justifyContent:'center'
    }
})      