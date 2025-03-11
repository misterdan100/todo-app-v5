import { Router } from "express";
import { createTag, deleteTag, getTagById, getTags, getTagsWithTasks, getTasksByTag, seedTags } from "../controllers/tags.controller";

const router = Router()

router.get('/tags', getTags)
router.get('/tags/tasks', getTagsWithTasks)
router.get('/tags/:id', getTagById)
router.get('/tags/:id/tasks', getTasksByTag)
router.post('/tags', createTag)
router.delete('/tags/:id', deleteTag)

router.post('/tags/seed', seedTags)

export default router