import { Router } from 'express';
import { getAllEvents } from '../controllers/event.controller';

const router = Router();

// Public route to get filtered, paginated events
router.get('/', getAllEvents);

export default router;