import { computed, defineComponent, ref } from "vue";
import SearchResults from "@/components/search-results/SearchResults.vue";

export default defineComponent({
  name: 'SearchBar',
  components: { SearchResults },
  setup() {

    const debounceTimeout = ref();
    const debouncedValue = ref('hola');

    return {
      debouncedValue,

      searchTerm: computed({
        get() {
          return debouncedValue.value;
        },
        set(val: string) {

          if (debounceTimeout.value) clearTimeout(debounceTimeout.value); // <--- Every time that the users type something, the timeout ll'be clear

          debounceTimeout.value = setTimeout(() => {
            debouncedValue.value = val;
          }, 2000);
        }
      })
    }
  }
});