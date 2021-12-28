import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const refs = {
  formPromise: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
  submitBtn: document.querySelector('button'),
};

refs.formPromise.addEventListener('submit', makePromise);

let formValue = {};

function makePromise(e) {
  e.preventDefault();

  formValue = {
    delay: refs.inputDelay.value,
    step: refs.inputStep.value,
    amount: refs.inputAmount.value,
  };

  let delayNumber = Number(formValue.delay);
  let stepNumber = Number(formValue.step);
  let amountNumber = Number(formValue.amount);

  console.log('click on btn submit');
  resultPromises(delayNumber, stepNumber, amountNumber);
}

function createPromise(position, delay) {
  console.log('log in fn create promise');

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    console.log('log from new promise');

    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}

function resultPromises(delayNumber, stepNumber, amountNumber) {
  let counter = 0;
  for (let i = delayNumber; i < 1000000; i += delayNumber) {
    setTimeout(() => {
      counter += 1;
      if (counter > amountNumber) {
        return;
      } else if (counter < 2) {
        createPromise(counter, delayNumber)
          .then(result => Notiflix.Notify.success(`${result}`))
          .catch(result => Notiflix.Notify.failure(`${result}`));
      } else {
        const stepValue = (delayNumber += stepNumber);
        createPromise(counter, stepValue)
          .then(result => Notiflix.Notify.success(`${result}`))
          .catch(result => Notiflix.Notify.failure(`${result}`));
      }
    }, i);
  }
}
