const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const passwordRegex = new RegExp(
  '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
);

const sendMail = (user, template, transporter) => {
  transporter.sendMail(template);

  return {
    success: true,
    message: 'email-sent',
  };
};

const allStatus = () => ({
  Accepted: 1,
  Rejected: 2,
  Submitting: 3,
  Assigning: 4,
  Reviewing: 5,
  Reviewed: 6,
  'Re-submitting': 7,
  'Re-reviewing': 8,
});

const commonUtils = {
  randomStr,
  passwordRegex,
  sendMail,
  allStatus,
};

export default commonUtils;
