<template>
  <v-app-bar app color="primary" dark clipped-left dense>
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mobile"></v-app-bar-nav-icon>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
    </div>
    <v-app-bar-title>Приложение</v-app-bar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-top-bar",
};
</script>

<style scoped></style>
