import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS_BY_AC_STATE } from '../../gql/query';
import { SET_ACCOUNT_STATE } from '../../gql/mutation';
import { useToasts } from 'react-toast-notifications';

function SuspendedList() {
  const [suspendedList, setSuspendedList] = useState([]);

  const suspended_profiles = useQuery(GET_USERS_BY_AC_STATE, {
    variables: {
      takeUsersAccountState: 'suspended'
    },
    onCompleted: data => setSuspendedList(data.takeUsers),
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network'
  });

  const { addToast } = useToasts();
  const [setState, { data, error, loading }] = useMutation(SET_ACCOUNT_STATE, {
    onCompleted: data => {
      addToast('Successfully Done.', { appearance: 'success' });
    },
    onError: error => {
      addToast('Failed...', { appearance: 'error' });
    }
  });

  const ReAllocate = id => {
    let new_list = suspendedList.filter(user => user.id !== id);
    setSuspendedList(new_list);
    setState({
      variables: {
        providerId: id,
        state: 'approved'
      }
    });
  };

  return (
    <div>
      {suspendedList &&
        suspendedList.map(obj => {
          const { id, username, profession } = obj;
          return (
            <div key={id} style={{ backgroundColor: 'white', margin: '10px' }}>
              {/* <img src="image.jpg" alt="SP" /> */}
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
                onClick={() => ReAllocate(id)}
                style={{
                  backgroundColor: '#22d72e',
                  margin: '10px',
                  padding: '5px 20px'
                }}
              >
                Re-Allocate
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default SuspendedList;
