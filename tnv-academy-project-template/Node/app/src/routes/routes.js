import express from "express";

const API_ROOT = '/api';

import { getRatings, getRating, createRating, updateRating, deleteRating } from "../controllers/ratings-controller.js";
import { getMovie, getRandomMovies } from "../controllers/the-movie-db-controller.js";
import { getReviews,getReview, createReview, updateReview, deleteReview } from "../controllers/review-controller.js";

const router = express.Router();

router.get(`${API_ROOT}/ratings`, getRatings);
router.get(`${API_ROOT}/ratings/:userId/:movieId`, getRating);
router.post(`${API_ROOT}/ratings`, createRating);
router.patch(`${API_ROOT}/ratings/:id`, updateRating);
router.delete(`${API_ROOT}/ratings/:id`, deleteRating);

router.get(`${API_ROOT}/review/`, getReviews);
router.get(`${API_ROOT}/review/:userId/:movieId`, getReview);
router.post(`${API_ROOT}/review`, createReview);
router.patch(`${API_ROOT}/review/:id`, updateReview);
router.delete(`${API_ROOT}/review/:id`, deleteReview);

router.get(`${API_ROOT}/movies/random`, getRandomMovies);
router.get(`${API_ROOT}/movies/:id`, getMovie);


export default router;
