<template>
  <v-app v-resize="onResize">
    <app-top-bar></app-top-bar>
    <app-navigation-drawer></app-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <app-prompt></app-prompt>
  </v-app>
</template>

<script>
import AppTopBar from "@/components/AppTopBar";
import AppNavigationDrawer from "@/components/AppNavigationDrawer";
import AppPrompt from "@/components/AppPrompt";

export default {
  name: "App",
  components: {
    AppTopBar,
    AppNavigationDrawer,
    AppPrompt,
  },
  beforeMount() {
    this.setRootFont();
  },
  methods: {
    setRootFont() {
      const rootEl = document.querySelector(":root");
      const rootFontSize = window
        .getComputedStyle(rootEl)
        .getPropertyValue("font-size");
      console.log();
      if (this.$vuetify.breakpoint.mdAndUp && rootFontSize !== "16px") {
        rootEl.style.fontSize = "16px";
      }
      if (
        !this.$vuetify.breakpoint.xs &&
        this.$vuetify.breakpoint.smAndDown &&
        rootFontSize !== "14px"
      ) {
        rootEl.style.fontSize = "14px";
      }
      if (this.$vuetify.breakpoint.xs && rootFontSize !== "12px") {
        rootEl.style.fontSize = "12px";
      }
    },
    onResize() {
      this.setRootFont();
    },
  },
};
</script>
