import React from 'react';

function ShowCourseComponent({ courses, filterCourseFunction, addCourseToCartFunction }) {
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {filterCourseFunction.map((course) => (
          <li key={course.id}>
            <img src={course.images[0]} alt={course.title} width="50" />
            <p>{course.title}</p>
            <p>₱{course.price}</p>
            <button onClick={() => addCourseToCartFunction(course)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowCourseComponent;
