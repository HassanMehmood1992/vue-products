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
      <template v-for="product in items">
        <product-card :product="product" :key="product.id"></product-card>
      </template>
    </v-layout>

    <v-layout v-if="items.length == 0 && !loading" class="my-2">
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
    items: [],
    loading: false
  }),
  computed: {
    reachedEnd() {
      return this.$store.getters["scrollEvents/reachedEnd"];
    }
    // items() {
    //   return this.products;
    // }
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
          if (response.data && response.data.length > 0) {
            const products = map(response.data, item => item.product).sort(
              (a, b) => a.old_price - b.old_price
            );
            this.items = Object.freeze(products);
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
          if (response.data && response.data.length > 0) {
            const products = xorBy(
              that.items,
              map(response.data, item => item.product)
            ).sort((a, b) => a.old_price - b.old_price);

            that.items = Object.freeze([...that.items, products]);
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
