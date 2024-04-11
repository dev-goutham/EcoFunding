import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../../config/firebase'; // Make sure this path is correct
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 30rem;
  margin: 0 24em;
  
    input, textarea{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    }
    select {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;                                                                             
    }
    button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #2ebc15;
        color: white;
        cursor: pointer;
        width: 100%;
    }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;



const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
`;

function Users() {
    const [users, setUsers] = useState([]);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const storage = getStorage();
  
    useEffect(() => {
      const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        setUsers(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      };
      fetchUsers();
    }, []);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const addUser = async (e) => {
      e.preventDefault();
  
      let pictureUrl = '';
      if (file) {
        const fileRef = storageRef(storage, `user_images/${editingId || 'new'}`);
        const snapshot = await uploadBytes(fileRef, file);
        pictureUrl = await getDownloadURL(snapshot.ref);
      }
  
      if (editingId) {
        await updateDoc(doc(firestore, 'users', editingId), {
          displayName,
          email,
          ...(file && { picture: pictureUrl }),
        });
        setUsers(users.map(user => user.id === editingId ? { ...user, displayName, email, ...(file && { picture: pictureUrl }) } : user));
      } else {
        const docRef = await addDoc(collection(firestore, 'users'), {
          displayName,
          email,
          ...(file && { picture: pictureUrl }),
        });
        setUsers([...users, { displayName, email, picture: pictureUrl, id: docRef.id }]);
      }
  
      setDisplayName('');
      setEmail('');
      setFile(null);
      setEditingId(null);
    };
  
    const startEditing = (user) => {
      setEditingId(user.id);
      setDisplayName(user.displayName);
      setEmail(user.email);
    };
  
    const handleDeleteUser = async (id) => {
      await deleteDoc(doc(firestore, 'users', id));
      setUsers(users.filter(user => user.id !== id));
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', margin: '0 auto' }}>
        <h1>{editingId ? 'Edit User' : 'Add User'}</h1>
        <Form onSubmit={addUser} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="Display Name"
            style={{ padding: '10px', margin: '5px 0', borderRadius: '5px' }}
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding: '10px', margin: '5px 0', borderRadius: '5px' }}
          />
          <input
            type="file"
            onChange={handleFileChange}
            style={{ padding: '10px', margin: '5px 0', borderRadius: '5px' }}
          />
          <button type="submit" >
            {editingId ? 'Update User' : 'Add User'}
          </button>
        </Form>
        <div>
          {users.map(user => (
            <div key={user.id} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', display: 'flex', flexDirection: 'row', gap: '10px' }}>
              {user.picture && <img src={user.picture} alt="User" style={{ width: '100px', height: '100px' }} />}
              <div>
                <p>ID: {user.id}</p>
                <p>Display Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <button onClick={() => startEditing(user)} style={{ cursor: 'pointer', padding: '5px', borderRadius: '5px', marginRight: '5px' }}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} style={{ cursor: 'pointer', padding: '5px', borderRadius: '5px' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Users;
  