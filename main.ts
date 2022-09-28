import { serve } from "./deps.ts";


const handler = async (req: Request) => {
  
    return new Response("Hello World");
};

serve(handler);
