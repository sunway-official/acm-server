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
      <h1>Notification of Acceptance of the Conference</h1>
      <h3>${conference.start_date}</h3>
      <a href="${process.env.CLIENT_ADDRESS}/landingpage/${
      conference.id
    }">Landing page</a>
      <br>
      <br>
      <br>
      <h3>Paper title: ${paper.title}</h3>
      <br>
      <br>
      <b>Dear ${user.position} ${user.firstname}</b>,
      <p>
      First of all, thank you for your concern about <b>${
        conference.title
      }</b> review procedure has been finished. We are delighted to inform you that your manuscript has been accepted for presentation at <b>${
      conference.title
    }</b>. Your paper was reviewed based on the evaluations. The reviewers’ comments are enclosed.
      </p>
      <br>
      <br>
      <p>
      The conference received papers from a lot of different countries and regions during the submission period. And there are about the papers accepted by our reviewers who are the international experts.
      The selected papers could be published in our conference proceeding with high quality. According to the recommendations from reviewers and technical program committees, we are glad to inform you that your paper identified above have been selected for publication and oral presentation.
      You are invited to present your paper and studies during our <b>${
        conference.title
      }</b> conference that would be held on ${conference.start_date}, ${
      conference.address.street
    }, ${conference.address.city}.
      </p>
      <br>
      <br>
      <p>
      Please prepare your final paper. If you have any problems, please feel free to contact us via <b>${fromAddress}</b> for the most updated information on the conference; please check the conference website at [landing page]. The Conference Program will be available on the conference website in ${
      conference.dl_release_final_paper
    }.
      </p>

      Again, congratulations. I look forward to seeing you at ${
        conference.address.street
      }, ${conference.address.city}.
    <br>
    </body>
    </html>
    `,
  };
};
