import { useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ContactsContext = createContext();

export const useContacts = () => useContext(ContactsContext);

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = ({ id, name }) => {
    return setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        createContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
