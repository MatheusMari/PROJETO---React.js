import {Router} from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.send("API de receitas rodando...");
});

export default router;