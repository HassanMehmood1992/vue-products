<template>
  <v-flex sm6 class="mx-auto">
    <v-card class="mx-2" flat>
      <v-card-text class="pa-0">
        <v-flex class="text-center">
          <img :src="`${$appURL}gift.png`" width="100px" class="ma-3" />
          <div class="py-3 welcome primary--text">Welcome To Shophub</div>
          <div class="text-h6">Enjoy our favorite products ! Its Awesome</div>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-flex>
</template>
<style lang="scss">
.welcome {
  font-size: 2.286rem;
  font-weight: 900;
  line-height: 40px;

  letter-spacing: 0.35px;
}
</style>
