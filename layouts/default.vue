<template>
  <v-app dark>
    <v-progress-linear
      :active="topLoader"
      :indeterminate="topLoader"
      absolute
      top
      color="white"
      style="z-index: 9;"
      height="2"
    ></v-progress-linear>
    <v-app-bar :clipped-left="clipped" app :height="56" flat>
      <logo />
      <v-spacer />
      <div class="body-2 mr-2 primary--text font-weight-medium">
        Hassan Mehmood
      </div>

      <v-avatar :size="35" color="primary">
        <span class="white--text font-weight-medium">H</span>
      </v-avatar>
    </v-app-bar>
    <v-main>
      <vue-perfect-scrollbar id="page-wrapper">
        <v-container fluid class="pt-0">
          <nuxt />
        </v-container>
      </vue-perfect-scrollbar>
    </v-main>
  </v-app>
</template>

<script>
import Logo from "~/components/logo.vue";
export default {
  components: {
    Logo
  },
  data() {
    return {
      clipped: false,
      title: "Hassan Mehmood",
      scrollSettings: {
        maxScrollbarLength: 160
      }
    };
  },
  computed: {
    topLoader() {
      return this.$store.getters["pageHeader/getTopLoader"];
    }
  }
};
</script>

<style lang="scss">
#page-wrapper {
  scrollbar-width: none;
  // max-height: 320px;
  overflow-x: hidden;
  max-height: calc(100vh - 54px) !important;
}
</style>
