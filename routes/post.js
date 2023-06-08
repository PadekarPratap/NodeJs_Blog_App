import express from 'express'
import { auth } from '../middlewares/auth.js'
import { singleUpload } from '../middlewares/multer.js'
import { createNewPost, deletePost, editPost, getAllPosts, getSinglePost } from '../controllers/post.js'



const router = express.Router()

// create a new post
router.post('/new', auth, singleUpload, createNewPost  )

// get all the posts
router.get('/all', getAllPosts)

// get a single post
router.get('/:id', getSinglePost)

// put a single post
router.put('/edit/:id', auth, singleUpload, editPost)

// delete a single post
router.delete('/delete/:id', auth, deletePost )

export default router