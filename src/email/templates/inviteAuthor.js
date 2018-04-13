export default (fromAddress, toAddress, variables = {}) => {
  const { insertUser, conference, password, isExist } = variables;
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
    ${
      isExist
        ? `You had an account on my system and you can log in with <b>${
            user.email
          }</b>`
        : `Your account (you can login with username or email)
    <br>
    <b>Email</b>: ${user.email}
    <br>
    <b>Username</b>: ${user.username}
    <br>
    <b>Password</b>: ${password}
    <br>
    <br>`
    }

    We look forward to hearing from you soon and please feel free to contact us if we can be of further assistance.<br>
    <br>

    Sincerely,
    <br>
    `,
  };
};
