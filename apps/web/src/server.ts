import index from "./index.html";

Bun.serve({
  port: Number(process.env.PORT || 3005),
  routes: {
    "/": index,
  },
  fetch(req) {
    const url = new URL(req.url);

    // Proxy API requests to the API server
    if (url.pathname.startsWith("/api/")) {
      const apiUrl = new URL(
        url.pathname + url.search,
        "http://localhost:3006",
      );
      return fetch(apiUrl.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.method !== "GET" ? req.body : undefined,
      });
    }

    return new Response("Not found", { status: 404 });
  },
  development: {
    hmr: true,
    console: true,
  },
});

const port = Number(process.env.PORT || 3005);
console.log(`Web running on http://localhost:${port}`);
