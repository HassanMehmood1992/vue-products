<template>
  <v-container>
    <v-card class="mx-2" flat>
      <v-card-text class="pb-0 pl-0">
        <v-btn text to="/">
          <v-icon color="pr-2">mdi-chevron-left</v-icon> Back</v-btn
        >
      </v-card-text>
      <v-card-text> </v-card-text
    ></v-card>
    <v-layout v-if="product">
      <product-details :product="product"></product-details>
    </v-layout>

    <v-flex v-if="loadingItem" class="text-center">
      <v-progress-circular indeterminate color="primary" :width="3" />
    </v-flex>

    <v-layout v-else-if="!loadingItem && !product">
      <v-flex class="text-center py-2 no-data-found">
        No product found
      </v-flex>
    </v-layout>

    <!-- Related Products  -->
    <v-row class="mt-6">
      <v-col>
        <v-layout row wrap>
          <v-flex>
            <v-card class="mx-2" flat>
              <v-card-title class="pa-0 my-3">Related Products</v-card-title>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout
          row
          wrap
          class=""
          v-if="relatedProducts.length > 0"
          fill-height
        >
          <template v-for="product in relatedProducts">
            <related-product
              :product="product"
              :key="product.id"
            ></related-product>
          </template>
        </v-layout>

        <v-layout
          v-if="relatedProducts.length == 0 && !loading && !loadingItem"
        >
          <v-flex class="body-2 text-center">
            No related products found
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { map, size, slice } from "lodash";
import relatedProduct from "@/components/relatedProducts";
import productDetails from "@/components/productDetails";
export default {
  components: {
    relatedProduct: relatedProduct,
    productDetails: productDetails
  },
  data: () => ({
    product: null,
    relatedProducts: [],
    loading: false,
    loadingItem: false
  }),
  created() {
    this.getProductItem();
  },
  methods: {
    getProductItem() {
      this.loadingItem = true;
      axios
        .get(`products/v2/getProducts?productId=${this.$route.params.id}`)
        .then(response => {
          this.product =
            size(response.data) > 0
              ? map(response.data, item => item.product)[0]
              : null;
        })
        .finally(() => {
          this.loadingItem = false;
        });
    },
    getRelatedProducts() {
      this.loading = true;
      axios
        .get(`products/v2/getProducts`)
        .then(response => {
          if (response.data.length > 0) {
            const relatedProducts = map(
              response.data,
              item => item.product
            ).sort((a, b) => a.old_price - b.old_price);

            this.relatedProducts = Object.freeze(slice(relatedProducts, 0, 12));
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    product: {
      immediate: true,
      handler() {
        if (size(this.product)) {
          this.getRelatedProducts();
        }
      }
    }
  }
};
</script>

<style lang="scss">
.no-data-found {
  font-size: 1.286rem;
  font-weight: 900;
  line-height: 40px;
  letter-spacing: 0.35px;
}
</style>
