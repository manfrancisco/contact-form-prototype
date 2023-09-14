import nodemailer from "nodemailer";

const server = Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response(Bun.file("index.html"));
    }
    if (url.pathname === "/form-submit") {
      const formData = await req.formData();
      const name = formData.get("name");
      const email = formData.get("email");
      const comments = formData.get("comments");
      await sendEmail(name, email, comments);
      return new Response("Form submitted!");
    }
    return new Response("Page Not Found", { status: 404 });
  },
  port: 3000,
});

console.log(`Listening on localhost:${server.port}`);

async function sendEmail(name, email, comments) {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: Bun.env.MAIL_USER,
      pass: Bun.env.MAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Form Submission" <m@mdorst.net>',
    to: "info@briannamarie.design",
    subject: `${name} would like to get in touch.`,
    text: `Name: ${name}\nEmail: ${email}\nComments: ${comments}`,
  });

  console.log("Message sent: %s", info.messageId);
}
