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
      I am writing to send the ${
        conference.title
      } conference's papers for your perusal. Attached is the papers of ${
      conference.title
    } conference which was submitted again . Hope you can arrange your schedule accordingly.
      <br>
      <br>
      For better preparing the conference, could you please review all of the paper(s) the following papers before ${
        conference.dl_re_review_paper
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
