import express from "express";
import { loginUser} from "../controllers/userController.js";
import { getAllUsers,getUserById,createUser,updateUser,deleteUser, getCurrentUser,logoutUser,refreshToken } from "../controllers/userController.js";

import { validatePassword } from "../middleware/validatePassword.js";

const router=express.Router();


router.post("/signup",validatePassword, createUser);
router.post("/login", loginUser);
router.get('/',getAllUsers);
router.get("/me", getCurrentUser);
router.post("/refresh", refreshToken);


router.get('/:id',getUserById);

//CRUD

router.put('/:id',updateUser);

router.delete('/:id',deleteUser);
router.post("/logout", logoutUser);


export default router;