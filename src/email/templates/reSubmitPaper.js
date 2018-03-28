export default (fromAddress, toAddress, subject = '', variables = {}) => {
  const user = variables.user;
  const conference = variables.conference;
  const paper = variables.paper;

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
      I am writing this email to thanks for your submission to [Conference’s acronym name]. However, we regret to inform you that your paper could not be accepted for presentation after being reviewed since the justification: [the detail reason of Rejection | Comment of Reivewer].
      <br>
      <br>
      But we would suggest that you modify your paper with the requirements of the conference very well, and welcome to submit for Round 2 before ${
        conference.dl_re_submit_paper
      }.
      <br>
      <br>
      We look forward to hearing from you soon and please feel free to contact us if we can be of further assistance.
      <br>
      Sincerely,
    </body>
    </html>
    `,
  };
};
