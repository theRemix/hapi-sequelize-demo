const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().length(10),
  pageCount: Joi.number(),
  datePublished: Joi.date().iso()
}).meta({ className: 'Book', description : 'Book objects stored in memory' });

const books = [
  {
    title: "Ender's Game",
    author: 'Orson Scott Card',
    isbn: '0812550706',
    pageCount: 352,
    datePublished: new Date('1994-07-15')
  }
];

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
      
        return `hello world. locale: ${request.getLocale()}`;
      }
    });

    server.route({
      method:'POST',
      path:'/hello',
      options: {
        tags: ['api'],
        description: 'Test POST endpoint',
        notes: 'This is just a test',
        validate: {
          payload: {
            name: Joi.string().min(3).max(10)
          }
        }
      },
      handler:function(request,h) {
      
        return `hello ${request.payload.name}`;
      }
    });

    server.route({
      method:'GET',
      path:'/books',
      options: {
        tags: ['api'],
        description: 'Get Books',
        notes: 'Using joi model',
        response: {
          schema: Joi.array().items(bookSchema)
        }
      },
      handler:function(request,h) {
      
        return books;
      }
    });

    server.route({
      method:'POST',
      path:'/books',
      options: {
        tags: ['api'],
        description: 'Create a book',
        notes: 'Validated payload with Joi schema',
        validate: {
          payload: bookSchema
        }
      },
      handler:function(request,h) {
      
        books.push(request.payload);

        return { inserted : 1 };
      }
    });

  }

}