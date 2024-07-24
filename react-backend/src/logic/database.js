//@ts-check
import 'dotenv/config'
import { createClient } from "redis";

export default class Database {

    client = createClient({ url: process.env.REDIS_URL });

    constructor() {
        this.client.connect();

        this.client.on('error', (err) => {
            console.error('Error connecting to Redis', err);
        });
    }

}