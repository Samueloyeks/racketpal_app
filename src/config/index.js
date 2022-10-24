import axios from "axios";
import EventSource from "react-native-sse";

import { BASE_URL } from '@env';

export const Axios = axios.create({
  baseURL: BASE_URL
})

export const STREAM_URL = `${BASE_URL}/stream`;

export const ssEvents = new EventSource(STREAM_URL)