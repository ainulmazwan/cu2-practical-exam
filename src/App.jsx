import React, { useState, useEffect } from "react";
/*
  INSTRUCTION:
  - / import fetchCourses, fetchCategories, fetchDifficulties, fetchPrices functions from the utils/api.js file
*/
import {
  fetchCourses,
  fetchCategories,
  fetchDifficulties,
  fetchPrices,
} from "./utils/api";

function App() {
  /*
  INSTRUCTIONS:
  - / use useState to store the data for the courses, categories, difficulties, and prices
  - / use useState to store the data for the category, difficulty, price, search, and sort
  */
 
  // data states
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [prices, setPrices] = useState([]);

  // serach/filter/sort states
  const [category, setCategory] = useState("All Categories");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [price, setPrice] = useState("All Prices");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("No Sorting");

  /*
  INSTRUCTIONS:
  - / use useEffect to fetch the data for the courses using the fetchCourses function
  - / use useEffect to fetch the data for the categories using the fetchCategories function
  - / use useEffect to fetch the data for the difficulties using the fetchDifficulties function
  - / use useEffect to fetch the data for the prices using the fetchPrices function
  */

  // fetch courses
  useEffect(() => {
    fetchCourses(category, difficulty, price, search, sort).then((data) => {
      setCourses(data);
    });
  }, [category, difficulty, price, search, sort]);

  // fetch categories
  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  // fetch difficulties
  useEffect(() => {
    fetchDifficulties().then((data) => {
      setDifficulties(data);
    });
  }, []);

  // fetch prices
  useEffect(() => {
    fetchPrices().then((data) => {
      setPrices(data);
    });
  }, []);

  return (
    <div className="app">
      <h1>Top 20 Programming Courses</h1>
      {/*
      INSTRUCTIONS:
      - / Add a search input for searching by title
      - / Add a selector for filtering by category
      - / Add a selector for filtering by difficulty
      - / Add a selector for filtering by price
      - / Add a selector for sorting
      */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* filter by category */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All Categories" key={"All Categories"}>
            All Categories
          </option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        {/* filter by difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="All Difficulties">All Difficulties</option>
          {difficulties.map((difficulty) => (
            <option value={difficulty} key={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
        {/* filter by price */}
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="All Prices">All Prices</option>
          {prices.map((price) => (
            <option value={price} key={price}>
              {price}
            </option>
          ))}
        </select>
        {/* sorting */}
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="No Sorting">No Sorting</option>
          <option value="title">Sort by Title</option>
          <option value="difficulty">Sort by Difficulty</option>
        </select>
      </div>
      {/*
      INSTRUCTIONS:
      - / Display the courses in the following card format:
        - 3 columns in a row for desktop
        - 2 columns in a row for tablet
        - 1 column in a row for mobile
      - / For each course, display the following information in the card:
        - Course category
        - Course title
        - Course difficulty
        - Course price
      - / If no courses are found, display a message saying "No courses found"
      */}
      <div className="card-container">
        {courses.length === 0 ? (
          <p>No courses Found</p>
        ) : (
          courses.map((course) => (
            <div className="card" key={course.title}>
              <p className="card-category">{course.category}</p>
              <p className="card-title">{course.title}</p>
              <div className="difficulty-price">
                <p className="card-difficulty">
                  Difficulty: {course.difficulty}
                </p>
                <p className="card-price">Price: {course.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
