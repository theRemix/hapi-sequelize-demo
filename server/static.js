module.exports = {

  name: 'static',

  register: async function(server, options){

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: options.publicPath
        }
      }
    });

  }
}