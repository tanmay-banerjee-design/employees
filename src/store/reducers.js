import { FETCH_EMPLOYEES, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from "./actions";

const initialState = {
  employees: [],
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return { ...state, employees: action.payload };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    default:
      return state;
  }
};
