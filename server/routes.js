import config from './config.js';
import { Controller } from './controller.js';
import { logger } from './utils.js';
const { location, pages: {
  homeHTML,
  controllerHTML,
} } = config;
const controller = new Controller();
async function routes(request, response) {
  const { method, url } = request;

  if(method === 'GET' && url === '/') {
    response.writeHead(302, {
      'Location': location.home
    });

    response.end();
  }

  if (method === "GET" && url === "/home") {
    const { stream } = await controller.getFileStream(homeHTML);

    // padrão do response  é text/html  
    // response.writeHead(200, {
    //   'Content-Type': 'text/html'
    // });

    return stream.pipe(response);
  }

  if (method === "GET" && url === "/controller") {
    const { stream } = await controller.getFileStream(controllerHTML);

    // padrão do response  é text/html
    // response.writeHead(200, {
    //   'Content-Type': 'text/html'
    // });

    return stream.pipe(response);
  }

  //files
  if(method === 'GET'){
    return;
  }

  response.writeHead(404);
  return response.end('Hello!');
}

export function handler(request, response) {
  return routes(request, response)
    .catch(error => logger.error(`Deu Ruim! ${error.stack}`))
}