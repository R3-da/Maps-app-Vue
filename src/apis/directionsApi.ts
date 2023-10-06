import axios from "axios";

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1IjoiZWRkcm9zYWxlcyIsImEiOiJjbG1qbTJsNjUwNGlwMmtxaWJtNjQ2eG91In0._O6LyUEYcxC8JY_Eh5hlbQ'
  }
});

export default directionsApi;