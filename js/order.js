/* ══════════════════════════════════════════
   ELITE COFFEE — WhatsApp Order Builder
   js/order.js
   ══════════════════════════════════════════ */

const Order = {
  send() {
    const name  = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();

    if (!name)                return Toast.show('Please enter your name');
    if (!phone)               return Toast.show('Please enter your phone');
    if (!Basket.items.length) return Toast.show('Basket is empty');

    const now     = new Date();
    const dateStr = now.toLocaleDateString('en-GB', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-GB', {
      hour:   '2-digit',
      minute: '2-digit',
    });

    const total = Basket.getTotal();

    let msg = `🛒 *New Order — Elite Coffee*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Name:*  ${name}\n`;
    msg += `📞 *Phone:* ${phone}\n`;
    msg += `📅 *Date:*  ${dateStr}\n`;
    msg += `⏰ *Time:*  ${timeStr}\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *Order:*\n\n`;

    Basket.items.forEach((item, i) => {
      const lbp = Math.round(item.price * item.qty * Data.rate).toLocaleString();
      msg += `${i + 1}. *${item.name}* × ${item.qty}\n`;
      msg += `   💰 $${(item.price * item.qty).toFixed(2)} (${lbp} LBP)\n`;
      if (item.note) msg += `   📝 ${item.note}\n`;
      msg += `\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `💵 *Total: $${total.toFixed(2)}*\n`;
    msg += `🇱🇧 *Total: ${Math.round(total * Data.rate).toLocaleString()} LBP*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `📍 Elite Coffee — Bakhoun Highway`;

    window.open(
      `https://wa.me/${Data.waNum}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  },
};