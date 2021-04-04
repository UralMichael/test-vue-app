<template>
  <v-app-bar app flat color="primary" dark clipped-left dense>
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mobile"
      @click="onToggleDrawer"
    ></v-app-bar-nav-icon>
    <div class="d-flex align-center">
      <v-img
        alt="Vue Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo.svg"
        transition="scale-transition"
        width="40"
      />
    </div>
    <v-app-bar-title>Приложение</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-icon @click="onToggleDarkMode">mdi-theme-light-dark</v-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-top-bar",
  methods: {
    onToggleDrawer() {
      this.$emit("toggle-drawer");
    },
    onToggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style scoped></style>
