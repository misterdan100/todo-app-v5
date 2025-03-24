import { Router } from "express";
import { createTag, deleteTag, getTagById, getTagByName, getTags, getTagsWithTasks, getTasksByTag, seedTags } from "../controllers/tags.controller";
import authenticate from "../middleware/auth";

const router = Router()

router.use('/tags', authenticate)
router.use('/tags/*', authenticate)

router.get('/tags', getTags)
router.get('/tags/tasks', getTagsWithTasks)
router.get('/tags/name/:tagName', getTagByName)
router.get('/tags/:id', getTagById)
router.get('/tags/:name/tasks', getTasksByTag)
router.post('/tags', createTag)
router.delete('/tags/:id', deleteTag)

router.post('/tags/seed', seedTags)

export default router