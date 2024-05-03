import { useState } from 'react';

const ContactForm = ({existingContact = {}, updateCallBack}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "" );
    const [lastName, setLastName] = useState(existingContact.lastName || "" );
    const [email, setemail] = useState(existingContact.email || "" );

    const updating = Object.entries(existingContact).length !==0;

    const onSubmit = async (e) => {
        e.preventDefault();

        const data ={
            firstName,
            lastName,
            email
        }
        const url = "http://127.0.0.1:5000" + (updating? `update_contact/${contact.id}` : "create_contact")
        const options = {
            method : updating ? "PATCH" : "POST",
            headers: {
                "content-Type":"Application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        } else{
            updateCallBack()
        }

    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type='text'
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor="lastName">last Name:</label>
                <input
                    type='text'
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor="email">email:</label>
                <input
                    type='text'
                    id="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}/>
            </div>
            <button type='submit'>{updating ? "Update" : "Create_Contact"}/</button>
        </form>
    )

}

export default ContactForm