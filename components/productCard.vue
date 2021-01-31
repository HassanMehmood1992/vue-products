<template>
  <v-flex md3 sm4 xs6 class=" pa-2">
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
          :lazy-src="`${$imagesCDN}${product.image.hash}`"
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

<script>
export default {
  props: ["product"]
};
</script>
<style lang="scss">
.line-height-150 {
  line-height: 1.5rem !important;
}
</style>
