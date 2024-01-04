import express from 'express';
import { getAllUser, login, signup } from "../controllers/user-controller.js"

const router = express.Router();

/**
 * @swagger
 * /
 *   get:
 *     summary: Get all User
 *     responses:
 *       200:
 *         description: Returns all User
 */
router.get("/", getAllUser)
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/
router.post("/signup",signup)

  
router.post("/login",login)


export default router