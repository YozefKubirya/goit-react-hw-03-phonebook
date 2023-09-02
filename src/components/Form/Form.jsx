import React, { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types'
export class Form extends Component{
   state = {
   name: '',
   number:'',
   }
   handleChange = event => {
    const { name, value } = event.currentTarget;
      this.setState({
         [name]: value,
      })
   }
   handleSubmit = event => {
      event.preventDefault();

   const { name, number } = this.state;
    this.props.onSubmit(name, number)
      this.reset();
   }
   reset = () =>{
   this.setState({name: '',
    number:'',})
}
   render() {
      const inputNameId = nanoid();
      const inputNumbId = nanoid();
       const { name, number } = this.state;
      return (
         <>
       
        
          <form onSubmit={this.handleSubmit}>
       <label htmlFor={inputNameId}>Name
 <input
  id={inputNameId}
  value={name}
  onChange={this.handleChange}
  type="text"
  name="name"
  pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required/>
   </label>  
      <label htmlFor={inputNumbId}>Number
          <input
            id={inputNumbId}
         onChange={this.handleChange}
            value={number}
            type="tel"
            name="number"
           pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
      </label>     
            <button type="submit" >Add contact</button>
          </form>
           
            </>
      )
   }
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}