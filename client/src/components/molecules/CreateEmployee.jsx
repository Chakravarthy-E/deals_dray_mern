import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import client, { apiList } from "../../utils/apiSerives";

const CreateEmployee = ({ open, close }) => {
  const [addEmployee, setAddEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    course: "",
    designation: "",
  });

  const [error, seterror] = useState({
    nameError: "",
    emailError: "",
    mobileError: "",
    genderError: "",
    courseError: "",
    designationError: "",
  });

  const validations = () => {
    if (addEmployee.name === "") {
      seterror((prev) => ({
        ...prev,
        nameError: "Please add a name",
      }));
    }
    if (addEmployee.email === "") {
      seterror((prev) => ({
        ...prev,
        emailError: "Please add a email",
      }));
    }
    if (addEmployee.gender === "") {
      seterror((prev) => ({
        ...prev,
        genderError: "Please add a gender",
      }));
    }
    if (addEmployee.course === "") {
      seterror((prev) => ({
        ...prev,
        courseError: "Please add a course",
      }));
    }
    if (addEmployee.designation === "") {
      seterror((prev) => ({
        ...prev,
        designationError: "Please add a designation",
      }));
    }
    return;
  };

  const addEmployeeChangeHandler = (ev) => {
    setAddEmployee((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleCreateEmployee = async () => {
    validations();
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
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.name}
                  onChange={(e) => addEmployeeChangeHandler(e)}
                />
              </div>
              {error.nameError && error.nameError}
              <div className="flex items-center">
                <label htmlFor="email" className="w-44">
                  Email
                </label>
                <input
                  type="email"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.email}
                  name="email"
                  onChange={(e) => addEmployeeChangeHandler(e)}
                />
              </div>
              {error.emailError && error.emailError}
              <div className="flex items-center">
                <label htmlFor="mobile" className="w-44">
                  Mobile
                </label>
                <input
                  type="tel"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.mobile}
                  name="mobile"
                  onChange={(e) => addEmployeeChangeHandler(e)}
                />
              </div>
              {error.mobileError && error.mobileError}
              <div className="flex items-center">
                <label htmlFor="gender" className="w-44">
                  Gender
                </label>
                <input
                  type="text"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.gender}
                  name="gender"
                  onChange={(e) => addEmployeeChangeHandler(e)}
                />
              </div>
              {error.genderError && error.genderError}
              <div className="flex items-center">
                <label htmlFor="course" className="w-44">
                  Course
                </label>
                <input
                  type="text"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.course}
                  name="course"
                  onChange={(e) => addEmployeeChangeHandler(e)}
                />
              </div>
              {error.courseError && error.courseError}
              <div className="flex items-center">
                <label htmlFor="desgnination" className="w-44">
                  Desgination
                </label>
                <input
                  type="text"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.designation}
                  name="designation"
                  onChange={(e) => addEmployeeChangeHandler(e)}
                />
              </div>
              {error.designationError && error.designationError}
            </div>
            <button
              onClick={handleCreateEmployee}
              className="py-2 w-full bg-gray-800 text-white"
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
