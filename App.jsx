import { useEffect, useState } from "react";
import { courses } from "./data/courses";
import CourseList from "./components/CourseList";

function App() {
  const [query, setQuery] = useState("");
  const [quote, setQuote] = useState("Stay motivated and keep learning!");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() => {});
  }, []);

  const filteredCourses = courses.filter((course) => {
    const text = query.toLowerCase();
    return (
      course.name.toLowerCase().includes(text) ||
      course.category.toLowerCase().includes(text)
    );
  });

  return (
    <div className="container">
      <h1>Course Finder</h1>

      <p className="quote">"{quote}"</p>

      <input
        type="text"
        placeholder="Search by name or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <CourseList courses={filteredCourses} />
    </div>
  );
}

export default App;
