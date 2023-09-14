const server = Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response(Bun.file("index.html"));
    }
    if (url.pathname === "/form-submit") {
      const formData = await req.formData();
      const fname = formData.get("fname");
      const lname = formData.get("lname");
      console.log(fname, lname);
      return new Response("Form submitted!");
    }
    return new Response("Page Not Found", { status: 404 });
  },
  port: 3000,
});

console.log(`Listening on localhost:${server.port}`);
