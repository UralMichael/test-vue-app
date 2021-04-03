<template>
  <v-navigation-drawer
    app
    absolute
    :permanent="!$vuetify.breakpoint.mobile"
    :clipped="!$vuetify.breakpoint.mobile"
  >
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "app-navigation-drawer",
  data() {
    return {
      items: [
        { link: "/users", title: "Пользователи", icon: "mdi-account-group" },
        { link: "/news", title: "Новости", icon: "mdi-newspaper-variant" },
      ],
    };
  },
};
</script>

<style scoped></style>
