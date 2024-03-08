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
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.name}
                  onChange={(e) =>
                    setAddEmployee((data) => ({
                      ...data,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="email" className="w-44">
                  Email
                </label>
                <input
                  type="email"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.email}
                  onChange={(e) =>
                    setAddEmployee((data) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="mobile" className="w-44">
                  Mobile
                </label>
                <input
                  type="tel"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.mobile}
                  onChange={(e) =>
                    setAddEmployee((data) => ({
                      ...data,
                      mobile: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="gender" className="w-44">
                  Gender
                </label>
                <input
                  type="text"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.gender}
                  onChange={(e) =>
                    setAddEmployee((data) => ({
                      ...data,
                      gender: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="course" className="w-44">
                  Course
                </label>
                <input
                  type="text"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.course}
                  onChange={(e) =>
                    setAddEmployee((data) => ({
                      ...data,
                      course: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="desgnination" className="w-44">
                  Desgination
                </label>
                <input
                  type="text"
                  className="px-1 py-2 border  rounded-lg w-full  outline-none "
                  value={addEmployee.designation}
                  onChange={(e) =>
                    setAddEmployee((data) => ({
                      ...data,
                      designation: e.target.value,
                    }))
                  }
                />
              </div>
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
