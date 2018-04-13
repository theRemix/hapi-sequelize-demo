const Hapi = require('hapi');
const PORT = process.env.PORT;

// Create a server with a host and port
const server = Hapi.server({
    host:'localhost',
    port:8888
});

const init = async () => {
  await server.register(require('inert'));
  await require('./static')(server);
  await require('./api')(server);
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();