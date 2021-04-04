<template>
  <section class="pa-sm-4 pa-md-4">
    <h1>This is a news page</h1>
    <news-table
      @test-news-delete="onTestNewsDelete"
      @test-news-update="onTestNewsUpdate"
      @test-news-toggle-mailing="onTestNewsToggle"
    ></news-table>
  </section>
</template>

<script>
import NewsTable from "@/components/NewsTable";
export default {
  name: "News",
  components: {
    NewsTable,
  },
  methods: {
    onTestNewsDelete(id) {
      console.log(`Удален новость с id = ${id}`);
    },
    onTestNewsUpdate(news) {
      console.log(`Обновлена новость с id = ${news.id}`);
      console.log(news);
    },
    onTestNewsToggle(news) {
      console.log(`Изменено состояние рассылки новости с id = ${news.id}`);
      console.log(news.mailing);
    },
  },
};
</script>

<style scoped></style>
