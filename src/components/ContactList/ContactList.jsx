import PropTypes from 'prop-types';
import { Contact, ContactListBox } from './ContactList.styled';

export const ContactList = ({ contacts, onClick }) => {
  return (
    <ContactListBox>
      {contacts.map(({ id, name, number }) => {
        return (
          <Contact key={id}>
            <p>
              {name}: {number}
            </p>
            <button
              type="button"
              onClick={() => {
                onClick(id);
              }}
            >
              Delete
            </button>
          </Contact>
        );
      })}
    </ContactListBox>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onClick: PropTypes.func.isRequired,
};
