import { usePlacesStore } from '@/composables';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'MapView',
  setup() {

    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserlocationReady } = usePlacesStore();

    onMounted(() => {
      console.log(mapElement.value);
    });

    return {
      isUserlocationReady,
      mapElement
    }
  }
});
