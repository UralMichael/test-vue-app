<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="news"
      item-key="id"
      :search="search"
      :dense="$vuetify.breakpoint.mobile"
      :mobile-breakpoint="0"
      :loading="loading"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageOptions: [10, 50, 100],
        itemsPerPageText: 'Новостей на странице:',
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
          <v-subheader>Показывать:</v-subheader>
          <v-select
            v-model="visibleType"
            :items="selectType"
            item-value="key"
            item-text="text"
            style="max-width: 192px"
            hide-details
          >
          </v-select>
        </v-toolbar>
      </template>
      <template v-slot:item.creationDate="{ item }">
        <base-short-date-span :date="item.creationDate"></base-short-date-span>
      </template>
      <template v-slot:item.title="{ item }">
        <news-preview :news="item"></news-preview>
      </template>
      <template v-slot:item.mailing="{ item }">
        <v-icon
          :disabled="loading"
          :color="item.mailing ? 'red' : 'green'"
          @click="onToggleNewsMailing(item)"
          class="mr-2"
        >
          {{
            item.mailing ? "mdi-email-off-outline" : "mdi-email-send-outline"
          }}
        </v-icon>
        <v-icon :disabled="loading" @click="onEditNews(item)" color="accent">
          mdi-file-document-edit-outline
        </v-icon>
      </template>
    </v-data-table>
    <news-edit-dialog
      v-model="newsDialogVisible"
      :news="selectedNews"
    ></news-edit-dialog>
  </div>
</template>

<script>
import BaseShortDateSpan from "@/components/BaseShortDateSpan";
import NewsPreview from "@/components/NewsPreview";
import NewsEditDialog from "@/components/NewsEditDialog";
import { NewsService } from "@/services/News";

export default {
  name: "news-table",
  components: {
    BaseShortDateSpan,
    NewsEditDialog,
    NewsPreview,
  },
  computed: {
    headers() {
      return [
        {
          text: "Новость",
          sortable: true,
          value: "title",
        },
        {
          text: "Создана",
          sortable: true,
          value: "creationDate",
        },
        {
          text: "Управление",
          value: "mailing",
          sortable: false,
          filter: (value) => {
            let result;
            switch (this.visibleType) {
              case "mailing": {
                result = value;
                break;
              }
              case "disabled": {
                result = !value;
                break;
              }
              case "all":
              default: {
                result = true;
                break;
              }
            }
            return result;
          },
        },
      ];
    },
  },
  data: () => ({
    loading: false,
    newsDialogVisible: false,
    search: "",
    news: [],
    selectedNews: {},
    visibleType: "all",
    selectType: [
      { key: "all", text: "Все" },
      { key: "mailing", text: "Активные" },
      { key: "disabled", text: "Остановленные" },
    ],
  }),
  async mounted() {
    await this.getManyNews();
  },
  methods: {
    async getManyNews() {
      this.loading = true;
      this.news = await NewsService.getManyNews();
      this.loading = false;
    },
    async onToggleNewsMailing(news) {
      news.mailing = !news.mailing;
    },
    async onEditNews(news) {
      this.selectedNews = news;
      this.newsDialogVisible = true;
    },
  },
};
</script>

<style scoped></style>
