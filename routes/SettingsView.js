//Settings Menu
import {Surface, Button, Checkbox, Portal, Dialog, Text, Divider} from 'react-native-paper';
import { storeData} from "../modules/DataManager";
import { ScrollView, StyleSheet } from 'react-native';
import {useState} from 'react';
export default function Settings({ navigation, isDark, setDark }) {


    return (
        <View style={styles.surface}>           
            <ScrollView style={styles.options}>

                <DarkModeSetter isDark={isDark} setDark={setDark} />

                <ShowNavOnFeedShower />
                <Divider />
                <ResetDataButton></ResetDataButton>
            </ScrollView>
            <Text style={styles.credit}>App by RaineXael</Text>
        </View>

    );
}

function ResetDataButton() {

    const resetData = () => { storeData('saved-feeds', []) }
    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);
    const confirmDeletion = () => {
        resetData();
        alert('Feeds Deleted.');
        setVisible(false);

    }
    return (
        <>
            <Button onPress={() => setVisible(true)}>RESET EVERYTHING</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>


                    <Dialog.Content>
                        <Text>Are you sure you want to erase all the feeds you've saved?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>No</Button>
                        <Button onPress={confirmDeletion}>Yes</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
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
        <Checkbox.Item label="Show navigation in feed" status={isDark ? 'indeterminate' : 'unchecked'} onPress={toggleDark} />
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
        margin: 16
    },
})      