import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactSnapShot = await getDocs(contactsRef);
        const contactList = contactSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setContacts(contactList);
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);
  
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>
          <div className="">
            <AiFillPlusCircle 
              className="text-5xl text-white cursor-pointer"
              onClick={onOpen}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <h3 className="text-center text-2xl text-white">contact not found</h3>
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
