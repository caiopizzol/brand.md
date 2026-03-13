import type { CreateBrandRequest, GenerateEvent, ModuleContent } from "shared";
import { MODULE_LIST } from "shared";

interface Env {
  ENVIRONMENT: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// In-memory store (replace with KV/D1 later)
const brands = new Map<
  string,
  {
    flowData: CreateBrandRequest["flowData"];
    modules: Record<string, ModuleContent>;
  }
>();

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // GET /api/health
    if (url.pathname === "/api/health" && req.method === "GET") {
      return Response.json({ status: "ok" }, { headers: CORS_HEADERS });
    }

    // POST /api/brands
    if (url.pathname === "/api/brands" && req.method === "POST") {
      const body = (await req.json()) as CreateBrandRequest;
      const id = crypto.randomUUID();
      brands.set(id, { flowData: body.flowData, modules: {} });
      return Response.json({ id }, { headers: CORS_HEADERS });
    }

    // GET /api/brands/:id/generate
    const generateMatch = url.pathname.match(
      /^\/api\/brands\/([^/]+)\/generate$/,
    );
    if (generateMatch && req.method === "GET") {
      const id = generateMatch[1];
      const brand = brands.get(id);
      if (!brand) {
        return new Response("Not found", {
          status: 404,
          headers: CORS_HEADERS,
        });
      }

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const send = (event: GenerateEvent) => {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
            );
          };

          for (const mod of MODULE_LIST) {
            send({ type: "module_start", moduleId: mod.id });
            await new Promise((r) => setTimeout(r, 600));
            send({ type: "module_done", moduleId: mod.id });
          }

          send({ type: "complete" });
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
        },
      });
    }

    return new Response("Not found", { status: 404, headers: CORS_HEADERS });
  },
} satisfies ExportedHandler<Env>;
