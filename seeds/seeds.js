const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const users = require('./users.json');
const posts = require('./posts.json');
const comments = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(posts);

  await Comment.bulkCreate(comments);

  process.exit(0);
};

seedDatabase();