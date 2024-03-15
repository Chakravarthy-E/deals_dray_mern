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
    gender: "",
    course: "",
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

  const handleGenderChange = (ev) => {
    setAddEmployee((prev) => ({
      ...prev,
      gender: ev.target.value,
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
          <div className="flex flex-col w-[90%] bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-200 rounded-t-xl">
              <h5 className="font-semibold text-lg">Edit Employee</h5>
              <MdClose
                size={25}
                onClick={() => close()}
                className="cursor-pointer"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center">
                <label htmlFor="name" className="w-32 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="px-3 py-2 border rounded-lg w-full outline-none"
                  placeholder={employeeData.name}
                  onChange={(ev) => addEmployeeChangeHandler(ev)}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="email" className="w-32 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="px-3 py-2 border rounded-lg w-full outline-none"
                  placeholder={employeeData.email}
                  onChange={(ev) => addEmployeeChangeHandler(ev)}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="mobile" className="w-32 font-semibold">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  className="px-3 py-2 border rounded-lg w-full outline-none"
                  placeholder={employeeData.mobile}
                  onChange={(ev) => addEmployeeChangeHandler(ev)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <p className="font-semibold">Gender:</p>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={employeeData.gender === "male"}
                    onChange={handleGenderChange}
                    className="mr-2 uppercase"
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={employeeData.gender === "female"}
                    onChange={handleGenderChange}
                    className="mr-2 uppercase"
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="font-semibold">Course:</p>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mca"
                    name="course"
                    checked={employeeData.course === "mca"}
                    value="mca"
                    onChange={(e) => addEmployeeChangeHandler(e)}
                    className="mr-2"
                  />
                  <label htmlFor="mca">MCA</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bca"
                    name="course"
                    value="bca"
                    checked={employeeData.course === "bca"}
                    onChange={(e) => addEmployeeChangeHandler(e)}
                    className="mr-2"
                  />
                  <label htmlFor="bca">BCA</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bsc"
                    name="course"
                    value="bsc"
                    checked={employeeData.course === "bsc"}
                    onChange={(e) => addEmployeeChangeHandler(e)}
                    className="mr-2"
                  />
                  <label htmlFor="bsc">BSC</label>
                </div>
              </div>
              <div className="flex items-center flex-row space-y-2">
                <p className="font-semibold">Select Designation</p>
                <select
                  name="designation"
                  onChange={(e) => addEmployeeChangeHandler(e)}
                  className="px-3 py-2 border rounded-md ml-2"
                >
                  <option
                    value="HR"
                    selected={employeeData.designation === "HR"}
                  >
                    HR
                  </option>
                  <option
                    value="Manager"
                    selected={employeeData.designation === "Manager"}
                  >
                    Manager
                  </option>
                  <option
                    value="Sales"
                    selected={employeeData.designation === "Sales"}
                  >
                    Sales
                  </option>
                </select>
              </div>
              <button
                onClick={() => setEditEmployee(true)}
                className="py-2 bg-gray-800 text-white rounded-lg w-full"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEmployee;
