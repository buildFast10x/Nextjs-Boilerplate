import { createServer } from "http";
import { parse } from "url";
import next from "next";

import env_values from '@/config';
import {intializeConnection} from "@/server/index";

const port = parseInt(env_values.server.port || "3000", 10);
const dev = process.env.NEXT_PUBLIC_ENV !== "prod";

async function bootstap() {
    try {
        await intializeConnection();

        console.log("Connection has been established successfully.");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }  
}

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        bootstap();
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    }).listen(port);


    console.log(
        `> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NEXT_PUBLIC_ENV
        }`
    );
});


// tslint:disable-next-line:no-console