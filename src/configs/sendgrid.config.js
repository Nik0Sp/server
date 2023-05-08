import sgMail from "@sendgrid/mail";

const send_grid_api_key = process.env.SEND_GRID_API_KEY;

// send email
sgMail.setApiKey(send_grid_api_key);
const myEmail = process.env.MY_EMAIL;

const message = {
  to: newUser.email,
  from: myEmail,
  subject: "Hi this is a final project!!!",
  text: "final project!!!",
  html: "<h1>HTML: Hi Baby!!!</h1>",
};

sgMail
  .send(message)
  .then(() => console.log("Email sent..."))
  .catch((e) => console.log(e.message));
