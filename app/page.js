"use client"
import Header from "./components/Header"
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm"

import { useState, useEffect } from "react";

import styles from "./page.module.css";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setcurrentContact] = useState({})

  useEffect(()=>{
      fetchContacts()
      
  },[]);

  const fetchContacts = async () =>{
      const response = await fetch('http://127.0.0.1:5000/contacts');
      const data = await response.json();
      
      setContacts(data.contacts);
  }

  const onUpdate = () =>(
    console.log('Updating!')
  )

  return (
    <>
      <Header/>
      <ContactList contacts={contacts} />
      <contactForm existingContact={currentContact} updateCallback={onUpdate}/>
    </>
  );
}