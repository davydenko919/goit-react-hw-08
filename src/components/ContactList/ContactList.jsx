import { useSelector, useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contacts/operations'
import { selectFilteredContacts } from '../../redux/contacts/selectors'
import toast from 'react-hot-toast'


const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => toast.success('Contact deleted successfully'))
      .catch((error) => toast.error(error.message))
  }

  return (
    <ul >
      {contacts.map(({ id, name, number }) => (
        <li key={id} >
                <p>Name: {name}</p>
                <p>Number: {number}</p>
          <button
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ContactList