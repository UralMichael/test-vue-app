<template>
  <v-dialog persistent v-model="showPrompt" max-width="512">
    <v-card>
      <v-toolbar color="warning" dark flat dense class="mb-2">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="body-1">{{ message }}</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="warning" class="mx-4" @click="onBtnClick(true)">ОК</v-btn>
        <v-btn class="mx-4" @click="onBtnClick(false)">Отмена</v-btn>
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
