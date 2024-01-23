import AsyncStorage from '@react-native-async-storage/async-storage';
export async function storeData(key, value){
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Stored ${jsonValue} to ${key}`);
    } catch (e) {
      // saving error
      console.error(e);
    }
  };

export async function getData(key){
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        console.log(`Got value ${value} from key ${key}`);
        return value;
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };
