import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ru from "vuetify/lib/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: "sm",
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#3F51B5",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
    },
  },
  lang: {
    locales: { ru },
    current: "ru",
  },
});
