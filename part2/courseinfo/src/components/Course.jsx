const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => (
  <b>
    total of {parts.reduce(
      (total, part) => total + part.exercises, 0
    )} exercises
  </b>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>
);

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course
