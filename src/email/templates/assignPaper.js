export default (fromAddress, toAddress, variables = {}, abstract = true) => {
  const { conference, reviewer } = variables;
  const user = reviewer;
  const subject = `${conference.title} REVIEW the Papers`;
  const dl_review = abstract
    ? conference.dl_review_abstract
    : conference.dl_review_paper;
  return {
    from: fromAddress,
    to: toAddress,
    subject,
    html: `
    <b>Dear ${user.position} ${user.firstname}</b>,
    <br>
    <br>
    I am writing to send the <b> ${
      conference.title
    }</b> conference papers for your perusal. Attached is the papers of <b> ${
      conference.title
    }</b> conference. Hope you can arrange your schedule accordingly.<br>
    <br>
    For better preparing the conference, could you please review all the papers following before ${dl_review}.
    <br>
    <b>Go to our website: <a href="${process.env.CLIENT_ADDRESS}">${
      process.env.CLIENT_ADDRESS
    }</a></b>
    We look forward to hearing from you soon and please feel free to contact us if we can be of further assistance.    <br>
    <br>
    <br>

    Sincerely,
    <br>
    `,
  };
};
