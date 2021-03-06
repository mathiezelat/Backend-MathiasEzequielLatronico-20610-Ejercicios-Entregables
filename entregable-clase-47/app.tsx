// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp();

let visitas: number = 0;

app.handle("/", async (req) => {
  const frase = req.query.get('frase');

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Servidor en Deno</title>
        </head>
        <body style={{fontFamily: 'sans-serif'}}>
          <h1>Servidor en Deno con React y Denon</h1>
          <p>Hola, ingrese una frase por query...</p>
          <p>Frase: {frase || 'no ingresaste ninguna frase por query'}</p>
          <p>Visitas: {++visitas}</p>
          <p>Fecha: {new Date().toLocaleString()}</p>
        </body>
      </html>,
    ),
  });
});
app.listen({ port: 8080 });