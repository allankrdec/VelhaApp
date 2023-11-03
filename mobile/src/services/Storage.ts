import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  storeString = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  storeObj = async (key: string, value: any): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  getDataString = async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);

      return value;
    } catch (e) {
      return null;
    }
  };

  getDataObj = async (key: string): Promise<any | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  };
}

export default new StorageService();
