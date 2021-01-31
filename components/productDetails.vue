<template>
  <v-row class="product">
    <v-col cols="3">
      <v-img
        :src="
          `${$imagesCDN}${product.image.hash}?quality=100&progressive=1&bg=ffffff&width=552&height=552`
        "
        :lazy-src="
          `${$imagesCDN}${product.image.hash}?quality=100&progressive=1&bg=ffffff&width=552&height=552`
        "
      ></v-img>
    </v-col>
    <v-col cols="9">
      <div>
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
              <v-chip :key="cat" outlined color="black" class="px-2 mr-2 mt-1">
                {{ cat }}
              </v-chip>
            </template>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["product"]
};
</script>

<style lang="scss">
.product {
  .title {
    font-size: 2.286rem;
    font-weight: 900;
    line-height: 40px;
    letter-spacing: 0.35px;
  }
}
</style>
