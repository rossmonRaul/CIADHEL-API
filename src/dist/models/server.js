"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../config"));
const airports_routes_1 = __importDefault(require("../routes/airports.routes"));
const users_routes_1 = __importDefault(require("../routes/users.routes"));
const notifications_routes_1 = __importDefault(require("../routes/notifications.routes"));
const files_routes_1 = __importDefault(require("../routes/files.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            airports: '/api/airports',
            users: '/api/users',
            notifications: '/api/notifications',
            files: '/api/files'
        };
        this.app = (0, express_1.default)();
        this.port = config_1.default.port.toString() || '3033';
        // Middlewares
        this.middlewares();
        // Definition routes
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Share folder
        this.app.use(express_1.default.static('src/public'));
    }
    routes() {
        this.app.use(this.apiPaths.airports, airports_routes_1.default);
        this.app.use(this.apiPaths.users, users_routes_1.default);
        this.app.use(this.apiPaths.notifications, notifications_routes_1.default);
        this.app.use(this.apiPaths.files, files_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map