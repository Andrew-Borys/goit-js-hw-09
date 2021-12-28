import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector(' [data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', timer);

const current = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    const selectedDate = selectedDates[0].getTime();

    selectedDate <= currentDate
      ? Notify.failure('Please choose a date in the future')
      : (refs.startBtn.disabled = false);
  },
});

function timer() {
  const startTime = refs.input.value;
  document.querySelector('[data-start]').disabled = true;

  setInterval(() => {
    const currentTime = Date.now();
    const xTime = Date.parse(startTime) - currentTime;
    const convertedTime = convertMs(xTime);

    updateTimerFace(convertedTime);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.innerText = `${days}`;
  refs.hours.innerText = `${hours}`;
  refs.minutes.innerText = `${minutes}`;
  refs.seconds.innerText = `${seconds}`;
}
