// Define action types
export const FETCH_EMPLOYEES = "FETCH_EMPLOYEES";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

// Action creators
export const fetchEmployees = (employees) => ({
  type: FETCH_EMPLOYEES,
  payload: employees,
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});
