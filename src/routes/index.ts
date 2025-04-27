import { Router, Request, Response } from 'express';
import EntryController from '../controllers/entryController';
import IndexController from '../controllers/indexController';

const router = Router();
const entryController = new EntryController();
const indexController = new IndexController();

router.get('/', indexController.renderHomePage);
router.get('/entries', entryController.listEntries);
router.get('/entries/new', entryController.renderForm);
router.post('/entries', entryController.createEntry);

export default router;