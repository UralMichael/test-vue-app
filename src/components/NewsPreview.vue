<template>
  <div class="d-flex py-2">
    <v-avatar class="mr-2" :size="imgSize" tile>
      <v-img lazy-src="@/assets/placeholder.png" :src="news.imgUrl"></v-img>
    </v-avatar>
    <div>
      <h3 class="nli-title primary--text">{{ news.title }}</h3>
      <p v-if="textVisible">
        {{ shortText }}
      </p>
    </div>
  </div>
</template>

<script>
import { getShortDateString } from "@/utils/DateUtils";

export default {
  name: "news-preview",
  props: {
    news: {
      name: "news-item",
      type: Object,
      required: true,
    },
  },
  computed: {
    imgSize: function () {
      return this.$vuetify.breakpoint.mdAndUp ? 128 : 96;
    },
    textVisible: function () {
      // console.log(this.$vuetify.breakpoint.xs);
      return this.$vuetify.breakpoint.width >= 700;
    },
    shortText: function () {
      const limit = this.$vuetify.breakpoint.mdAndUp ? 200 : 100;
      return this.news.text.length >= limit
        ? this.news.text.slice(0, limit - 1) + "..."
        : this.news.text;
    },
    dateFormatted: function () {
      return getShortDateString(this.news.creationDate);
    },
  },
};
</script>

<style scoped>
.nli-title {
  font-size: 1rem;
  word-break: normal;
}
</style>
