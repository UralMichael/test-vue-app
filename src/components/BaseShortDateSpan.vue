<template>
  <span>{{ shortDate }}</span>
</template>

<script>
import { getShortDateString } from "@/utils/DateUtils";

export default {
  name: "base-short-date-span",
  props: {
    date: {
      required: true,
    },
  },
  computed: {
    shortDate: function () {
      return getShortDateString(new Date(this.date));
    },
  },
};
</script>

<style scoped></style>
