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
      <v-row class="product">
        <v-col cols="3">
          <v-img
            :src="
              `${$imagesCDN}${product.image.hash}?quality=100&progressive=1&bg=ffffff&width=552&height=552`
            "
          ></v-img>
        </v-col>
        <v-col cols="9">
          <div class="text-h4">
            {{ product.name }}
          </div>
          <div class="text-h6 accent--text">
            {{ product.brand ? product.brand.name : " -" }}
          </div>
          <div class="text-h6 accent--text">$ {{ product.old_price }}</div>

          <!-- Status  -->
          <div>
            <div class="pt-4 font-weight-normal">
              Status
            </div>

            <div class="font-weight-medium accent--text">
              {{ product.soldOut ? "Sold out" : "In stock" }}
            </div>
          </div>

          <!-- Conditions  -->
          <div>
            <div class="pt-4 font-weight-normal">
              Condition
            </div>

            <div class="font-weight-medium accent--text">
              {{ product.new ? "New" : "Used" }}
            </div>
          </div>

          <!-- Categories -->
          <div v-if="product.categories && product.categories.length > 0">
            <div class="pb-1 pt-4 font-weight-normal">
              Categories
            </div>

            <div class="d-flex flex-wrap" style="width:90%">
              <template v-for="cat in product.categories">
                <v-chip
                  :key="cat"
                  outlined
                  color="black"
                  class="px-2 mr-2 mt-1"
                >
                  {{ cat }}
                </v-chip>
              </template>
            </div>
          </div>
        </v-col>
      </v-row>
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
            <v-flex md2 sm3 xs6 :key="product.id" class="pa-2">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto my-12"
                  tile
                  :elevation="hover ? 5 : 1"
                  :to="{ name: 'product-id', params: { id: product.id } }"
                  color="#F5F5F5"
                >
                  <v-img
                    height="100"
                    :src="`${$imagesCDN}${product.image.hash}`"
                  ></v-img>

                  <div
                    class="font-weight-medium line-height-150 subtitle-2 pa-4 pb-2"
                  >
                    {{ product.name }}
                  </div>

                  <v-card-text class="py-0">
                    <div class="caption accent--text">
                      {{ product.brand ? product.brand.name : " -" }}
                    </div>
                  </v-card-text>
                  <v-card-text class="pt-0">
                    <div class="caption">$ {{ product.old_price }}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </template>
        </v-layout>

        <v-layout v-if="relatedProducts.length == 0 && !loading">
          <v-flex class=" body-2">
            No similar products found
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { map, size, slice } from "lodash";
export default {
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

            this.relatedProducts = slice(relatedProducts, 0, 12);
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
.product {
  .title {
    font-size: 2.286rem;
    font-weight: 900;
    line-height: 40px;
    letter-spacing: 0.35px;
  }
}
</style>
