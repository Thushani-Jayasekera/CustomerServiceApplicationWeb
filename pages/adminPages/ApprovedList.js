import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS_BY_AC_STATE } from '../../gql/query';
import { SET_ACCOUNT_STATE, REMOVE_SERVICE_PROVIDER } from '../../gql/mutation';
import { useToasts } from 'react-toast-notifications';
import userImage from '../../images/user.jpg';
import styled from 'styled-components';

/*************************** Styles *****************************/
const OuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin: 10px;
  height: 8vh;
  width: 100%;
  box-sizing: border-box;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    height: 20vh;
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
    let new_list = approvedList.filter(user => user.id !== id);
    setApprovedList(new_list);
    remove_Profile({
      variables: {
        removeServiceProviderId: id
      }
    });
  };

  return (
    <div>
      {approvedList &&
        approvedList.map(user => {
          const { id, username, profession } = user;
          return (
            <OuterContainer key={id}>
              <LeftContainer>
                <ImageContainer>
                  <Image src={userImage} alt="" />
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
                    state: { users: user }
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
                  onClick={() => Suspend(id)}
                  style={{
                    backgroundColor: '#22d72e',
                    width: '100px',
                    display: 'block',
                    padding: '5px 20px'
                  }}
                >
                  Suspend
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

export default ApprovedList;
