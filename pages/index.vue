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
    <div style="margin: 20px;">
      {{ items[0] }}
    </div>
    <v-layout row wrap class="" v-if="items.length > 0">
      <template v-for="product in items">
        <v-flex md3 :key="product.id" class=" pa-2">
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

              <!-- <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="reserve">
                Reserve
              </v-btn>
            </v-card-actions> -->
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
    <!-- <v-layout row wrap v-for="product in items" :key="product.id">
      <v-flex md6>
        Name: {{ product.name }} Brand:
        {{ product.brand ? product.brand.name : " -" }} Price:
        {{ product.old_price }}
      </v-flex>
      <v-flex md6 :key="product.id">
        <img :src="`${$imagesCDN}${product.image.hash}`" height="90px" />
      </v-flex>
    </v-layout> -->
  </v-container>
</template>

<script>
import Welcome from "@/components/welcome.vue";
import { map } from "lodash";

export default {
  components: {
    Welcome
  },
  data: () => ({
    items: [],
    loading: false
  }),
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
            this.items = map(response.data, item => item.product).sort(
              (a, b) => a.old_price - b.old_price
            );
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss">
.line-height-150 {
  line-height: 1.5rem !important;
}
</style>
