import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  rest.get("/api/announcements", (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: "announcement 1" }]), ctx.delay(150));
  }),
  rest.get("/api/categories", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 2,
          name: "shirts",
          created_at: "2023-05-04T22:28:00.070Z",
          updated_at: "2023-05-06T14:21:49.584Z",
          products_count: "8",
        },
      ]),
      ctx.delay(150)
    );
  }),
  rest.get("/api/selected-products/popular", (req, res, ctx) => {
    return res(ctx.json([{ id: 1, title: "popular 1" }]), ctx.delay(150));
  }),
  rest.get("/api/products/latest", (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: "latest 1" }]), ctx.delay(150));
  }),
  rest.post("/api/*", (req, res, ctx) => {
    return res(ctx.json("John Smith"), ctx.delay(150));
  }),
  rest.delete("/api/*", (req, res, ctx) => {
    return res(ctx.json("John Smith"), ctx.delay(150));
  }),
  rest.patch("/api/*", (req, res, ctx) => {
    return res(ctx.json("John Smith"), ctx.delay(150));
  }),
];

export const server = setupServer(...handlers);
