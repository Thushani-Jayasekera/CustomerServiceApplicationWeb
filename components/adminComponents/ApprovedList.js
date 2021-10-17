import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS_BY_AC_STATE } from '../../gql/query';
import { SET_ACCOUNT_STATE } from '../../gql/mutation';
import { useToasts } from 'react-toast-notifications';

function ApprovedList() {
  const [approvedList, setApprovedList] = useState([]);

  const approved_profiles = useQuery(GET_USERS_BY_AC_STATE, {
    variables: {
      takeUsersAccountState: 'approved'
    },
    onCompleted: data => setApprovedList(data.takeUsers),
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

  const Suspend = id => {
    let new_list = approvedList.filter(user => user.id !== id);
    setApprovedList(new_list);
    setState({
      variables: {
        providerId: id,
        state: 'suspended'
      }
    });
  };

  return (
    <div>
      {approvedList &&
        approvedList.map(user => {
          const { id, username, profession } = user;
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
                onClick={() => Suspend(id)}
                style={{
                  backgroundColor: '#22d72e',
                  margin: '10px',
                  padding: '5px 20px'
                }}
              >
                Suspend
              </button>
              <button
                style={{
                  backgroundColor: 'Red',
                  color: 'white',
                  margin: '10px',
                  padding: '5px 20px'
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default ApprovedList;
