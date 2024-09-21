import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import {
  selectContacts,
  selectFilteredContacts,
} from "../../redux/contacts/selectors";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const contacts = useSelector(selectContacts);
  return (
    <div>
      {contacts.length === 0 && <p>No contacts yet</p>}
      {filteredContacts.map((contact) => {
        return (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
          />
        );
      })}
    </div>
  );
};

export default ContactList;
