<template>
  <v-dialog persistent v-model="showPrompt">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onBtnClick(true)">Ок</v-btn>
        <v-btn @click="onBtnClick(false)">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { AppEventBus } from "@/AppEventBus";

export default {
  name: "app-prompt",
  data: () => ({
    showPrompt: false,
    title: "",
    message: "",
  }),
  created() {
    AppEventBus.$on("app-prompt-invoke", (payload) => {
      this.title = payload.title || "Внимание";
      this.message = payload.message || "Данное действие нельзя отменить";
      this.showPrompt = true;
    });
  },
  beforeDestroy() {
    AppEventBus.$off("app-prompt-invoke");
  },
  methods: {
    onBtnClick: function (value) {
      this.showPrompt = false;
      AppEventBus.$emit("app-prompt-resolve", value);
    },
  },
};
</script>
<style scoped></style>
