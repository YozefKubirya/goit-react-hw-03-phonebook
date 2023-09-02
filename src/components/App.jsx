
import React, { Component } from "react";
import { Form } from "./Form/Form";
import { nanoid } from "nanoid";
import { Contacts } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
export class App extends  Component  {
  state = {
    contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
  filter: ''
  }
  componentDidMount() {
    const contactFromLocalStorage = JSON.parse(localStorage.getItem("contactsData"));
    console.log(contactFromLocalStorage)
    if (contactFromLocalStorage) {
      this.setState({contacts:contactFromLocalStorage })
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = prevState;
    if (contacts.length !== 0 && contacts.length!== this.state.contacts.length) {
      localStorage.setItem("contactsData", JSON.stringify(this.state.contacts))
    }
  }
  formHandler = (name,number) => {
    const contact = {
      name,
      number,
      id:nanoid()
    }
     this.setState(({contacts}) => {
      const includeName = contacts.find(user => user.name === contact.name)
      if (includeName) {
        alert(`${contact.name} is already in contacs`);
      } else {
        return {contacts: [contact, ...contacts],}
      }
    })
  }
  handeleChangeFilter = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      const newContactList = prevState.contacts.filter(contact => contact.id !== id);
      console.log(newContactList)

      return { contacts: newContactList };
    })
  }

  
  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formHandler}></Form>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handeleChangeFilter }></Filter>
        <Contacts contacts={ filterContacts} onDelete={this.handleDeleteContact}></Contacts>
      </>)
  }
}
