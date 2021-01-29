<template>
  <v-container>
    <div>Product ID : {{ $route.params.id }}</div>
    <div>Product : {{ product }}</div>

    <v-layout v-if="product">
      <!-- <v-flex md8>
        <v-img
          :src="
            `${$imagesCDN}${product.image.hash}?quality=100&progressive=1&bg=ffffff&width=552&height=552`
          "
        ></v-img>
      </v-flex> -->

      <v-row class="product">
        <v-col cols="3">
          <v-img
            :src="
              `${$imagesCDN}${product.image.hash}?quality=100&progressive=1&bg=ffffff&width=552&height=552`
            "
          ></v-img>
        </v-col>
        <v-col cols="9">
          <div class="title">
            {{ product.name }}
          </div>
          
        </v-col>
      </v-row>
    </v-layout>
    <v-layout v-else>
      <v-flex class="text-center py-2 no-data-found">
        No product found
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { map, size } from "lodash";
export default {
  data: () => ({
    product: null
  }),
  created() {
    this.getProductItem();
  },
  methods: {
    getProductItem() {
      axios
        .get(`products/v2/getProducts?productId=${this.$route.params.id}`)
        .then(response => {
          this.product =
            size(response.data) > 0
              ? map(response.data, item => item.product)[0]
              : null;
        })
        .finally(() => {
          this.loading = false;
        });
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
