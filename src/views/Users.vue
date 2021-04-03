<template>
  <div class="pa-sm-4 pa-md-8 text-center">
    <h2>Данные пользователей</h2>
    <div>
      <v-data-table
        :headers="headers"
        :items="users"
        item-key="id"
        class="elevation-1"
        :search="search"
        :footer-props="{
          showFirstLastPage: true,
          itemsPerPageOptions: [10, 50, 100, -1],
          itemsPerPageText: 'Пользователей на странице:',
        }"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Поиск"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip :open-delay="500" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-if="item.hidden" class="mr-2" v-bind="attrs" v-on="on">
                mdi-eye-off-outline
              </v-icon>
              <v-icon v-else class="mr-2" v-bind="attrs" v-on="on">
                mdi-eye-outline
              </v-icon>
            </template>
            <span v-if="item.hidden">Сделать видимым</span>
            <span v-else>Сделать невидимым</span>
          </v-tooltip>
          <v-tooltip :open-delay="500" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" v-bind="attrs" v-on="on">
                mdi-account-edit-outline
              </v-icon>
            </template>
            <span>Редактировать данные</span>
          </v-tooltip>
          <v-tooltip :open-delay="500" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="onDeleteUser"
              >
                mdi-close-circle-outline
              </v-icon>
            </template>
            <span>Удалить из спика</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { appPrompt } from "@/utils/app-prompt";

export default {
  components: {},
  data() {
    return {
      showDeleteDialog: false,
      search: "",
      users: [
        {
          id: "1232",
          fullName: "Иванов Иван Иванович",
          email: "ivanov.i.i@mail.ru",
          registrationDate: 2021,
          hidden: false,
        },
        {
          id: "3332",
          fullName: "Петров Сан Саныч",
          email: "petrov@mail.ru",
          registrationDate: 2020,
          hidden: true,
        },
      ],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "ID",
          sortable: true,
          value: "id",
        },
        {
          text: "ФИО",
          sortable: true,
          value: "fullName",
        },
        {
          text: "E-mail",
          sortable: true,
          value: "email",
        },
        {
          text: "Дата регистрации",
          sortable: true,
          value: "registrationDate",
        },
        {
          text: "Управление",
          value: "actions",
          sortable: false,
        },
      ];
    },
  },
  methods: {
    test(item) {
      item.hidden = !item.hidden;
      console.log(item);
    },
    async onDeleteUser() {
      const answer = await appPrompt(
        "Удалить пользователя",
        "Вы действительно хотите удалить пользователя?"
      );
      if (answer) {
        console.log("Deleted");
      } else {
        console.log("Rejected");
      }
    },
  },
};
</script>

<style scoped></style>
