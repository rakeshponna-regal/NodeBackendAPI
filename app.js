import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js'
import blogRouter from './routes/blog-routes.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json())

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Blog API",
            version: "1.0.0",
            description:
                'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: 'Development server',
            }
        ]
    },
    apis: ['.routes/*.js']
}
const userName = "admin"
const password = "Admin"
const port = 3000
const swaggerSpec = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/api/user", router) //http://localhost:3000/api/user/
app.use("/api/blog", blogRouter)

app.get('/api', (req, res, next) => {
    res.send('Hello World!');
});
console.log('The value of PORT is: ', process.env.PORT);
mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.zkbisye.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("Connected to Database")
}).catch((err) => console.log(err))

app.listen(port, () => {
    console.log('Server is running on port ',port);
});