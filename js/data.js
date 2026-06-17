/* ======================================
   DOPAMINE -- Data Layer
   js/data.js
   ====================================== */

const K = { rate: 'ec_rate', menu: 'ec_menu', cats: 'ec_cats', hours: 'ec_hours', wa: 'ec_wa' };

const DEFAULT_CATS = [
  { id: 'crepes', name: 'Crepes', icon: 'Crepes' },
  { id: 'pasta',  name: 'Pasta',  icon: 'Pasta' },
  { id: 'coffee', name: 'Coffee', icon: 'Coffee' },
  { id: 'saj',    name: 'Saj',    icon: 'Saj' },
];

const DEFAULT_HOURS = [
  { day: 'Monday',    open: '08:00', close: '22:00', closed: false },
  { day: 'Tuesday',   open: '08:00', close: '22:00', closed: false },
  { day: 'Wednesday', open: '08:00', close: '22:00', closed: false },
  { day: 'Thursday',  open: '08:00', close: '22:00', closed: false },
  { day: 'Friday',    open: '08:00', close: '23:00', closed: false },
  { day: 'Saturday',  open: '09:00', close: '23:00', closed: false },
  { day: 'Sunday',    open: '09:00', close: '22:00', closed: false },
];

const Data = {
  get rate()  { return parseInt(localStorage.getItem(K.rate))   || 90000; },
  get waNum() { return localStorage.getItem(K.wa)               || '96170270607'; },
  get cats()  { return JSON.parse(localStorage.getItem(K.cats))  || DEFAULT_CATS; },
  get items() { return JSON.parse(localStorage.getItem(K.menu))  || []; },
  get hours() { return JSON.parse(localStorage.getItem(K.hours)) || DEFAULT_HOURS; },
  set rate(v)  { localStorage.setItem(K.rate,  v); },
  set waNum(v) { localStorage.setItem(K.wa,    v); },
  set cats(v)  { localStorage.setItem(K.cats,  JSON.stringify(v)); },
  set items(v) { localStorage.setItem(K.menu,  JSON.stringify(v)); },
  set hours(v) { localStorage.setItem(K.hours, JSON.stringify(v)); },
  saveImage(id, b64) { localStorage.setItem('ec_img_' + id, b64); },
  getImage(id)       { return localStorage.getItem('ec_img_' + id) || null; },
  deleteImage(id)    { localStorage.removeItem('ec_img_' + id); },
};
