import { Component } from 'react';
import axios from 'axios';
import { API_URL } from '@env';

var authHeader = '';

const baseURL = API_URL;

const defaultHeader = {
  "Authorization": authHeader,
  "Content-Type": "application/json",
  "Accept": "application/json"
};

class API extends Component {
  constructor(props: any) {
    super(props);
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
  }

  async post(targetFunction: string, data: any = null) {

    const url = baseURL + targetFunction;

    try {
      const response = await axios.post(url, data, {
        headers: defaultHeader,
      });

      return response;
    } catch (ex) {
      console.log('ERR=>' + ex);
    }
  }

  async get(targetFunction: string) {

    const url = baseURL + targetFunction;

    try {
      const response = await axios.get(url, {
        headers: defaultHeader,
      });

      return response;
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return null;
  }
}

const api = new API({});
export default api;