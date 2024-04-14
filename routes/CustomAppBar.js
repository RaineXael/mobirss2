import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';


export default function CustomNavigationBar({ navigation, route, options, back }) {
    const title = getHeaderTitle(options, route.name);
    
    return (
      <Appbar.Header>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={title} />
        {options.rightBar && <Appbar.Action icon={options.rightBar.icon} onPress={options.rightBar.onClick}/>}
      </Appbar.Header>
    );
  }