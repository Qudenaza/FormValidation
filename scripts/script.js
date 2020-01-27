// ПЕРЕМЕННЫЕ
const inputs = document.querySelectorAll('.js-input'),
  submit = document.querySelector('.js-form-submit');


function CustomValidation() { }

CustomValidation.prototype = {

  errorMessage: '',

  checkValidity: function (input) {

    const validity = input.validity;

    if (validity.valueMissing) {
      this.errorMessage = 'Поле не должно быть пустым';
    }

    if (validity.patternMismatch) {
      this.errorMessage = 'Заполните поле в правильном формате';
    }
  },

  getErrorMessage: function () {
    return this.errorMessage;
  }
};

function addErrorElement(message) {
  const p = document.createElement('p');

  p.className = 'form__error js-error-message';

  p.textContent = message;

  return p;
};

function removeErrorElement(el) {
  el.parentElement.querySelector('.js-error-message').remove();
}

function showInputError(obj, input) {
  const customValidityMessage = obj.getErrorMessage();

  input.parentElement.appendChild(addErrorElement(customValidityMessage));

  input.classList.add('has-error');

  disableSubmitButton();

  setTimeout(function () {
    removeErrorElement(input);

    input.classList.remove('has-error');

    enableSubmitButton();
  }, 2000);
};

function disableSubmitButton() {
  submit.disabled = true;
}

function enableSubmitButton() {
  submit.disabled = false;
}

submit.addEventListener('click', function (e) {
  let stopSubmit = false;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    if (input.checkValidity() === false) {
      const inputCustomValidation = new CustomValidation();

      inputCustomValidation.checkValidity(input);

      showInputError(inputCustomValidation, input);

      stopSubmit = true;
    };
  };

  if (stopSubmit) {
    e.preventDefault();
  }
});