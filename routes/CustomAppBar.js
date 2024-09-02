import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';


export default function CustomNavigationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  let appbarButtons = null;
  if (options.rightBar !== undefined) {
    appbarButtons = options.rightBar.map((elem) => {
      return <Appbar.Action key={elem.icon} icon={elem.icon} onPress={elem.onClick} />;
    })
  }
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {options.rightBar && appbarButtons}
    </Appbar.Header>
  );
}