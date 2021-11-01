import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS_BY_AC_STATE } from '../../gql/query';
import { SET_ACCOUNT_STATE, REMOVE_SERVICE_PROVIDER } from '../../gql/mutation';
import { useToasts } from 'react-toast-notifications';
import user from '../../images/user.jpg';
import styled from 'styled-components';

/*************************** Styles *****************************/
const OuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin: 10px;
  height: 64px;
  width: 100%;
  box-sizing: border-box;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  flex: 1 0 auto;
  width: 60%;
  height: 100%;
  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  flex: 1 0 auto;
  width: 40%;
  height: 100%;
  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  @media (max-width: 990px) {
    height: 30%;
  }
`;

const Image = styled.img`
  display: block;
  height: 100%;
  @media (max-width: 1070px) {
    height: 100%;
    width: 100%;
  }
`;

const UserName = styled.div`
  width: 30%;
`;

const Profession = styled.div`
  width: 30%;
`;

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
  const [remove_Profile, setRemoveProfile] = useMutation(
    REMOVE_SERVICE_PROVIDER,
    {
      onCompleted: data => {
        addToast('Successfully Deleted.', { appearance: 'success' });
      },
      onError: error => {
        addToast('Failed to delete.', { appearance: 'error' });
      }
    }
  );
  const RemoveProfile = id => {
    let new_list = suspendedList.filter(user => user.id !== id);
    setSuspendedList(new_list);
    remove_Profile({
      variables: {
        removeServiceProviderId: id
      }
    });
  };

  return (
    <div>
      {suspendedList &&
        suspendedList.map(obj => {
          const { id, username, profession } = obj;
          return (
            <OuterContainer key={id}>
              <LeftContainer>
                <ImageContainer>
                  <Image src={user} alt="" />
                </ImageContainer>
                <UserName>
                  <h3 style={{}}>{username}</h3>
                </UserName>
                <Profession>
                  <h3 style={{}}>{profession}</h3>
                </Profession>
              </LeftContainer>
              <RightContainer>
                <Link
                  to={{
                    pathname: `/viewServiceProvider/${id}`,
                    state: { users: obj }
                  }}
                >
                  <button
                    style={{
                      backgroundColor: 'yellow',
                      display: 'block',
                      width: '100px',
                      padding: '5px 20px'
                    }}
                  >
                    Visit
                  </button>
                </Link>

                <button
                  onClick={() => ReAllocate(id)}
                  style={{
                    backgroundColor: '#22d72e',
                    width: '100px',
                    display: 'block',
                    padding: '5px 20px'
                  }}
                >
                  Activate
                </button>
                <button
                  onClick={() => RemoveProfile(id)}
                  style={{
                    backgroundColor: 'Red',
                    width: '100px',
                    color: 'white',
                    display: 'block',
                    padding: '5px 20px'
                  }}
                >
                  Delete
                </button>
              </RightContainer>
            </OuterContainer>
          );
        })}
    </div>
  );
}

export default SuspendedList;
