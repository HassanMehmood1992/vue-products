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
        <v-flex md3 sm4 xs6 :key="product.id" class=" pa-2">
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="mx-auto my-12"
              max-width="374"
              tile
              :elevation="hover ? 5 : 1"
              :to="{ name: 'product-id', params: { id: product.id } }"
              height="400"
              color="#F5F5F5"
            >
              <v-img
                height="250"
                :src="`${$imagesCDN}${product.image.hash}`"
              ></v-img>

              <div class="font-weight-medium line-height-150 text-h6 pa-4">
                {{ product.name }}
              </div>

              <v-card-text class="py-0">
                <div class="subtitle-1 accent--text">
                  {{ product.brand ? product.brand.name : " -" }}
                </div>
              </v-card-text>
              <v-card-text class="pt-0">
                <div class="subtitle-1">$ {{ product.old_price }}</div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
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
import { map, debounce, slice, union } from "lodash";

export default {
  components: {
    Welcome
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
              slice(map(response.data, item => item.product),0,12)
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
<style lang="scss">
.line-height-150 {
  line-height: 1.5rem !important;
}
</style>
