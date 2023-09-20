import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';
import { PlacesResponse, Feature } from '@/interfaces/places';


const actions: ActionTree<PlacesState, StateInterface> = {
    getInitialLocation({ commit }) {
        // TODO: Colocar loading
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => commit('setLngLat', { lng: coords.longitude, lat: coords.latitude }),
            (err) => {
                console.error(err);
                throw new Error('No Geolocation');
            }
        );
    },

    async searchPlacesByTerm({ commit, state }, query: string): Promise<Feature[]> {
        if (query.length === 0) {
            commit('setPlaces', []);
            return [];
        }

        if (!state.userLocation) {
            // Handle this error in a better way...An error handler for example
            throw new Error('La ubicación del usuario no se logró obtener');
        }

        // Loading
        commit('setIsLoadingPlaces');

        const resp = await searchApi.get<PlacesResponse>(`/${ query }.json`, {
            params: {
                proximity: state.userLocation?.join(',')
            }
        });
        commit('setPlaces', resp.data.features);
        return resp.data.features;
    }
}



export default actions;