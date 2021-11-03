import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import passport from 'passport';


import { v1 as v1Routes } from './interfaces/routes';

const server: Application = express();

// Basic middlewares
server.use(cors());
server.use(json());
server.use(urlencoded({ extended: false }));

// Routes
server.use('/', v1Routes.apiRouter);


export default server;
