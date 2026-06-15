/* ══════════════════════════════════════════
   ELITE COFFEE — Data Layer
   js/data.js
   ══════════════════════════════════════════ */

const KEYS = {
  rate:  'ec_rate',
  menu:  'ec_menu',
  cats:  'ec_cats',
  hours: 'ec_hours',
  wa:    'ec_wa',
  theme: 'ec_theme',
};

const DEFAULT_CATS = [
  { id: 'crepes', name: 'Crepes', icon: '🥞' },
  { id: 'pasta',  name: 'Pasta',  icon: '🍝' },
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'saj',    name: 'Saj',    icon: '🫓' },
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
  get rate()  { return parseInt(localStorage.getItem(KEYS.rate))   || 90000; },
  get waNum() { return localStorage.getItem(KEYS.wa)               || '96170270607'; },
  get cats()  { return JSON.parse(localStorage.getItem(KEYS.cats))  || DEFAULT_CATS; },
  get items() { return JSON.parse(localStorage.getItem(KEYS.menu))  || []; },
  get hours() { return JSON.parse(localStorage.getItem(KEYS.hours)) || DEFAULT_HOURS; },

  set rate(v)  { localStorage.setItem(KEYS.rate,  v); },
  set waNum(v) { localStorage.setItem(KEYS.wa,    v); },
  set cats(v)  { localStorage.setItem(KEYS.cats,  JSON.stringify(v)); },
  set items(v) { localStorage.setItem(KEYS.menu,  JSON.stringify(v)); },
  set hours(v) { localStorage.setItem(KEYS.hours, JSON.stringify(v)); },

  // ── IMAGE STORAGE ──
  saveImage(itemId, base64) {
    localStorage.setItem('ec_img_' + itemId, base64);
  },
  getImage(itemId) {
    return localStorage.getItem('ec_img_' + itemId) || null;
  },
  deleteImage(itemId) {
    localStorage.removeItem('ec_img_' + itemId);
  },
};