<template>
  <v-app>
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
};
</script>
