export default (fromAddress, toAddress, subject = '', variables = {}) => {
  const user = variables.user;
  const conference = variables.conference;
  return {
    from: fromAddress,
    to: toAddress,
    subject,
    html: `
    <b>Dear ${user.position} ${user.firstname}</b>,
    <br>
    <br>
    ${conference.description}<br>
    <br>
    We are pleased to invite you to attend <b> ${
      conference.title
    }</b> conference.<br>
    We believe that the articles you bring to the conference going to contribute to the success of the conference.<br>
    <b>Submit your papers at : <a href="${
      process.env.CLIENT_ADDRESS
    }">Submit paper</a></b>
    <br>
    We look forward to hearing from you soon and please feel free to contact us if we can be of further assistance.<br>
    <br>

    Sincerely,
    <br>
    `,
  };
};
