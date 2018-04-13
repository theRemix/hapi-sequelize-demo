module.exports = {

  name: 'api',

  register: async function(server, options){
    server.route({
      method:'GET',
      path:'/hello',
      options: {
        tags: ['api'],
        description: 'Hello endpoint',
        notes: 'This is just a test',
      },
      handler:function(request,h) {
      
        return 'hello world';
      }
    });

  }

}