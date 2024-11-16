import { useState } from "react";
import { StyleSheet } from "react-native"
import { Button, Dialog, Portal, Text } from "react-native-paper";


export function PopupButton({visible, setVisible, onYes, onNo, text}) {


    const hideDialog = () => setVisible(false);

    const yesTriggered = ()=>{
        onYes();
        hideDialog()
    }

    const noTriggered = ()=>{
        hideDialog()
    }

    return (
        <>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>


                    <Dialog.Content>
                        <Text>Are you sure you want to erase all the feeds you've saved?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={yesTriggered}>Yes</Button>
                        <Button onPress={noTriggered}>No</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
        </>
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
