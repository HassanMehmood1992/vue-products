<template>
  <v-flex md2 sm3 xs6 :key="product.id" class="pa-2">
    <v-hover v-slot:default="{ hover }">
      <v-card
        class="mx-auto my-12"
        tile
        :elevation="hover ? 5 : 1"
        :to="{ name: 'product-id', params: { id: product.id } }"
        color="#F5F5F5"
      >
        <v-img height="100" :src="`${$imagesCDN}${product.image.hash}`"></v-img>

        <div class="font-weight-medium line-height-150 subtitle-2 pa-4 pb-2">
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

<script>
export default {
  props: ["product"]
};
</script>
