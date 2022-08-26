const { Pizza } = require('../models');


// CRUD methods below

const pizzaController = {
  // get all pizzas 
  // serves as the callback function for the GET /api/pizzas route
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id
getPizzaById({ params }, res) {
  Pizza.findOne({ _id: params.id })
    .populate({
      path: 'comments',
      select: '-__v'
    })
    .select('-__v')
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},

  // createPizza
  // method for handling POST /api/pizzas
createPizza({ body }, res) {
  // In MongoDB, the methods for adding data to a collection are .insertOne() or .insertMany(). But in Mongoose, we use the .create() method, which will actually handle either one or multiple inserts!
  Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.status(400).json(err));
},

// update pizza by id
// method for updating a pizza when we make a request to PUT /api/pizzas/:id
updatePizza({ params, body }, res) {
  Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
},

// delete pizza
//  method to delete a pizza from the database when we make a request to DELETE /api/pizzas/:id
deletePizza({ params }, res) {
  Pizza.findOneAndDelete({ _id: params.id })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
}



}

module.exports = pizzaController;