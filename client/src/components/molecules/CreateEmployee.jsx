import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import client, { apiList } from "../../utils/apiSerives";

const CreateEmployee = ({ open, close }) => {
  const [addEmployee, setAddEmployee] = useState({
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

  const addEmployeeChangeHandler = (ev) => {
    setAddEmployee((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleCreateEmployee = async () => {
    try {
      const response = await client.post(apiList.EMPLOYEE_CREATE, addEmployee);
      if (response.status === 201) {
        alert("Employee created successfully");
        close();
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed z-50 inset-0 text-xs bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-[90%] bg-white rounded-lg shadow-md">
            <div className="flex flex-row w-full items-center justify-between px-6 py-4 bg-gray-200 rounded-t-lg">
              <h5 className="font-semibold text-lg">Add Employee</h5>
              <MdClose
                size={25}
                onClick={() => close()}
                className="cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-2 items-center">
              <div>
                <div className="px-10 py-6 space-y-2">
                  <div className="flex items-center">
                    <label htmlFor="name" className="w-44">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="px-4 py-2 border rounded-lg w-full outline-none"
                      value={addEmployee.name}
                      onChange={(e) => addEmployeeChangeHandler(e)}
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="email" className="w-44">
                      Email
                    </label>
                    <input
                      type="email"
                      className="px-4 py-2 border rounded-lg w-full outline-none"
                      value={addEmployee.email}
                      name="email"
                      onChange={(e) => addEmployeeChangeHandler(e)}
                    />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="mobile" className="w-44">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      className="px-4 py-2 border rounded-lg w-full outline-none"
                      value={addEmployee.mobile}
                      name="mobile"
                      onChange={(e) => addEmployeeChangeHandler(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="px-10 py-6 space-y-2">
                <div className="flex  flex-row  items-center">
                  <p className="mr-2">Select Gender:</p>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={(e) => addEmployeeChangeHandler(e)}
                  />
                  <label htmlFor="male" className="mr-1">
                    Male
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={(e) => addEmployeeChangeHandler(e)}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div className="flex  flex-row space-x-3 items-center">
                  <p>Select Course:</p>
                  <div>
                    <input
                      type="checkbox"
                      id="mca"
                      name="course"
                      value="mca"
                      onChange={(e) => addEmployeeChangeHandler(e)}
                    />
                    <label htmlFor="mca" className="mr-4">
                      MCA
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="bca"
                      name="course"
                      value="bca"
                      onChange={(e) => addEmployeeChangeHandler(e)}
                    />
                    <label htmlFor="bca" className="mr-4">
                      BCA
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="bsc"
                      name="course"
                      value="bsc"
                      onChange={(e) => addEmployeeChangeHandler(e)}
                    />
                    <label htmlFor="bsc">BSC</label>
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="mr-4">Select Designation:</p>
                  <select
                    name="designation"
                    id="designation"
                    onChange={(e) => addEmployeeChangeHandler(e)}
                    className="px-4 py-2 border rounded-md"
                  >
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              onClick={handleCreateEmployee}
              className="py-2 w-full bg-gray-800 text-white rounded-b-lg"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEmployee;
