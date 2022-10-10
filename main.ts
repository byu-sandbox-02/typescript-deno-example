import { serve } from "./deps.ts";
import hello_world from "./routes/hello_world.ts";

type Route = {
    pattern: URLPattern;
    method: string;
};

const BOOK_ROUTE: Route = { pattern: new URLPattern({ pathname: "/books/:id"}), method: "GET"};
const HELLO_WORLD_ROUTE: Route = { pattern: new URLPattern({ pathname: "/hello/world" }), method: "GET"};

const handler = async (req: Request) => {

    // printing out the request
    console.log("Method:", req.method);
    const url = new URL(req.url);
    console.log("Path:", url.pathname);
    console.log("Query parameters:", url.searchParams);
    console.log("Headers:", req.headers);
    if (req.body) {
        const body = await req.json();
        console.log("Body:", body);
    }
    // end printing out the request


    // deno http doesn't have routing built in, so we have to do it ourselves
    // There are better ways to do this, but this is the simplest
    const match = BOOK_ROUTE.pattern.exec(req.url);
    if (match) {
        const id = match.pathname.groups.id;
        return new Response(`Book ${id}`);
    } else if (HELLO_WORLD_ROUTE.pattern.exec(req.url) && req.method === HELLO_WORLD_ROUTE.method) {
        return hello_world();
    } else {
        return new Response("Not found (try /books/1)", {
            status: 404,
        });
    }

};

serve(handler);
