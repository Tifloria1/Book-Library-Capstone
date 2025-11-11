import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div style={{border:'1px solid #e5e7eb', padding:12, borderRadius:8}}>
      <h3 style={{marginTop:0}}>User Profile (Context)</h3>
      <p>Name: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
    </div>
  );
}

export default UserProfile;
