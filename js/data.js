/* ======================================
   DOPAMINE -- Firebase Data Layer
   js/data.js
   ====================================== */

const firebaseConfig = {
  apiKey: "AIzaSyAc3cJatfUEAi9TcefQNqkqaf6zZZskJaA",
  authDomain: "dopamine-da9ef.firebaseapp.com",
  projectId: "dopamine-da9ef",
  storageBucket: "dopamine-da9ef.firebasestorage.app",
  messagingSenderId: "198256056016",
  appId: "1:198256056016:web:3a4e943c3c4372730d5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const DEFAULT_CATS = [
  { id: 'crepes',    name: 'Crepes' },
  { id: 'desserts',  name: 'Desserts' },
  { id: 'smoothies', name: 'Smoothies' },
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
  rate: 90000,
  waNum: '96170270607',
  cats: [],
  items: [],
  hours: DEFAULT_HOURS,
  images: {},

  catsLoaded: false,
  itemsLoaded: false,
  hoursLoaded: false,

  getImage(id) { return this.images[id] || null; },

  _notify() {
    if (window.Menu && typeof Menu.onDataChange === 'function') {
      Menu.onDataChange();
    }
    if (window.Hours && typeof Hours.render === 'function') {
      Hours.render();
    }
  },

  init() {
    db.collection('settings').doc('main').onSnapshot(doc => {
      if (doc.exists) {
        const d = doc.data();
        this.rate = d.rate || 90000;
        this.waNum = d.waNum || '96170270607';
      } else {
        db.collection('settings').doc('main').set({ rate: 90000, waNum: '96170270607' });
      }
      this._notify();
    });

    db.collection('categories').orderBy('order').onSnapshot(snap => {
      if (snap.empty) {
        DEFAULT_CATS.forEach((c, i) =>
          db.collection('categories').doc(c.id).set({ name: c.name, order: i })
        );
        return;
      }
      this.cats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      this.catsLoaded = true;
      this._notify();
    });

    db.collection('settings').doc('hours').onSnapshot(doc => {
      if (doc.exists) {
        this.hours = doc.data().days || DEFAULT_HOURS;
      } else {
        db.collection('settings').doc('hours').set({ days: DEFAULT_HOURS });
      }
      this.hoursLoaded = true;
      this._notify();
    });

    db.collection('items').orderBy('createdAt').onSnapshot(snap => {
      this.items = snap.docs.map(d => {
        const data = d.data();
        if (data.image) this.images[d.id] = data.image;
        return { id: d.id, name: data.name, catId: data.catId, price: data.price, desc: data.desc || '' };
      });
      this.itemsLoaded = true;
      this._notify();
    });
  },
};

Data.init();
