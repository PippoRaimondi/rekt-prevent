import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import passport from 'passport';

import {
    adminPassportMiddleware,
    userPassportMiddleware,
  } from './app';

import { v1 as v1Routes } from './interfaces/routes';

const server: Application = express();

// Basic middlewares
server.use(cors());
server.use(json());
server.use(urlencoded({ extended: false }));

// Authentication middlewares
passport.use('admin-local', adminPassportMiddleware.getLocalStrategy());
passport.use('admin-jwt', adminPassportMiddleware.getJWTStrategy());

passport.use('user-local', userPassportMiddleware.getLocalStrategy());
passport.use('user-jwt', userPassportMiddleware.getJWTStrategy());

// Routes
server.use('/', v1Routes.apiRouter);
server.use('/admin', v1Routes.adminRouter);


export default server;
