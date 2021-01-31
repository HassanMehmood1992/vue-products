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

    <v-layout row wrap class="" v-if="items.length > 0">
      <template v-for="(product, i) in items">
        <product-card :product="product" :key="i"></product-card>
      </template>
    </v-layout>

    <v-layout v-if="items.length == 0 && !loading">
      <v-flex class=" body-2">
        Sorry! We are out of service at the moment
      </v-flex>
    </v-layout>

    <v-layout v-if="loading" class="mt-1">
      <v-flex class="text-center">
        <v-progress-circular indeterminate color="primary" :width="3" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Welcome from "@/components/welcome.vue";
import productCard from "@/components/productCard.vue";
import { map, debounce, slice, union } from "lodash";

export default {
  components: {
    Welcome,
    productCard
  },
  data: () => ({
    products: [],
    loading: false
  }),
  computed: {
    reachedEnd() {
      return this.$store.getters["scrollEvents/reachedEnd"];
    },
    items() {
      return this.products.sort((a, b) => a.old_price - b.old_price);
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.loading = true;
      axios
        .get(`products/v2/getProducts`)
        .then(response => {
          if (response.data.length > 0) {
            this.products = map(response.data, item => item.product);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchingMoreProductsDebouncer: debounce(that => {
      axios
        .get(`products/v2/getProducts`)
        .then(response => {
          if (response.data.length > 0) {
            that.products = union(
              that.products,
              slice(
                map(response.data, item => item.product),
                0,
                12
              )
            );
          }
        })
        .finally(() => {
          that.loading = false;
        });
    }, 1000)
  },
  watch: {
    reachedEnd: {
      handler() {
        if (this.reachedEnd) {
          this.loading = true;
          this.fetchingMoreProductsDebouncer(this);
        }
      },
      deep: true
    }
  }
};
</script>
