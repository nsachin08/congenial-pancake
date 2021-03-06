import React, {useState} from 'react';
import { FormContainer, Form, Input, ButtonContainer } from '../components/Form';
import Button from '../components/Button';
import API from '../apiService';
import Modal from 'react-modal';

const initialUserData = {
  username: "",
  password: "",
  first_name : "",
  last_name: "",
  address: {
      street_number: "",
      street_name: "",
      city: "",
      state: "",
      zip: ""
  }
}

const CreateUser = () => {

  const [userData, setUserData] = useState(initialUserData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  const updatePayload = (attr, value, isAddress = false) => {
    if(isAddress){
      setUserData(prev => ({...prev, address: {...prev.address, [attr]: value } }))
    } else {
      setUserData(prev => ({...prev, [attr]: value}));
    }
  }

  const submitUser = async (e) => {
    try {
      e.preventDefault();
      let res = await API.createUser(userData);
      localStorage.setItem("userJWT", res.token);
      localStorage.setItem("isVendor", false);
      setText('Successfully Created an Account!');
      toggleModal();
    } catch(e) {
      setText('');
      setError(e.message);
      toggleModal();
    }
  }

  const toggleModal = () => {
    setModalIsOpen(prev => !prev);
  }

  const customStyles = {
   
    content: {
      display: 'flex',
      flexdirection: 'Column',
      position: 'absolute',
      left: '50%',
      top: '50%',      
      transform: 'translate(-50%, -50%)',
      outline: 'none',
      font: 'Montserratt',
      justifyContent: 'space-between',
      padding: '5%',
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={submitUser}>
        <h1>Create a User</h1>
        <Input placeholder="Username" value={userData.username} onChange={(e) => updatePayload('username', e.currentTarget.value)}></Input>
        <Input placeholder="Password" type="password" value={userData.password} onChange={(e) => updatePayload('password', e.currentTarget.value)}></Input>
        <Input placeholder="First Name" value={userData.first_name} onChange={(e) => updatePayload('first_name', e.currentTarget.value)}></Input>
        <Input placeholder="Last Name" value={userData.last_name} onChange={(e) => updatePayload('last_name', e.currentTarget.value)}></Input>
        <Input placeholder="Street Number" value={userData.address.street_number} onChange={(e) => updatePayload('street_number', e.currentTarget.value, true)}></Input>
        <Input placeholder="Street Name" value={userData.address.street_name} onChange={(e) => updatePayload('street_name', e.currentTarget.value, true)}></Input>
        <Input placeholder="City" value={userData.address.city} onChange={(e) => updatePayload('city', e.currentTarget.value, true)}></Input>
        <Input placeholder="State" value={userData.address.state} onChange={(e) => updatePayload('state', e.currentTarget.value, true)}></Input>
        <Input placeholder="Zip" value={userData.address.zip} onChange={(e) => updatePayload('zip', e.currentTarget.value, true)}></Input>
        <ButtonContainer>
          <a style={{alignSelf: 'center', margin: '32px 16px'}} href="/login">Already have an account? Click here.</a>
          <Button type="submit">Create</Button>
        </ButtonContainer>

        <Modal
          style = {customStyles}
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Error"
        > 
         
          {text}
          {error? <div>{error}</div>:null}
          <div direction="row"><Button onClick={toggleModal} style={{justifyContent : 'center', margin : '0px'}}>close</Button>
          </div>
        </Modal>
      </Form>
    </FormContainer>
  )
}

export default CreateUser;