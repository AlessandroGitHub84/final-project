import Review from "../models/review.js";

// Restituisce tutte le recensioni
export const getReviews = async (req,res) => {
    try {
        const review = await Review.findAll({
            // non vengono specificati filtri di ricerca
        });
        
        if (review) {
            res.send(review);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Restituisce una specifica recensione
export const getReview = async (req, res) => {
    try {
        const review = await Review.findOne({
            where: {
                userId: req.params.userId,
                movieId: req.params.movieId,
            }
        });
        
        if (review) {
            res.send(review);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Crea una nuova recensione
export const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Recensione creata",
            data: review
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Aggiorna una specifica recensione
export const updateReview = async (req, res) => {
    try {
        const review = await Review.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Recensione aggiornata",
            data: review
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Elimina una specifica recensione
export const deleteReview = async (req, res) => {
    try {
        await Review.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Recensione eliminata"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
