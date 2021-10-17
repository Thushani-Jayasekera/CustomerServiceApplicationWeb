import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS_BY_AC_STATE } from '../../gql/query';
import { SET_ACCOUNT_STATE } from '../../gql/mutation';
import { useToasts } from 'react-toast-notifications';

function NewProfileList() {
  const [profileList, setProfileList] = useState([]);

  const { loading, error } = useQuery(GET_USERS_BY_AC_STATE, {
    variables: {
      takeUsersAccountState: 'created'
    },
    onCompleted: data => setProfileList(data.takeUsers),
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network'
  });

  const { addToast } = useToasts();
  const [setState, currentStatus] = useMutation(SET_ACCOUNT_STATE, {
    onCompleted: data => {
      addToast('Successfully Done.', { appearance: 'success' });
    },
    onError: error => {
      addToast('Failed ', { appearance: 'error' });
    }
  });

  const ApproveProfile = id => {
    let profiles_list = profileList.filter(obj => obj.id !== id);
    setProfileList(profiles_list);
    console.log('Profile Approved');
    setState({
      variables: {
        providerId: id,
        state: 'approved'
      }
    });
  };

  const RejectProfile = id => {
    let profiles_list = profileList.filter(obj => obj.id !== id);
    setProfileList(profiles_list);
    console.log('Profile Rejected');
    setState({
      variables: {
        providerId: id,
        state: 'suspended'
      }
    });
  };

  return (
    <>
      {profileList &&
        profileList.map(obj => {
          const { id, username, profession } = obj;
          return (
            <div key={id} style={{ backgroundColor: 'white', margin: '10px' }}>
              <img src="image.jpg" alt="SP" />
              <h3>{username}</h3>
              <h3>{profession}</h3>
              <button
                style={{
                  backgroundColor: 'yellow',
                  margin: '10px',
                  padding: '5px 20px'
                }}
              >
                View
              </button>
              <button
                onClick={() => ApproveProfile(id)}
                style={{
                  backgroundColor: '#22d72e',
                  margin: '10px',
                  padding: '5px 20px'
                }}
              >
                Approve
              </button>
              <button
                onClick={() => RejectProfile(id)}
                style={{
                  backgroundColor: 'Red',
                  color: 'white',
                  margin: '10px',
                  padding: '5px 20px'
                }}
              >
                Reject
              </button>
            </div>
          );
        })}
    </>
  );
}

export default NewProfileList;
