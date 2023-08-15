import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from '../config';
import airportRoutes from '../routes/airports.routes';
import userRoutes from '../routes/users.routes';
import notificationRoutes from '../routes/notifications.routes';
import Airportfile from '../routes/files.routes';
class Server {

    private app : Application;
    private port : string;
    private apiPaths = {
        airports: '/api/airports',
        users: '/api/users',
        notifications : '/api/notifications',
        files : '/api/files'
    }

    constructor() {
        this.app  = express();
        this.port = config.port.toString() || '3033';

        // Middlewares
        this.middlewares();

        // Definition routes
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

 

        // Share folder
        this.app.use(express.static('src/public'));
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ limit: '100mb' }));
       
        this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    }

    routes() {
        this.app.use( this.apiPaths.airports, airportRoutes );
        this.app.use( this.apiPaths.users, userRoutes );
        this.app.use( this.apiPaths.notifications, notificationRoutes );
        this.app.use( this.apiPaths.files, Airportfile );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }

}

export default Server;