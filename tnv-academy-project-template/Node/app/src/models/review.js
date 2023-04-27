import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Review = db.define('review', {
  userId: {
    type: DataTypes.STRING
  },
  movieId: {
    type: DataTypes.STRING
  },
  review: {
    type: DataTypes.STRING
  },
  team: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER
  }
},
 {
  freezeTableName: true
});
 
export default Review;