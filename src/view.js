import { subscribe } from 'valtio/vanilla';

const render = (state, elements, i18n) => {
  const { input, feedback } = elements;

  if (state.form.status === 'invalid') {
    input.classList.add('is-invalid');
    feedback.textContent = i18n.t(state.form.error);
    return;
  }

  input.classList.remove('is-invalid');
  feedback.textContent = '';
};

export default (state, elements, i18n) => {
  subscribe(state, () => render(state, elements, i18n));
};