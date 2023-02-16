import http from 'node:http';
import express from 'express';
import * as socketio from 'socket.io';
import {createModelService} from './services/model.service.js';
import {loadAppConfig} from './tools/loadAppConfig.js';
import {createUserAuthService} from './services/userAuth.service.js';
import {createAuthRouter} from './routers/auth.router.js';
import {socketioUserAuthMiddleware} from './middleware/socketioUserAuth.middleware.js';
import {createServeClientFilesHandler} from './handlers/serveClientFiles.handler.js';
import {notFound404} from './handlers/notFound404.handler.js';
import {internalError500} from './handlers/internalError500.handler.js';
import {createSocketioConnectionHandler} from './handlers/socketioConnection.handler.js';
import {createAdminRouter} from './routers/admin.router.js';
import {createConnectedUsersService} from './services/connectedUsers.service.js';
import {createItemsRouter} from './routers/items.router.js';
import {createCartRouter} from './routers/cart.router.js';
import {createServeItemImagesHandler} from './handlers/serveItemImages.handler.js';
import cors from 'cors';

main().catch(err => {
  console.error('Uncaught error in main() function:', err);
});

async function main() {
  // Check if app is in development or production mode.
  const isDevelopment = process.env.NODE_ENV !== 'production';
  if (isDevelopment) {
    console.log('App is running in DEVELOPMENT mode.');
  } else {
    console.log('App is running in PRODUCTION mode.');
  }
  // Deactivate cors during development to
  // allow using a development server proxy.
  const deactivateCors = isDevelopment;

  // 1. Load the app configuration.
  const config = await loadAppConfig();

  // 2. Create the various services used by the app.
  // Establish a connection to the app's database.
  const modelService = await createModelService(config);
  // Authenticate users using firebase/auth.
  const userAuthService = createUserAuthService(config);
  // Connected users service for the user count display.
  const connectedUsersService = createConnectedUsersService();

  // 3. Initialize server and socket.io.
  // Create the express app used for server routing.
  const app = express();
  if (deactivateCors) {
    // Deactivate cors on all server routes.
    app.use(cors());
  }
  // Create an HTTP server used for all connectivity.
  const server = http.createServer(app);
  // Create the socket.io server used for real-time communication.
  let socketioOptions = {};
  if (deactivateCors) {
    // Deactivate cors on socket.io during development.
    socketioOptions.cors = {origin: '*'};
  }
  const io = new socketio.Server(server, socketioOptions);

  // 4. Apply the socket.io middleware.
  io.use(socketioUserAuthMiddleware(userAuthService));
  io.on('connection', createSocketioConnectionHandler(io, connectedUsersService));

  // 5. Apply the app's middleware and routes.
  app.use(createServeClientFilesHandler(config));
  app.use(createServeItemImagesHandler(config));
  app.use('/auth', createAuthRouter(config, userAuthService));
  app.use('/items', createItemsRouter(modelService, userAuthService));
  app.use('/cart', createCartRouter(modelService, userAuthService));
  app.use('/admin', createAdminRouter(config, modelService, userAuthService));
  app.use(notFound404);
  app.use(internalError500);

  // 6. Launch the server and start listening for incoming requests.
  launchServer(config, server);
}

function launchServer(config, server) {
  const {port, hostname} = config.server;
  server.listen(port, hostname, () => {
    const address = JSON.stringify(server.address());
    console.log(`Server listening on ${address}.`);
  });
}

