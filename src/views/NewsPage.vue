<template>
  <section class="pa-sm-4 pa-md-4">
    <h1>This is a news page</h1>
    <news-table></news-table>
  </section>
</template>

<script>
import NewsTable from "@/components/NewsTable";
export default {
  name: "News",
  components: {
    NewsTable,
  },
};
</script>

<style scoped></style>
