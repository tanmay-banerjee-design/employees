import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../store/actions";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import "./list.css";

const EmployeeList = () => {
  const apiURL =
    process.env.REACT_APP_API_URL_ACTIONS || "REACT_APP_API_URL_ACTIONS";
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (employee) => {
    navigate(`/update/${employee.id}`, { state: { employee } });
  };

  const confirmDelete = async (id) => {
    const response = await fetch(`${apiURL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };
  const handleDelete = (id) => {
    const response = confirmDelete(id);
    if (!response.ok) {
      dispatch(deleteEmployee(id));
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h1>Employees table</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.map((employee) => {
              return (
                <TableRow key={employee?.id}>
                  <TableCell>{employee?.employee_name}</TableCell>
                  <TableCell>{employee?.employee_salary}</TableCell>
                  <TableCell>{employee?.employee_age}</TableCell>
                  <TableCell>
                    <img
                      src={employee?.profile_image}
                      alt="profile"
                      width="50px"
                      height="50px"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(employee)}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>{" "}
                    {"     "}
                    <Button
                      onClick={() => handleDelete(employee?.id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeList;
