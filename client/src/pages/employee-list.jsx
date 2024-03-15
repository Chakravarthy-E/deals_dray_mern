import React, { useEffect, useState } from "react";
import client, { apiList } from "../utils/apiSerives";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import CreateEmployee from "../components/molecules/CreateEmployee";
import EditEmployee from "../components/molecules/EditEmployee";
import moment from "moment";

const EmployeeList = () => {
  const [invokeEmployees, setInvokeEmployees] = useState(true);
  const [data, setData] = useState([]);
  const [createEmployeeModel, setCreateEmployeeModel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchQueary = (e) => {
    setSearchQuery(e.target.value);
    setInvokeEmployees(true);
  };

  const filteredData = data.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="py-20">
        <div className="flex justify-between items-center px-5 py-2">
          <div className="flex space-x-3">
            <p className="text-xl font-semibold my-1">Employees List</p>
            <input
              placeholder="Search Employees"
              className="border border-gray-500 px-3 py-1 rounded-lg"
              onChange={handleSearchQueary}
            />
          </div>
          <div className="flex space-x-3 items-center">
            <p>Total Count: {filteredData?.length}</p>
            <button
              className="px-3 py-1 bg-gray-800 text-white rounded-md"
              onClick={() => setCreateEmployeeModel(true)}
            >
              Create Employee
            </button>
          </div>
        </div>
        <div className="h-full overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 z-10 border ">
              <tr className="bg-slate-200">
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
                  Desgination
                </th>
                <th scope="col" className="text-center px-4 py-3">
                  Course
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
              {filteredData.length > 0 ? (
                filteredData?.map((emp, index) => {
                  return (
                    <tr
                      className="font-semibold text-[#707070] border"
                      key={index}
                    >
                      <td className="text-center px-4 py-4 ">{index + 1}</td>
                      <td className="text-center px-4 py-4 ">{emp.name}</td>
                      <td className="text-center px-4 py-4 ">{emp.email}</td>
                      <td className="text-center px-4 py-4 ">{emp.mobile}</td>
                      <td className="text-center px-4 py-4 uppercase ">
                        {emp.gender}
                      </td>
                      <td className="text-center px-4 py-4 uppercase ">
                        {emp.designation}
                      </td>
                      <td className="text-center px-4 py-4 uppercase ">
                        {emp.course}
                      </td>
                      <td className="text-center px-4 py-4 ">
                        {moment(emp.createdAt).format("DD.MM.YYYY")}
                      </td>
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
                })
              ) : (
                <p className="flex items-center justify-center py-3  text-center">
                  No Data Found
                </p>
              )}
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
