import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Paper, Typography, Avatar } from "@mui/material";

const EmployeeUpdate = () => {
  const apiURL =
    process.env.REACT_APP_API_URL_ACTIONS || "REACT_APP_API_URL_ACTIONS";
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState(location.state.employee);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  const updateData = async (employee) => {
    const response = await fetch(`${apiURL}/update/${employee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: employee?.employee_name,
        salary: employee?.employee_salary,
        image: employee?.image,
      }),
    });
    return response;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = updateData(employee);
    if (!response.ok) {
      dispatch(updateEmployee(employee));
    }
    navigate("/");
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4">
        <Avatar src={employee.image} alt={employee.employee_name} />
        {employee.employee_name}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="employee_name"
          label="Name"
          value={employee?.employee_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="employee_salary"
          label="salary"
          value={employee?.employee_salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Paper>
  );
};

export default EmployeeUpdate;
