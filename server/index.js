const Hapi = require('hapi');
const PORT = process.env.PORT;
const publicPath = 'public';

// Create a server with a host and port
const server = Hapi.server({
    host:'localhost',
    port:8888
});

const init = async () => {
  await server.register([
    require('inert'),
    require('vision'),
    {
      plugin: require('hapi-swaggered'),
      options: {
        tags: {
          'api': 'Public API'
        },
        info: {
          title: 'Hapi Example API',
          description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
          version: '1.0'
        }
      }
    },
    {
      plugin: require('hapi-swaggered-ui'),
      options: {
        title: 'Example API',
        path: '/docs',
        authorization: {
          field: 'apiKey',
          scope: 'query', // header works as well
          // valuePrefix: 'bearer '// prefix incase
          defaultValue: 'demoKey',
          placeholder: 'Enter your apiKey here'
        },
        swaggerOptions: {
          validatorUrl: null
        }
      }
    }
  ])
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