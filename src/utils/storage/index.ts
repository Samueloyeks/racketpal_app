import {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage extends Component {
  constructor(props: any) {
    super(props);
    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
  }

  async set(targetName: string, data: any) {
    try {
      await AsyncStorage.setItem(targetName, JSON.stringify(data));
    } catch (ex: any) {
      console.log('AsyncStorage error: ' + ex.message);
    }

    return;
  }

  async get(targetName: string) {
    let data: any;
    try {
      data = await AsyncStorage.getItem(targetName);
      return data ?? null; 
    } catch (ex: any) {
      console.log('AsyncStorage error: ' + ex.message);
    }
  }

  async delete(targetName: string) {
    try {
      await AsyncStorage.removeItem(targetName);
    } catch (ex: any) {
      console.log('AsyncStorage error: ' + ex.message);
    }
    return;
  }

  render() {
    return null;
  }
}

const db = new Storage({});
export default db;