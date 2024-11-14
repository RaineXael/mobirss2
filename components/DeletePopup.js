import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";


export function DeletePopup({onDelete, hideDialog, name, visible}){
    return(
        <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
        {(
          <>
          <Dialog.Content>
            <Text>Are you sure you want to delete this {name}?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDelete}>Yes</Button>
          <Button onPress={hideDialog}>No</Button>

        </Dialog.Actions>
        </>
        )}
        
      </Dialog>
    </Portal>
    );
}

const styles = StyleSheet.create({
    loading: {
      
    },

  });
  