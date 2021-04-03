import { AppEventBus } from "@/AppEventBus";

export function appPrompt(title, message) {
  return new Promise(function (resolve) {
    if (!title) {
      title = "Внимание";
    }
    if (!message) {
      message = "Подтвердите действие";
    }
    /* Invoke prompt component */
    AppEventBus.$emit("app-prompt-invoke", { title, message });
    /* Listen to answer from prompt component */
    AppEventBus.$on("app-prompt-resolve", (payload) => {
      resolve(payload);
      AppEventBus.$off("app-prompt-resolve");
    });
  });
}
