import express from "express"
import {
    create,
    deleteProblem,
    getAll,
    getCategory,
    getSavedProblems,
    recomended,
    save,
    solve,
    unrecomended,
    unsave,
    update,
    view
} from "../controllers/Problem.js"
import { verifyToken } from "../jwt.js"

const router = express.Router()

// CREATE Problem
router.post("/", create)

// UPDATE Problem
router.put("/:id", verifyToken, update)

// DELETE Problem
router.delete("/:id", verifyToken, deleteProblem)

// VIEW Problem
router.put("/view/:problem_id", view);

// UNRECOMENDED Problem
router.put("/unrecommend/:problem_id/:user_id", unrecomended);

// RECOMENDED Problem
router.put("/recomended/:problem_id/:user_id", recomended);

// SAVE Problem
router.put("/save/:problem_id/:user_id", save);

// UNSAVE Problem
router.put("/unsave/:problem_id/:user_id", unsave);

// GET all Problems
router.get("/", getAll);

// GET category Problems
router.post("/find", getCategory)

// setSolution
router.put("/solution", verifyToken, solve);

// get saved problems 
router.get("/saved/:userId", getSavedProblems);

export default router