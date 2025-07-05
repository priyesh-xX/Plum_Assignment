import express from "express";
import { loginUser} from "../controllers/userController.js";
import { getAllUsers,getUserById,createUser,updateUser,deleteUser, getCurrentUser } from "../controllers/userController.js";

const router=express.Router();


router.post("/signup", createUser);
router.post("/login", loginUser);
router.get('/',getAllUsers);
router.get("/me", getCurrentUser);


router.get('/:id',getUserById);

//CRUD

router.put('/:id',updateUser);

router.delete('/:id',deleteUser);



export default router;