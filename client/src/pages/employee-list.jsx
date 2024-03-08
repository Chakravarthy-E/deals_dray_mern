import React, { useEffect, useState } from "react";
import client, { apiList } from "../utils/apiSerives";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import CreateEmployee from "../components/molecules/CreateEmployee";
import EditEmployee from "../components/molecules/EditEmployee";

const EmployeeList = () => {
  const [invokeEmployees, setInvokeEmployees] = useState(true);
  const [data, setData] = useState([]);
  const [createEmployeeModel, setCreateEmployeeModel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  console.log(editId);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await client.get(apiList.GET_EMPLOYEES);
        if (response.status === 200) {
          setData(response.data.employees);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    if (invokeEmployees) {
      fetchEmployees();
      setInvokeEmployees(false);
    }
  }, [invokeEmployees]);

  const handleCloseModal = () => {
    setCreateEmployeeModel(false);
    setInvokeEmployees(true);
  };

  const handleCloseEditModal = () => {
    setEditEmployeeModal(false);
    setInvokeEmployees(true);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await client.delete(`${apiList.DELETE_EMPLOYEE}/${id}`);
      if (response.status === 200) {
        alert("Successfully deleted");
        setInvokeEmployees(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="py-20">
        <div className="flex justify-between items-center px-5 py-1">
          <p className="text-xl font-semibold my-1">Employees List</p>
          <button
            className="px-3 py-1 bg-gray-800 text-white rounded-md"
            onClick={() => setCreateEmployeeModel(true)}
          >
            Create Employee
          </button>
        </div>
        <div className="h-full overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 z-10 border ">
              <tr>
                <th scope="col" className="text-center px-4 py-3">
                  unique Id
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Name
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Email
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Mobile
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Gender
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Course
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Desgination
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Created At
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((emp, index) => {
                return (
                  <tr className="font-semibold text-[#707070]" key={index}>
                    <td className="text-center px-4 py-4 ">{index + 1}</td>
                    <td className="text-center px-4 py-4 ">{emp.name}</td>
                    <td className="text-center px-4 py-4 ">{emp.email}</td>
                    <td className="text-center px-4 py-4 ">{emp.mobile}</td>
                    <td className="text-center px-4 py-4 ">{emp.gender}</td>
                    <td className="text-center px-4 py-4 ">{emp.course}</td>
                    <td className="text-center px-4 py-4 ">
                      {emp.designation}
                    </td>
                    <td className="text-center px-4 py-4 ">{emp?.createdAt}</td>
                    <td className="text-center px-4 py-4 ">
                      <div className="flex flex-row items-center space-x-3">
                        <MdOutlineEditNote
                          size={25}
                          onClick={() => {
                            setEditEmployeeModal(true);
                            setEditId(emp.id);
                          }}
                        />
                        <MdDelete
                          size={25}
                          onClick={() => handleDeleteEmployee(emp.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <CreateEmployee open={createEmployeeModel} close={handleCloseModal} />
      {editEmployeeModal && (
        <EditEmployee
          close={handleCloseEditModal}
          open={editEmployeeModal}
          editId={editId}
        />
      )}
    </>
  );
};

export default EmployeeList;
