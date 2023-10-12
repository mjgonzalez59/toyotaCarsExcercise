// import carsFromFile from "./cars.js";

class Toyota {
  constructor(){
    // Toyota Class will have only these 3 types of cars
    this.trucks = [];
    this.vehicle = [];
    this.suv = [];
  }
  // Add cars to each array
  addCar(car){
    let isInArray;
    switch(car.type.toLowerCase()){
      case "truck":
        isInArray = this.trucks.find(truck => truck.name == car.name);
        if(!isInArray){
          this.trucks.push(car);
        }
        break;
      case "vehicle":
        isInArray = this.vehicle.find(vehicle => vehicle.name == car.name);
        if(!isInArray){
          this.vehicle.push(car);
        }
        break;
      case "suv":
        isInArray = this.suv.find(suv => suv.name == car.name);
        if(!isInArray){
          this.suv.push(car);
        }
        break;
    }
  }
  // Get cars according to the type received
  getCars(type){
    switch(type.toLowerCase()){
      case "truck":
        return this.trucks;
      case "vehicle":
        return this.vehicle;
      case "suv":
        return this.suv;
    }
  }
}

// FakeURL simulating the fetching
const CARS_API = "https://fakeURL.com";

const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Fetching cars from ${url}`);
      const carsArray = carsFromFile;
      // const carsArray = carsFromFile();
      // Validating the array that was imported from another js file
      if(carsArray.length <= 0){
        reject("Cars Array is Empty");
      }else{
        resolve(carsArray);
      }
    }, 500);
  });
}

const getRandomNumber = (length) => {
  return Math.floor(Math.random() * length);
}

const addRandomCars = (toyotaObj) => {
  return new Promise((resolve, reject) => {
    fakeFetch(CARS_API).then(cars => {
      // Validating the array that was received from promise in the resolve
      if(cars.length <= 0){
        reject("There are no cars to add");
      }else{
        // Iterating a i = randomNumber times
        for(let i = 0; i < getRandomNumber(cars.length); i++){
          // Adding a randomNumber car in the array received => carArray[randomNumber]
          toyotaObj.addCar(cars[getRandomNumber(cars.length)]);
        }
        resolve(toyotaObj);
      }
    }).catch(err => {
      console.error(err);
    });
  });
}

const printCars = (toyotaObj, type) => {
  const toyotaCars = toyotaObj.getCars(type);
  console.log(`You have: ${toyotaCars.length} ${type.toUpperCase()}S. `);
  // Validating the array per type to show the cars inside
  if(toyotaCars.length > 0){
    console.log(`Here is your list:`);
    toyotaCars.forEach((car) => {
      console.log(`-${car.name} ${car.year}`);
    });
  }
}

function getMyCars(...args) {
  const carTypes = args;
  // Validating the existence of any arguments
  if(carTypes.length <= 0){
    console.error("GetMyCars function needs arguments, please send 'truck', 'vehicle' or 'suv' as parameter");
  }else{
    carTypes.forEach(carType => {
      // Creating the Toyota Object,  and 
      let myCarList = new Toyota();
      // Adding randomCars to each array type
      addRandomCars(myCarList).then((toyota) => {
        // Printing the lists type
        printCars(toyota, carType);
      }).catch(err =>{
        console.error(err);
      });
    });
  }
}

// let myTrucks = new Toyota();
// addRandomCars(myTrucks).then((toyota) => {
//   printCars(toyota, "truck");
// }).catch(err =>{
//   console.error(err);
// });
// This await syntaxis replaces the one from above ^^^ 
// myTrucks = await addRandomCars(myTrucks);
// printCars(myTrucks, "truck");


getMyCars("truck", "vehicle", "suv");
// getMyCars("truck", "vehicle");
// getMyCars("truck", "suv");
// getMyCars("vehicle", "suv");
// getMyCars();