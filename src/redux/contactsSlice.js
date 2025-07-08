import { createSlice, nanoid } from '@reduxjs/toolkit';
import initialContacts from '../assets/contacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: initialContacts,
    filter: '',
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },

      prepare(newContact) {
        return {
          payload: {
            id: nanoid(),
            ...newContact,
          },
        };
      },
    },

    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },

    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, updateFilter } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
