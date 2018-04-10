export default (fromAddress, toAddress, variables = {}) => {
  const { insertUser, conference, password } = variables;
  const user = insertUser;
  const subject = `${conference.title} Invitation`;
  return {
    from: fromAddress,
    to: toAddress,
    subject,
    html: `
    <b>Dear ${user.position} ${user.firstname}</b>,
    <br>

    <br>
    You are known as a reputed and experienced person in the field that is included in the forthcoming <b> ${
      conference.title
    }</b> conference.<br>
    Therefore, we appreciate if you accept becoming a reviewer for upcoming <b> ${
      conference.title
    }</b> conference articles. We believe that your contribution is contributing to the success of the conference.<br>
    <br>
    Please let us know if you have arranged your business to join with us.
    <br>
    Click on the link to get all informations you need: ${
      process.env.CLIENT_ADDRESS
    }
    <br>
    ${conference.description}<br>
    Your account (you can login with username or email)
    <br>
    <b>Email</b>: ${user.email}
    <br>
    <b>Username</b>: ${user.username}
    <br>
    <b>Password</b>: ${password}
    <br>
    <br>
    We look forward to hearing from you soon and please feel free to contact us if we can be of further assistance.<br>
    <br>

    Sincerely,
    <br>
    `,
  };
};
