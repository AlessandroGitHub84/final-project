import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Review = db.define('review', {
  userId: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  movieId: {
    type: DataTypes.STRING
  },
  review: {
    type: DataTypes.STRING(10000)
  },
  team: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  }

},
 {
  freezeTableName: true
});
 
export default Review;