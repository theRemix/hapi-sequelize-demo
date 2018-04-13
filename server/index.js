const Hapi = require('hapi');
const PORT = process.env.PORT;
const publicPath = 'public';

// Create a server with a host and port
const server = Hapi.server({
    host:'localhost',
    port:8888
});

const init = async () => {
  await server.register(require('inert'));
  await server.register({ plugin : require('./static'), options : { publicPath }});
  await server.register({ plugin : require('./api'), routes: { prefix: '/api' } });
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();