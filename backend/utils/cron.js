const cron = require('node-cron');
const User = require('../models/User');
const sendEmail = require('./sendEmail');

// Schedule a job to run every day at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Running a daily check for membership renewals...');

  const users = await User.find({ membershipStatus: 'Active' });

  users.forEach(async (user) => {
    const lastPaymentDate = new Date(user.lastPaymentDate);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    // Check if payment is due in 7 days
    if (
      lastPaymentDate <= oneYearAgo &&
      lastPaymentDate.getDate() === sevenDaysFromNow.getDate() &&
      lastPaymentDate.getMonth() === sevenDaysFromNow.getMonth()
    ) {
      const message = `
        Dear ${user.name},

        This is a friendly reminder that your Rotary Club membership is due for renewal in 7 days.

        Please log in to your account to make a payment.

        Thank you,
        Rotary Club of Calicut South
      `;

      await sendEmail({
        email: user.email,
        subject: 'Membership Renewal Reminder',
        message,
      });
    }

    // Check if payment is due today
    if (
      lastPaymentDate <= oneYearAgo &&
      lastPaymentDate.getDate() === today.getDate() &&
      lastPaymentDate.getMonth() === today.getMonth()
    ) {
      const message = `
        Dear ${user.name},

        This is a friendly reminder that your Rotary Club membership is due for renewal today.

        Please log in to your account to make a payment.

        Thank you,
        Rotary Club of Calicut South
      `;

      await sendEmail({
        email: user.email,
        subject: 'Membership Renewal Due Today',
        message,
      });
    }

    // Check if payment is overdue
    if (lastPaymentDate <= oneYearAgo) {
      const message = `
        Dear ${user.name},

        This is a friendly reminder that your Rotary Club membership is overdue.

        Please log in to your account to make a payment as soon as possible.

        Thank you,
        Rotary Club of Calicut South
      `;

      await sendEmail({
        email: user.email,
        subject: 'Membership Renewal Overdue',
        message,
      });
    }
  });
});
