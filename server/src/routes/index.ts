import express, {Request, Response} from 'express';
import Register from '../controllers/register';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send("Hello, World!")
})

router.post('/register', Register);

export default router;