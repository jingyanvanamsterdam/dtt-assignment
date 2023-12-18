import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://api.intern.d-tt.nl/api/',
  headers: { 'X-Api-Key': 'OlvWD_9xQUCkJ2A1wY0jgi3Z7uacqBtp'}
});