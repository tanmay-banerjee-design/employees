import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEmployees } from "./store/actions";
import EmployeeList from "./Components/EmployeeList";
import EmployeeUpdate from "./Components/EmployeeUpdate";

const App = () => {
  const dispatch = useDispatch();
  const apiURL =
    process.env.REACT_APP_API_URL_EMPLOYEES ||
    "https://dummy.restapiexample.com/api/v1/employees";

  const getEmployees = async () => {
    const response = await fetch(apiURL).then();
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const employees = await response.json();
    return employees;
  };

  useEffect(() => {
    const dummyEmployees = [
      {
        id: 1,
        employee_name: "John Doe",
        employee_salary: 50000,
        image: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        id: 2,
        employee_name: "Jane Doe",
        employee_salary: 10000,
        image: "https://randomuser.me/api/portraits/men/2.jpg",
      },
    ];
    const data = getEmployees();
    const employees = data.length > 0 ? data : dummyEmployees;
    dispatch(fetchEmployees(employees));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/update/:id" element={<EmployeeUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
