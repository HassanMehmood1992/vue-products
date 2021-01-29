<template>
  <v-container>
    <v-layout row wrap class="my-10">
      <welcome></welcome>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-card class="mx-2" flat>
          <v-card-title class="px-0">Products</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Welcome from "@/components/welcome.vue";

export default {
  components: {
    Welcome
  },
  mounted() {
    // this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get(`autosuggest/v1.0/AE/AED/en-US/?query=london`)
        .then(response => {
          this.items = response.data.Places;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
