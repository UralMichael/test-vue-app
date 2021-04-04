<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="id"
      :search="search"
      :dense="$vuetify.breakpoint.mobile"
      :loading="loading"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageOptions: [10, 50, 100],
        itemsPerPageText: 'Пользователей на странице:',
      }"
      loading-text="Данные загружаются..."
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat dense>
          <!-- <v-text-field-->
          <!--   v-model="search"-->
          <!--   label="Поиск"-->
          <!--   class="mx-4"-->
          <!-- ></v-text-field>-->
          <v-spacer></v-spacer>
          <div class="mr-2">Показывать скрытых пользователей</div>
          <v-simple-checkbox
            v-model="hiddenUsersVisible"
            :disabled="loading"
            :ripple="false"
            color="primary"
          ></v-simple-checkbox>
        </v-toolbar>
      </template>
      <template v-slot:item.hidden="{ item }">
        <v-tooltip :open-delay="500" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :disabled="loading"
              v-bind="attrs"
              v-on="on"
              @click="onToggleUserHidden(item)"
              class="mr-2"
            >
              {{ item.hidden ? "mdi-eye-off-outline" : "mdi-eye-outline" }}
            </v-icon>
          </template>
          <span v-if="item.hidden">Сделать видимым</span>
          <span v-else>Сделать невидимым</span>
        </v-tooltip>
        <v-tooltip :open-delay="500" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :disabled="loading"
              v-bind="attrs"
              v-on="on"
              @click="onEditUser(item)"
              color="accent"
              class="mr-2"
            >
              mdi-account-edit-outline
            </v-icon>
          </template>
          <span>Редактировать данные</span>
        </v-tooltip>
        <v-tooltip :open-delay="500" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :disabled="loading"
              v-bind="attrs"
              v-on="on"
              @click="onDeleteUser(item)"
              color="red"
            >
              mdi-close-circle-outline
            </v-icon>
          </template>
          <span>Удалить из спика</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <user-edit-dialog
      v-model="userDialogVisible"
      :user="selectedUser"
      @test-user-update="onTestUserUpdate"
    ></user-edit-dialog>
  </div>
</template>

<script>
import { UserService } from "@/services/User";
import UserEditDialog from "@/components/UserEditDialog";
import { appPrompt } from "@/utils/AppPrompt";
import { getShortDateString } from "@/utils/DateUtils";
import { delay } from "@/utils/Delay";

export default {
  name: "user-data-table",
  components: {
    UserEditDialog,
  },
  data() {
    return {
      loading: false,
      userDialogVisible: false,
      hiddenUsersVisible: true,
      search: "",
      selectedUser: {},
      users: [],
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
          value: "regDateFormatted",
        },
        {
          text: "Управление",
          value: "hidden",
          sortable: false,
          filter: (value) => {
            if (this.hiddenUsersVisible) return true;
            return !value;
          },
        },
      ];
    },
  },
  async mounted() {
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      this.loading = true;
      const fetchedUsers = await UserService.getUsers();
      /* Add some computed fields for table */
      fetchedUsers.forEach((user) => {
        user.fullName = `${user.lastName} ${user.firstName} ${user.middleName}`;
        user.regDateFormatted = getShortDateString(user.regDate);
      });
      this.users = fetchedUsers;
      this.loading = false;
    },

    onEditUser(user) {
      this.selectedUser = user;
      this.userDialogVisible = true;
    },
    async onDeleteUser(passedUser) {
      const confirmed = await appPrompt(
        `Удалить пользователя (id=${passedUser.id})`,
        "Вы действительно хотите удалить пользователя?"
      );
      if (confirmed) {
        this.loading = true;
        /* API call */
        // const result = await UserService.deleteUser(passedUser.id);

        /* Отправка event в рамках ТЗ */
        this.$emit("test-user-delete", passedUser.id);
        await delay(1); // тестовая задержка
        const result = true;

        if (result) {
          this.users.splice(
            this.users.findIndex((user) => user.id === passedUser.id),
            1
          );
        }
      }
      this.loading = false;
    },
    async onToggleUserHidden(user) {
      this.loading = true;
      /* API call */
      // const result = UserService.updateUser(user.id, { hidden: user.hidden });

      /* Отправка event в рамках ТЗ */
      this.$emit("test-user-toggle-hidden", user);
      const result = true;

      if (result) {
        user.hidden = !user.hidden;
      }
      this.loading = false;
    },
    onTestUserUpdate(payload) {
      const user = this.users.find((user) => user.id === payload.id);
      const { firstName, middleName, lastName, email, hidden } = payload.data;
      user.firstName = firstName;
      user.middleName = middleName;
      user.lastName = lastName;
      user.fullName = `${lastName} ${firstName} ${middleName}`;
      user.email = email;
      user.hidden = hidden;
      this.$emit("test-user-update", user);
    },
  },
};
</script>

<style scoped></style>
