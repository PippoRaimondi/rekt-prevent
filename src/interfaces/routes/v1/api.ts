import { Router } from 'express';

import {
  listTokenUseCase } from '../../../app';
import {
  TokenController
} from '../../controllers';


// Controllers
export const tokenController = new TokenController(listTokenUseCase);


// Routes
export const router = Router();


// Tokents
router.post('/tokens', tokenController.list);
