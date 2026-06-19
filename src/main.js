import * as yup from "yup";
import { proxy } from "valtio/vanilla";
import "./style.css";
import initView from "./view.js";
import i18next from "i18next";
import resources from "./locales.js";

yup.setLocale({
  mixed: {
    required: "validation.required",
    notOneOf: "validation.notOneOf",
  },
  string: {
    url: "validation.url",
  },
});

const validateUrl = (url, feeds) => {
  const schema = yup.string().required().url().notOneOf(feeds);

  return schema.validate(url);
};

const app = () => {
  const state = proxy({
    feeds: [],
    form: {
      status: "filling",
      error: "",
    },
  });

  const elements = {
    form: document.querySelector(".rss-form"),
    input: document.querySelector("#rss-input"),
    feedback: document.querySelector(".feedback"),
  };

  initView(state, elements, i18next);

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const url = formData.get("url").trim();

    validateUrl(url, state.feeds)
      .then(() => {
        state.feeds.push(url);
        state.form.status = "valid";
        state.form.error = "";

        elements.form.reset();
        elements.input.focus();
      })
      .catch((error) => {
        state.form.status = "invalid";
        state.form.error = error.message;
      });
  });
};
i18next
  .init({
    lng: "ru",
    debug: false,
    resources,
  })
  .then(() => app());
