import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import client, { apiList } from "../../utils/apiSerives";

const EditEmployee = ({ open, close, editId }) => {
  console.log(editId);
  const [editEmployee, setEditEmployee] = useState(false);
  const [getEmployeeDetails, setGetEmployeeDetails] = useState(true);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: {
      male: "male",
      female: "female",
    },
    course: {
      mca: "mca",
      bca: "bca",
      bsc: "bsc",
    },
    designation: "",
  });
  const [addEmployee, setAddEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    course: "",
    designation: "",
  });

  const addEmployeeChangeHandler = (ev) => {
    setAddEmployee((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  useEffect(() => {
    async function EditEmployeeFunc() {
      try {
        const response = await client.put(
          `${apiList.UPDATE_EMPLOYEE}/${editId}`,
          addEmployee
        );
        if (response.status === 200) {
          alert("successfully updated");
          close();
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (editEmployee) {
      EditEmployeeFunc();
      setEditEmployee(false);
    }
  }, [editEmployee, editId, addEmployee]);

  useEffect(() => {
    async function getEmployee() {
      try {
        const response = await client.get(
          `${apiList.GET_EMPLOYEE_BY_ID}/${editId}`
        );
        if (response.status === 200) {
          setEmployeeData({
            name: response.data.employee.name,
            email: response.data.employee.email,
            mobile: response.data.employee.mobile,
            course: response.data.employee.course,
            gender: response.data.employee.gender,
            designation: response.data.employee.designation,
          });
          console.log(employeeData);
        } else {
          alert("failed to fetch employee");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (getEmployeeDetails) {
      getEmployee();
      setGetEmployeeDetails(false);
    }
  }, [getEmployeeDetails, editId]);
  return (
    <>
      {open && (
        <div className="fixed z-50 inset-0 text-xs bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-[90%] bg-white">
            <div className="flex flex-row w-full items-center justify-between px-6 py-4   rounded-tr-2xl border-b  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6 ">
                <h5 className="font-semibold ">Add Employee</h5>
              </div>
              <MdClose
                size={25}
                onClick={() => close()}
                className="cursor-pointer"
              />
            </div>
            <div className="px-10 py-2 space-y-1.5">
              <div className="flex items-center">
                <label htmlFor="name" className="w-44">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="px-1 py-2 border placeholder-black  rounded-lg w-full  outline-none "
                  placeholder={employeeData.name}
                  onChange={(ev) => {
                    addEmployeeChangeHandler(ev);
                  }}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="email" className="w-44">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="px-1 py-2 border placeholder-black   rounded-lg w-full  outline-none "
                  placeholder={employeeData.email}
                  onChange={(ev) => {
                    addEmployeeChangeHandler(ev);
                  }}
                />
              </div>
              <div className="flex items-start">
                <label htmlFor="mobile" className="w-44">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  className="px-1 py-2 border placeholder-black   rounded-lg w-full  outline-none "
                  placeholder={employeeData.mobile}
                  onChange={(ev) => {
                    addEmployeeChangeHandler(ev);
                  }}
                />
              </div>
              <div className="flex items-start flex-col">
                <p>Select Gender</p>
                <div>
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value={employeeData.gender.male}
                    onChange={(e) => addEmployeeChangeHandler(e)}
                  />
                    <label htmlFor="course">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value={employeeData.gender.female}
                    onChange={(e) => addEmployeeChangeHandler(e)}
                  />
                    <label htmlFor="course">Female</label>
                </div>
              </div>

              <div className="flex items-start flex-col">
                <p>Select Course</p>
                <div>
                  <input
                    type="checkbox"
                    id="course"
                    name="course"
                    value={employeeData.course.mca}
                    onChange={(e) => addEmployeeChangeHandler(e)}
                  />
                  <label htmlFor="course">MCA</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="course"
                    name="course"
                    value={employeeData.course.bsc}
                    onChange={(e) => addEmployeeChangeHandler(e)}
                  />
                  <label htmlFor="course">BCA</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="course"
                    name="course"
                    value={employeeData.course.bsc}
                    onChange={(e) => addEmployeeChangeHandler(e)}
                  />
                  <label htmlFor="course">BSC</label>
                </div>
              </div>

              <div className="flex items-center">
                <p>Select Desgnination</p>
                <select
                  name="designation"
                  id="designation"
                  onChange={(e) => addEmployeeChangeHandler(e)}
                >
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setEditEmployee(true)}
              className="py-2 w-full bg-gray-800 text-white"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEmployee;
