import express from 'express';
const router = express.Router();
import { checkStatus, collectMoney, webookStatus } from '../controllers/moneyExchangeWithFeeController.js';

router.post('/payment/exchange-with-fee', collectMoney)
router.post('/payment/webhook/campay-status', webookStatus)
router.get('/payment/check-collect-status/:collectReference', checkStatus)
export default router;