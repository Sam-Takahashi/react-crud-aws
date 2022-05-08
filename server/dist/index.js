"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// --------------------------------------------------------------------
const app = (0, fastify_1.default)();
const prisma = new client_1.PrismaClient();
// app.register(require('@fastify/cors'), {
// })
// //* CORS(allowedHeaders options are IMPORTANT for Access-control-allow-origin)
app.register(require('@fastify/cors'), {
    origin: "*",
    allowedHeaders: [
        "Origin",
        "X-Request-With",
        "Accept",
        "Content-Type",
    ],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
});
// Todo: Create CRUD routes https://daily-dev-tips.com/posts/crud-operations-with-prisma-and-fastify/
// ! Get All
app.get('/blogs', async (request, reply) => {
    const allBlogs = await prisma.blog.findMany({});
    reply.send(allBlogs);
});
// ! Get Single
app.get('/blog/:id', async (request, reply) => {
    const { id } = request.params;
    const blog = await prisma.blog.findUnique({
        where: { id: String(id) },
    });
    reply.send(blog);
});
// ! Create
app.post('/create-blog', async (request, reply) => {
    const { title, body, author } = request.body;
    const newBlog = await prisma.blog.create({
        data: {
            title,
            body,
            author
        },
    });
    reply.send(newBlog);
});
// ! Update
//As you can see, this route leverages both the body and the Params as we need to know the user's new name and ID.
app.put('/update-blog/:id', async (request, reply) => {
    const { id } = request.params;
    const { title, body, author } = request.body;
    const updatedBlog = await prisma.blog.update({
        where: { id: String(id) },
        data: {
            title,
            body,
            author
        },
    });
    reply.send(updatedBlog);
});
// ! Delete
app.delete('/delete-blog/:id', async (request, reply) => {
    const { id } = request.params;
    await prisma.blog.delete({
        where: { id: String(id) },
    });
    reply.send('blog removed');
});
const port = process.env.PORT || 3030;
// app.listen(3000); // http://localhost:3000/
app.listen(port, function (err, address) {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
    app.log.info(`server listening on ${address}`);
});
// import fastify from 'fastify'
// const server = fastify()
// server.get('/ping', async (request, reply) => {
//   return 'pong\n'
// })
// server.listen(8080, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Server listening at ${address}`)
// })
