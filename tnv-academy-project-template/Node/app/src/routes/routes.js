import express from "express";

const API_ROOT = '/api';

import { getMovie, getRandomMovies } from "../controllers/the-movie-db-controller.js";
import { getReviews,getReview, createReview, updateReview, deleteReview } from "../controllers/review-controller.js";

const router = express.Router();

router.get(`${API_ROOT}/review/`, getReviews);
router.get(`${API_ROOT}/review/:userId/:movieId`, getReview);
router.post(`${API_ROOT}/review`, createReview);
router.put(`${API_ROOT}/review/:id`, updateReview);
router.delete(`${API_ROOT}/review/:id`, deleteReview);

router.get(`${API_ROOT}/movies/random`, getRandomMovies);
router.get(`${API_ROOT}/movies/:id`, getMovie);


export default router;
