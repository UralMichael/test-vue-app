const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_ALLOWED_SYMBOLS_REGEXP = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;
const NAME_LETTER_PRESENT_REGEXP = /[a-zA-Zа-яА-ЯёЁ]/;

export default {
  Required: (value) => !!value || "Обязательное поле.",
  MinLength: (minLength) => {
    return (value) => {
      if (!value?.length) return "Пустая строка";
      return (
        value.length >= minLength || "Минимальная длина строки " + minLength
      );
    };
  },
  MaxLength: (maxLength) => {
    return (value) => {
      if (!value?.length) return "Пустая строка";
      return (
        value.length <= maxLength || "Максимальная длина строки " + maxLength
      );
    };
  },
  // TODO ref validation check if no letters
  Name: (value) => {
    if (!value?.length) return "Пустая строка";
    return (
      (NAME_LETTER_PRESENT_REGEXP.test(value) &&
        NAME_ALLOWED_SYMBOLS_REGEXP.test(value)) ||
      "Недопустимый формат имени"
    );
  },
  // TODO ref email validation
  Email: (value) => {
    if (!value?.length) return "Пустая строка";
    return EMAIL_REGEXP.test(value) || "Неккоректный Email";
  },
};
