const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // .then(() => {
  //   Recipe.create(data[0]) // input is een array, daarom hiermet een [0] gewerkt, met create kan je maar 1 document/record tegelijk toevoegen
  //     .then((result) => {
  //       console.log(result.title);
  //     })
  //     .catch((error) => {
  //       console.error("error loading recipe", error);
  //     })
  .then(() => {
    return Recipe.insertMany(data) // hiermee kan je een array van data invoeren
      .then((results) => {
        results.forEach((recipe) => {
          // hier ben ik in de array gegaan met een forEach loop en heb daarna op elk element in de array de insertMany toegepast.
          console.log(`added: ${recipe}`);
        });
      })
      .catch((error) => {
        console.error("error loading many recipes", error);
      });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      // return is nodig om het terug te geven aan de collectie
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .catch((error) => console.log("Error occured =>", error))
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" }).then((response) => {
      console.log("carrot cake", response);
      mongoose.connection.close();
    });
  })
  .catch((error) => {
    console.log("error has occurred while deleting");
  });

// });
