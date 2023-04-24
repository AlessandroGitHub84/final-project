import express from "express";

const API_ROOT = '/api';

import { getRating, createRating, updateRating, deleteRating } from "../controllers/ratings-controller.js";
import { getMovie, getRandomMovies } from "../controllers/the-movie-db-controller.js";
import { getReview, createReview, updateReview, deleteReview } from "../controllers/review-controller.js";

const router = express.Router();

router.get(`${API_ROOT}/rating/:userId/:movieId`, getRating);
router.post(`${API_ROOT}/rating`, createRating);
router.patch(`${API_ROOT}/rating/:id`, updateRating);
router.delete(`${API_ROOT}/rating/:id`, deleteRating);

router.get(`${API_ROOT}/review/:userId/:movieId`, getReview);
router.post(`${API_ROOT}/review`, createReview);
router.patch(`${API_ROOT}/review/:id`, updateReview);
router.delete(`${API_ROOT}/review/:id`, deleteReview);

router.get(`${API_ROOT}/movies/random`, getRandomMovies);
router.get(`${API_ROOT}/movies/:id`, getMovie);


export default router;
