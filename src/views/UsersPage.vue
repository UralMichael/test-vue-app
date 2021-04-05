<template>
  <section class="pa-sm-4 pa-md-4 text-center">
    <h2 class="ma-2">Данные пользователей</h2>
    <user-data-table
      @test-user-delete="onTestUserDelete"
      @test-user-update="onTestUserUpdate"
      @test-user-toggle-hidden="onTestUserToggle"
      class="mb-2"
    ></user-data-table>
  </section>
</template>

<script>
import UserDataTable from "@/components/UsersTable";

export default {
  components: {
    UserDataTable,
  },
  methods: {
    onTestUserDelete(id) {
      console.log(`Удален пользователь с id = ${id}`);
    },
    onTestUserUpdate(user) {
      console.log(`Обновлен пользователь с id = ${user.id}`);
      console.log(user);
    },
    onTestUserToggle(user) {
      console.log(`Изменена видимость пользователя с id = ${user.id}`);
      console.log(user.hidden);
    },
  },
};
</script>

<style scoped></style>
