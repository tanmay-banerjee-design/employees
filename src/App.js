import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEmployees } from "./store/actions";
import EmployeeList from "./Components/EmployeeList";
import EmployeeUpdate from "./Components/EmployeeUpdate";

const App = () => {
  const dummyEmployees = [
    {
      id: 1,
      employee_name: "John Doe",
      employee_salary: 50000,
      employee_age: 22,
      profile_image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      employee_name: "Jane Doe",
      employee_salary: 10000,
      employee_age: 22,
      profile_image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL_EMPLOYEES;

  const getEmployees = async () => {
    const response = await fetch(apiURL);
    const employees = await response.json();
    return employees;
  };

  useEffect(() => {
    getEmployees()
      .then((employees) => {
        setState(employees?.data);
      })
      .catch((error) => {
        console.error("Failed to fetch employees:", error);
      });
  }, []);

  const employees = state?.length > 0 ? state : dummyEmployees;
  const employeesPic = employees?.map((e, index) => {
    return {
      ...e,
      profile_image: `https://randomuser.me/api/portraits/women/${
        index + 1
      }.jpg`,
    };
  });
  dispatch(fetchEmployees(employeesPic));

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
