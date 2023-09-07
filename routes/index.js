import { Router } from 'express';

const router = Router();

router.get('/', (req, res)=>
{
    return res.send('reached miniappserver');
});

export default router;