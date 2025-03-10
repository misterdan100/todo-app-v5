import { Router } from "express";
import { createTag, deleteTag, getTagById, getTags } from "../controllers/tags.controller";

const router = Router()

router.get('/tags', getTags)
router.get('/tags/:id', getTagById)
router.post('/tags', createTag)
router.delete('/tags/:id', deleteTag)

export default router