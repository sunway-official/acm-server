export default (fromAddress, toAddress, subject = '', variables = {}) => {
  const user = variables.user;
  const conference = variables.conference;
  // const paper = variables.paper;

  return {
    from: fromAddress,
    to: toAddress,
    subject,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>Document</title>
    </head>
    <body>
      Dear ${user.position} ${user.firstname},
      <br>
      <br>
      I am writing this email to inform you that we recieved your paper(s). Your paper would be reviewed before ${
        conference.dl_release_final_paper
      } and we will let you know the result after that date.
      <br>
      We believe that the articles you bring to the conference going to contribute to the success of the conference.
      <br>
      We look forward to hearing from you soon and please feel free to contact us if we can be of further assistance.
      <br>
      Sincerely,
    </body>
    </html>
    `,
  };
};
