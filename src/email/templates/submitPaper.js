export default (fromAddress, toAddress, subject = '', variables = {}) => ({
  from: fromAddress,
  to: toAddress,
  subject,
  html: `
  Thank you for your submit paper ${variables.title}
  `,
});
