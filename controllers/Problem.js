import Problem from "../models/Problem.js"
import { createError } from "../error.js"
import User from "../models/User.js"


export const create = async (req, res, next) => {
    try {
        const newProblem = await Problem.create(req.body)
        if (!newProblem) return next(createError(403, "Wrong information"))

        res.status(200).json(newProblem)
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        if (!updatedProblem) return next(createError(403, "Wrong information"))

        res.status(200).json(updatedProblem)
    } catch (error) {
        next(error)
    }
}

export const deleteProblem = async (req, res, next) => {
    try {
        await Problem.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json("Problem has been deleted!"))
    } catch (error) {
        next(error)
    }
}

export const view = async (req, res, next) => {
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(
            req.params.problem_id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!updatedProblem) {
            return next(createError(404, "Problem not found"))
        }

        res.status(200).json(updatedProblem);
    } catch (error) {
        next(error);
    }
}

export const unrecomended = async (req, res, next) => {
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(
            req.params.problem_id,
            { $inc: { recomend: -1 } },
            { new: true }
        );

        if (!updatedProblem) {
            return next(createError(404, "Problem not found!"))
        }

        res.status(200).json(updatedProblem);
    } catch (error) {
        next(error);
    }
}

export const recomended = async (req, res, next) => {
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(
            req.params.problem_id,
            { $inc: { recomend: 1 } },
            { new: true }
        );

        if (!updatedProblem) {
            return next(createError(404, "Problem not found!"))
        }

        res.status(200).json(updatedProblem);
    } catch (error) {
        next(error);
    }
}

export const save = async (req, res, next) => {
    try {
        const updatedUser = await User.findById(req.params.user_id);

        if(updatedUser.saved_problems.includes(req.params.problem_id)) {
            return next(createError(403, "Problem already saved!"));
        }

        const updatedProblem = await Problem.findByIdAndUpdate(
            req.params.problem_id,
            { $inc: { saved: 1 } }, // ✅ saved ni 1 taga oshiramiz
            { new: true }
        );

        await User.findByIdAndUpdate(req.params.user_id, {
            $push: {
                saved_problems: req.params.problem_id
            }
        })


        if (!updatedProblem) {
            return next(createError(404, "Problem not found!"))
        }

        res.status(200).json({
            problem: updatedProblem,
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
}

export const unsave = async (req, res, next) => {
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(
            req.params.problem_id,
            { $inc: { saved: -1 } }, // ✅ saved ni 1 taga kamaytiramiz
            { new: true }
        );

        await User.findByIdAndUpdate(req.params.user_id, {
            $pull: {
                saved_problems: req.params.problem_id
            }
        })

        if (!updatedProblem) {
            return next(createError(404, "Problem not found!"))
        }

        res.status(200).json(updatedProblem);
    } catch (error) {
        next(error);
    }
}

export const getAll = async (req, res, next) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        if (category) {
            const categories = category.split(",");
            query.category = { $in: categories };
        }

        const problems = await Problem.find(query);
        res.status(200).json(problems);
    } catch (error) {
        next(error);
    }
}


export const getCategory = async (req, res, next) => {
    try {
        const { category } = req.body
        if (!category || !Array.isArray(category) || category.length === 0) {
            return next(createError(400, "Category must be a non-empty array!"));
        }

        const problems = await Problem.find({ category: { $in: category } });
        res.status(200).json(problems)
    } catch (error) {
        next(error)
    }
}

export const solve = async (req, res, next) => {
    try {
        const { problemId, solutionUserId, problemAuthorId, commentId } = req.body;

        if(req.user !== problemAuthorId) return next(createError(403, "You are not authorized to set a solution for this problem!"));

        if (!problemId || !solutionUserId || !commentId) {
            return next(createError(400, "Problem ID, solution user ID, and comment ID are required!"));
        }

        // Update the Problem with the solution comment ID
        const updatedProblem = await Problem.findByIdAndUpdate(
            problemId,
            { solution: commentId },
            { new: true }
        );

        // Update the User with the solved problem ID
        await User.findByIdAndUpdate(
            solutionUserId,
            { $push: {solutions: problemId} }
        );

        if (!updatedProblem) {
            return next(createError(404, "Problem not found!"));
        }

        res.status(200).json(updatedProblem);
    } catch (error) {
        next(error);
    }
}