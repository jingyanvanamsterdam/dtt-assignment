import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://api.intern.d-tt.nl/api/',
  headers: { 'X-Api-Key': 'OlvWD_9xQUCkJ2A1wY0jgi3Z7uacqBtp' }
  //Tried adding "Access-Control-Allow-Origin": "*" header to make it work on mobile phone to test responsiveness, but seems like it doesn't work due to config in API side
});