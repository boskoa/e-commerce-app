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
    return res(
      ctx.json([
        {
          id: 16,
          title: "Skirt",
          description: "Plain, long skirt.",
          sizes: ["S", "M", "L"],
          colors: ["beige", "red", "blue"],
          price: "36.00",
          inStock: true,
          createdAt: "2023-05-06T15:03:20.000Z",
          updatedAt: "2023-05-06T15:03:20.000Z",
        },
        {
          id: 15,
          title: "Sombrero",
          description: "For real men.",
          sizes: ["M", "L", "XL"],
          colors: ["yellow", "black"],
          price: "25.00",
          inStock: true,
          createdAt: "2023-05-06T15:02:20.602Z",
          updatedAt: "2023-05-06T15:02:20.602Z",
        },
        {
          id: 14,
          title: "Fancy shirt with a bow tie",
          description:
            "Same as plain shirt, but more expensive. Wrap yourself like a gift.",
          sizes: ["S", "M", "L", "XL"],
          colors: ["blue", "red", "green"],
          price: "62.25",
          inStock: true,
          createdAt: "2023-05-06T15:01:04.967Z",
          updatedAt: "2023-05-06T15:01:04.967Z",
        },
        {
          id: 13,
          title: "Cap",
          description: "Good for wooden pole's hydro-isolation.",
          sizes: ["M", "L"],
          colors: ["grey", "blue", "red"],
          price: "15.00",
          inStock: true,
          createdAt: "2023-05-06T14:59:37.649Z",
          updatedAt: "2023-05-06T14:59:37.649Z",
        },
        {
          id: 12,
          title: "Straw hat",
          description: "Ćila-protecting.",
          sizes: ["S", "M", "L"],
          colors: ["yellow"],
          price: "20.00",
          inStock: true,
          createdAt: "2023-05-06T14:57:29.147Z",
          updatedAt: "2023-05-06T14:57:29.147Z",
        },
        {
          id: 11,
          title: "Shirt with a tie",
          description: "Elegant shirt with a matching tie.",
          sizes: ["S", "M", "L"],
          colors: ["purple", "blue"],
          price: "55.99",
          inStock: true,
          createdAt: "2023-05-06T14:50:50.158Z",
          updatedAt: "2023-05-06T14:50:50.158Z",
        },
      ]),
      ctx.delay(150)
    );
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
