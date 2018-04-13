module.exports = {

  name: 'api',

  register: async function(server, options){
    server.route({
      method:'GET',
      path:'/hello',
      handler:function(request,h) {
      
        return 'hello world';
      }
    });

  }

}