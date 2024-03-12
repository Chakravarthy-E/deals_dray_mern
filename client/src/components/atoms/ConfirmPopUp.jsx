import React from "react";
import { MdClose } from "react-icons/md";
import client, { apiList } from "../../utils/apiSerives";

const ConfirmPopUp = ({ open, close, deleteId }) => {
  const handleDeleteEmployee = async () => {
    try {
      const response = await client.delete(
        `${apiList.DELETE_EMPLOYEE}/${deleteId}`
      );
      if (response.status === 200) {
        alert("Successfully deleted");
        setInvokeEmployees(true);
        close();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {open && (
        <div className="fixed z-50 inset-0 text-xs bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-96 bg-white">
            <div className="flex flex-row w-full items-center justify-between px-6 py-4   rounded-tr-2xl border-b  rounded-tl-2xl">
              <div className="flex flex-row items-center justify-between space-x-3 ">
                <h5 className="font-semibold text-base">Delete Employee</h5>
              </div>
              <MdClose
                size={25}
                onClick={() => close()}
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-base">Are you sure you want to delete ?</h1>
              <div className="my-4 space-x-5">
                <button
                  className="bg-red-500 px-3 py-1 rounded text-base text-white"
                  onClick={handleDeleteEmployee}
                >
                  Yes
                </button>
                <button
                  className="bg-black px-3 py-1 rounded text-base text-white"
                  onClick={() => close()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmPopUp;
