import axios from "axios";

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token: 'pk.eyJ1IjoiZWRkcm9zYWxlcyIsImEiOiJjbG1qbTJsNjUwNGlwMmtxaWJtNjQ2eG91In0._O6LyUEYcxC8JY_Eh5hlbQ'
  }
});

export default searchApi;