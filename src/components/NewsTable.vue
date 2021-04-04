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
            :disabled="loading"
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
        <div class="news-actions">
          <v-icon
            :disabled="loading"
            :color="item.mailing ? 'red' : 'green'"
            @click="onToggleNewsMailing(item)"
            class="mb-2"
          >
            {{
              item.mailing ? "mdi-email-off-outline" : "mdi-email-send-outline"
            }}
          </v-icon>
          <v-icon
            :disabled="loading"
            @click="onEditNews(item)"
            color="accent"
            class="mb-2"
          >
            mdi-file-document-edit-outline
          </v-icon>
          <v-icon :disabled="loading" @click="onDeleteNews(item)" color="red">
            mdi-close-circle-outline
          </v-icon>
        </div>
      </template>
    </v-data-table>
    <news-edit-dialog
      v-model="newsDialogVisible"
      :news="selectedNews"
      @test-news-update="onTestNewsUpdate"
    ></news-edit-dialog>
  </div>
</template>

<script>
import BaseShortDateSpan from "@/components/BaseShortDateSpan";
import NewsPreview from "@/components/NewsPreview";
import NewsEditDialog from "@/components/NewsEditDialog";
import { NewsService } from "@/services/News";
import { delay } from "@/utils/Delay";
import { appPrompt } from "@/utils/AppPrompt";

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
    async onDeleteNews(passedNews) {
      const confirmed = await appPrompt(
        `Удалить новость (id=${passedNews.id})`,
        "Вы действительно хотите удалить новость?"
      );
      if (confirmed) {
        this.loading = true;
        /* API call */
        // const result = await NewsService.deleteNews(passedNews.id);

        /* Отправка event в рамках ТЗ */
        this.$emit("test-news-delete", passedNews.id);
        await delay(1); // тестовая задержка
        const result = true;

        if (result) {
          this.news.splice(
            this.news.findIndex((news) => news.id === passedNews.id),
            1
          );
        }
      }
      this.loading = false;
    },
    async onToggleNewsMailing(news) {
      this.loading = true;
      /* API call */
      // const result = NewsService.updateNews(news.id, { mailing: !news.mailing });

      /* Отправка event в рамках ТЗ */
      this.$emit("test-news-toggle-mailing", news);
      await delay(1);
      const result = true;

      if (result) {
        news.mailing = !news.mailing;
      }
      this.loading = false;
    },
    async onEditNews(news) {
      this.selectedNews = news;
      this.newsDialogVisible = true;
    },
    onTestNewsUpdate(payload) {
      const news = this.news.find((news) => news.id === payload.id);
      const { title, text, imgUrl, mailing } = payload.data;
      news.title = title;
      news.text = text;
      news.imgUrl = imgUrl;
      news.mailing = mailing;
      this.$emit("test-news-update", news);
    },
  },
};
</script>

<style scoped>
.news-actions {
  display: flex;
  flex-direction: column;
}
</style>
