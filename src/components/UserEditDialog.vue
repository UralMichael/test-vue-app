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
                    label="Скрытый пользователь"
                    v-model="hidden"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <v-alert v-model="isError" dismissible type="error">{{
              errorMessage
            }}</v-alert>
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
      isError: false,
      isLoading: false,
      errorMessage: "",
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
      return getShortDateString(this.user.registrationDate);
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
  mounted() {
    console.log("user dialog mounted");
  },
  methods: {
    showErrorMessage(message) {
      this.errorMessage = message;
      this.isError = true;
    },
    showLoading() {
      this.isLoading = true;
      this.isError = false;
    },
    hideLoading() {
      this.isLoading = false;
    },
    closeDialog() {
      this.errorMessage = "";
      this.isError = false;
      this.isLoading = false;
      this.$emit(EVENT_VISIBILITY, false);
    },
    async onSave() {
      if (!this.$refs.editUserForm.validate()) {
        return;
      }
      this.showLoading();
      this.showErrorMessage("Ошибка сервера");
      this.closeDialog();
    },
    onClose() {
      this.closeDialog();
    },
  },
};
</script>

<style scoped></style>
