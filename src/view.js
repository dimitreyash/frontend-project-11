import { subscribe } from 'valtio/vanilla';

const render = (state, elements) => {
  const { input, feedback } = elements;

  if (state.form.status === 'invalid') {
    input.classList.add('is-invalid');
    feedback.textContent = state.form.error;
    return;
  }

  input.classList.remove('is-invalid');
  feedback.textContent = '';
};

export default (state, elements) => {
  subscribe(state, () => render(state, elements));
};