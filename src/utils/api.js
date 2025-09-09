import axios from "axios";

/*
  INSTRUCTIONS:
  - / create a constant API_URL that contains the base URL for the API
  - / create a function fetchCourses that fetches the courses from the API
  - / create a function fetchCategories that fetches the categories from the API
  - / create a function fetchDifficulties that fetches the difficulties from the API
  - / create a function fetchPrices that fetches the prices from the API
*/

const API_URL = "http://localhost:5123/";

// courses
export async function fetchCourses(category, difficulty, price, search, sort) {
  let full_API_URL = API_URL + "courses";

  const queryParams = {};

  // check if queries exist
  if (category !== "All Categories") {
    queryParams.category = category;
  }
  if (difficulty !== "All Difficulties") {
    queryParams.difficulty = difficulty;
  }
  if (price !== "All Prices") {
    queryParams.price = price;
  }
  if (search !== "") {
    queryParams.search = search;
  }
  if (sort !== "No Sorting") {
    queryParams.sort = sort;
  }

  const queryString = new URLSearchParams(queryParams).toString();

  if (queryString) {
    full_API_URL += "?" + queryString;
  }

  console.log(full_API_URL); // for checking ;-;

  const response = await axios.get(full_API_URL);
  return response.data;
}

// categories
export async function fetchCategories() {
  const response = await axios.get(API_URL + "categories");
  return response.data;
}

// difficulties
export async function fetchDifficulties() {
  const response = await axios.get(API_URL + "difficulties");
  return response.data;
}

// prices
export async function fetchPrices() {
  const response = await axios.get(API_URL + "prices");
  return response.data;
}
