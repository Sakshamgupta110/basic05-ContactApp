import { useState, useEffect } from "react";
import { addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const AddAndUpdateContact = ({ isOpen, onClose, contact, isUpdate }) => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (isUpdate && contact) {
      setContactData({
        name: contact.name || "",
        email: contact.email || "",
      });
    } else {
      setContactData({
        name: "",
        email: "",
      });
    }
  }, [isUpdate, contact]);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await updateDoc(doc(db, "contacts", contact.id), contactData);
        toast.success("Contact Updated Successfully");
      } else {
        await addDoc(collection(db, "contacts"), contactData);
        toast.success("Contact Added Successfully");
      }
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isUpdate ? "Update Contact" : "Add Contact"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isUpdate ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAndUpdateContact; 