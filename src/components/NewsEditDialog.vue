<template>
  <v-row justify="center">
    <v-dialog v-model="visible" fullscreen persistent max-width="600px">
      <v-card>
        <v-toolbar flat dense dark color="primary">
          <v-toolbar-title>Редактировать новость</v-toolbar-title>
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
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
            ref="editNewsForm"
            v-model="formValid"
            :disabled="loading"
            lazy-validation
          >
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <span class="body-1">ID: {{ id }}</span>
                </v-col>
                <v-col cols="12" sm="6" class="body-1">
                  Создана:
                  <base-short-date-span
                    :date="creationDate"
                  ></base-short-date-span>
                </v-col>
                <v-col cols="12">
                  <h3>Заголовок:</h3>
                  <v-textarea
                    v-model="title"
                    :rules="titleRules"
                    @click:clear="title = ''"
                    rows="2"
                    dense
                    clearable
                    no-resize
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <h3>Текст:</h3>
                  <v-textarea
                    v-model="text"
                    :rules="textRules"
                    @click:clear="text = ''"
                    rows="8"
                    dense
                    clearable
                    no-resize
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-avatar class="mr-8" :size="imgSize" tile>
                    <v-img :src="imgUrl"></v-img>
                  </v-avatar>
                  <v-file-input
                    v-model="newImage"
                    @change="onFileChange"
                    label="Изображение"
                    prepend-icon="mdi-file-image-outline"
                    show-size
                  ></v-file-input>
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
            :disabled="!formValid || loading"
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
import BaseShortDateSpan from "@/components/BaseShortDateSpan";
import Rules from "@/utils/ValidationRules";
// import { NewsService } from "@/services/User";
import { delay } from "@/utils/Delay";

const EVENT_VISIBILITY = "show-news-dialog";

export default {
  name: "news-edit-dialog",
  components: {
    BaseShortDateSpan,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    news: {
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
      title: "",
      text: "",
      imgUrl: "",
      newImage: null,
      mailing: false,
      formValid: false,
      formMessage: "",
      formMessageVisible: false,
      formMessageType: "error",
      loading: false,
      titleRules: [Rules.Required, Rules.MaxLength(96)],
      textRules: [Rules.Required],
    };
  },
  /* For readonly fields */
  computed: {
    id: function () {
      return this.news.id;
    },
    creationDate: function () {
      return this.news.creationDate;
    },
    imgSize: function () {
      return this.$vuetify.breakpoint.mdAndUp ? 128 : 96;
    },
  },
  /* For editable fields */
  watch: {
    visible: function (newVal) {
      /* If dialog appears */
      if (newVal) {
        /* Copy values from prop */
        const { title, text, imgUrl, mailing } = this.news;
        this.title = title;
        this.text = text;
        this.imgUrl = imgUrl;
        this.mailing = mailing;
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
      this.loading = true;
      this.formMessageVisible = false;
    },
    hideLoading() {
      this.loading = false;
    },
    closeDialog() {
      this.formMessage = "";
      this.formMessageVisible = false;
      this.loading = false;
      this.$emit(EVENT_VISIBILITY, false);
    },
    onFileChange() {
      console.log(this.newImage);
      if (this.newImage) {
        this.imgUrl = URL.createObjectURL(this.newImage);
      }
    },
    async onSave() {
      if (!this.$refs.editNewsForm.validate()) {
        return;
      }
      this.showLoading();
      const newsId = this.id;
      const data = {
        title: this.title.trim(),
        text: this.text.trim(),
        mailing: this.mailing,
      };
      /* API call */
      // const response = await NewsService.updateNews(newsId, payload);

      /* Отправка event в рамках ТЗ */
      this.$emit("test-news-update", { id: newsId, data });
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
