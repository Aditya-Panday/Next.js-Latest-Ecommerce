import React, { useState } from "react";
import { useAddSubcategoryMutation } from "@/lib/features/adminApi/subcategorySlice";

const AddSubcategory = ({ subModal, setSubModal }) => {
  const [subName, setSubName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [addSub, { isLoading }] = useAddSubcategoryMutation();

  const handleSubmit = async () => {
    setErrorMsg("");
    try {
      if (!subName.trim()) {
        setErrorMsg("Subcategory name is required.");
        return;
      }

      await addSub(subName).unwrap();
      setSubModal(false);
      setSubName("");
    } catch (err) {
      setErrorMsg(err?.data?.message || "Failed to subcategory brand.");
    } finally {
      setTimeout(() => {
        setErrorMsg("");
      }, 1500);
    }
  };

  const handleclose = async () => {
    setSubModal(false);
    setSubName("");
  };
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        !subModal ? "hidden" : ""
      }`}
      id="modal"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-slate-800 opacity-75"
            onClick={!isLoading ? handleclose : undefined}
          ></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 "
                  id="modal-title"
                >
                  Add Subcategory
                </h3>
                <hr className="my-4" />
                <div className="mt-2">
                  {errorMsg && (
                    <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
                  )}
                  <input
                    className="border border-gray-300 rounded-lg w-full py-2 px-4 mb-4 "
                    placeholder="Enter Subcategory Name"
                    type="text"
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleSubmit(false)}
              disabled={isLoading}
            >
              Save
            </button>
            <button
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleclose}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubcategory;
