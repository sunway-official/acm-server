export default (fromAddress, toAddress, subject = '', variables = {}) => ({
  from: fromAddress,
  to: toAddress,
  subject: subject || 'Invitaion',
  html: `

  <h1> Dear </h1>
  Thank you for your submit paper ${variables.title}
  `,
});
