<template>
  <v-row justify="center">
    <v-dialog
      v-model="visible"
      :fullscreen="$vuetify.breakpoint.mobile"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar flat dense dark color="primary">
          <v-toolbar-title>Изменить данные пользователя</v-toolbar-title>
          <v-progress-linear
            :active="isLoading"
            :indeterminate="isLoading"
            absolute
            bottom
            color="deep-purple accent-4"
          ></v-progress-linear>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="editUserForm"
            v-model="isFormValid"
            :disabled="isLoading"
            lazy-validation
          >
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <span class="body-1">ID: {{ id }}</span>
                </v-col>
                <v-col cols="12" sm="6">
                  <span class="body-1"
                    >Дата регистрации: {{ registrationDate }}</span
                  >
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Имя"
                    v-model="firstName"
                    :rules="nameRules"
                    counter
                    maxlength="96"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Отчество"
                    v-model="middleName"
                    :rules="nameRules"
                    counter
                    maxlength="96"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Фамилия"
                    v-model="lastName"
                    :rules="nameRules"
                    counter
                    maxlength="96"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="emailRules"
                    counter
                    maxlength="96"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="hidden"
                    label="Скрытый пользователь"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <v-alert
              v-model="formMessageVisible"
              :type="formMessageType"
              dismissible
            >
              {{ formMessage }}
            </v-alert>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            color="primary"
            :disabled="!isFormValid || isLoading"
            @click="onSave"
            >Сохранить</v-btn
          >
          <v-btn @click="onClose">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Rules from "@/utils/ValidationRules";
import { getShortDateString } from "@/utils/DateUtils";
// import { UserService } from "@/services/User";
import { delay } from "@/utils/Delay";

const EVENT_VISIBILITY = "set-user-dialog-visibility";

export default {
  name: "user-edit-dialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  model: {
    prop: "visible",
    event: EVENT_VISIBILITY,
  },
  data() {
    return {
      firstName: this.user.firstName,
      middleName: this.user.middleName,
      lastName: this.user.lastName,
      email: this.user.email,
      hidden: this.user.hidden,
      isFormValid: false,
      formMessage: "",
      formMessageVisible: false,
      formMessageType: "error",
      isLoading: false,
      nameRules: [Rules.Required, Rules.MaxLength(96), Rules.Name],
      emailRules: [Rules.Required, Rules.MaxLength(96), Rules.Email],
    };
  },
  /* For readonly fields */
  computed: {
    id: function () {
      return this.user.id;
    },
    registrationDate: function () {
      return getShortDateString(this.user.regDate);
    },
  },
  /* For editable fields */
  watch: {
    visible: function (newVal) {
      /* If dialog appears */
      if (newVal) {
        /* Copy values from prop */
        this.firstName = this.user.firstName;
        this.middleName = this.user.middleName;
        this.lastName = this.user.lastName;
        this.email = this.user.email;
        this.hidden = this.user.hidden;
      }
    },
  },
  methods: {
    showErrorMessage(message) {
      this.formMessage = message;
      this.formMessageType = "error";
      this.formMessageVisible = true;
    },
    showSuccessMessage() {
      this.formMessage = "Данные обновлены";
      this.formMessageType = "success";
      this.formMessageVisible = true;
    },
    showLoading() {
      this.isLoading = true;
      this.formMessageVisible = false;
    },
    hideLoading() {
      this.isLoading = false;
    },
    closeDialog() {
      this.formMessage = "";
      this.formMessageVisible = false;
      this.isLoading = false;
      this.$emit(EVENT_VISIBILITY, false);
    },
    async onSave() {
      if (!this.$refs.editUserForm.validate()) {
        return;
      }
      this.showLoading();
      const userId = this.id;
      const data = {
        firstName: this.firstName.trim(),
        middleName: this.middleName.trim(),
        lastName: this.lastName.trim(),
        email: this.email.trim(),
        hidden: this.hidden,
      };
      /* API call */
      // const response = await UserService.updateUser(userId, payload);

      /* Отправка event в рамках ТЗ */
      this.$emit("test-user-update", { id: userId, data });
      await delay(1); // тестовая задержка
      const response = true;

      this.hideLoading();
      if (response === true) {
        this.showSuccessMessage();
      } else {
        this.showErrorMessage(response || "Ошибка сервера");
      }
    },
    onClose() {
      this.closeDialog();
    },
  },
};
</script>

<style scoped></style>
