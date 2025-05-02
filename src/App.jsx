import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDisclouse from "./hooks/useDisclouse";

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(searchTermLower) ||
      contact.email?.toLowerCase().includes(searchTermLower) ||
      contact.phone?.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
              placeholder="Search contacts..."
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
          {filteredContacts.length <= 0 ? (
            <h3 className="text-center text-2xl text-white">No contacts found</h3>
          ) : (
            filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact 
        isOpen={isOpen} 
        onClose={onClose} 
      />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
