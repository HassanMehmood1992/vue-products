<template>
  <v-app dark>
    <v-progress-linear
      :active="topLoader"
      :indeterminate="topLoader"
      absolute
      top
      color="grey"
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
      <vue-perfect-scrollbar
        id="page-wrapper"
        @ps-scroll-y="onScroll"
        @ps-y-reach-end="reachEnd"
      >
        <v-container fluid class="pt-0">
          <nuxt />
        </v-container>
      </vue-perfect-scrollbar>
    </v-main>

    <v-layout column align-center class="fab-container">
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            fab="fab"
            small
            v-show="!onTop"
            color="primary"
            v-on="on"
            @click="toTop"
            class="toTopBtn"
          >
            <v-icon color="white">mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <span>Scroll to Top</span>
      </v-tooltip>
    </v-layout>
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
      },
      onTop: true
    };
  },
  methods: {
    toTop() {
      let options = { container: "#page-wrapper" };
      this.$scrollTo("#page-wrapper", options);
      this.ontop = true;
    },
    onScroll() {
      let elmnt = document.getElementById("page-wrapper");
      this.onTop = elmnt.scrollTop == 0 ? true : false;
      this.$store.dispatch("scrollEvents/setEvent", {
        name: "reachedEnd",
        value: false
      });
      this.$store.dispatch("scrollEvents/setEvent", {
        name: "scrollY",
        value: true
      });
    },

    reachEnd() {
      this.$store.dispatch("scrollEvents/setEvent", {
        name: "reachedEnd",
        value: true
      });
    }
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
.toTopBtn.v-btn--bottom:not(.v-btn--absolute) {
  bottom: 24px;
  margin-right: 37px !important;
  z-index: 999;
}
.fab-container {
  position: fixed;
  bottom: 10px;
  right: 35px !important;
}
</style>
