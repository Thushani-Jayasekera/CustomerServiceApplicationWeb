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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: black;
  margin: 8px;
  width: 100%;
  box-sizing: border-box;
  @media screen and (min-width: 720px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 720px) {
    flex-direction: row;
    width: 8%;
    height: 60px;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  align-items: center;
  width: 100%;
  border-bottom: 0.5px dotted hsl(210, 22%, 49%);
  @media screen and (min-width: 720px) {
    flex-direction: row;
    width: 49%;
    border-bottom: 0px;
  }
`;

const UserName = styled.div`
  font-size: 0.875rem;
  text-align: center;

  text-transform: capitalize;
  line-height: 1.25;
  margin-bottom: 0.75rem;
  width: 40%;
  @media screen and (min-width: 720px) {
    font-size: 1rem;
    line-height: 1;
    letter-spacing: 0.1rem;
  }
`;

const Profession = styled.div`
  font-size: 0.875rem;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.25;
  margin-bottom: 0.75rem;
  color: #c59d5f;
  width: 40%;
  @media screen and (min-width: 720px) {
    font-size: 1rem;
    line-height: 1;
    letter-spacing: 0.1rem;
  }
`;

const ButtonContainer = styled.div`
  background-color: white;
  overflow: hidden;
  width: 60%;
  background-color: white;
  @media screen and (min-width: 720px) {
    width: 43%;
  }
`;

const Button = styled.button`
  height: 100%;
  width: 100%;
  margin-top: 0.5rem;
  background: #2caeba;
  color: hsl(185, 94%, 87%);
  padding: 0.25rem 0.5rem;
  text-transform: capitalize;
  border-radius: 0.25rem;
  transition: all 0.3s linear;
  border-color: transparent;
  cursor: pointer;
  :hover {
    background: hsl(184, 80%, 74%);
    color: hsl(184, 91%, 17%);
  }
  @media screen and (min-width: 720px) {
    width: 30%;
    margin: 3px;
  }
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  @media screen and (min-width: 720px) {
    width: 60px;
    height: 100%;
    border-radius: 0;
    margin: 0;
  }
`;

const Image = styled.img`
  width: 100%;
  display: block;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  @media screen and (min-width: 720px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  input {
    width: 100%;
    border: none;
    border-color: transparent;
    background: #f1f5f8;
    border-radius: 0.25rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  label {
    font-size: 1.3rem;
    color: #f1f5f8;
  }
  @media screen and (min-width: 720px) {
    border-radius: 0;
    margin: 0px;
    input {
      width: 50%;
    }
  }
`;

/*************************** End of Styles *****************************/

function ApprovedList() {
  const [approvedList, setApprovedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        addToast('Successfully Removed.', { appearance: 'success' });
      },
      onError: error => {
        addToast(error.message.substring(15), { appearance: 'error' });
        console.log(error.message.substring(15));
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
      <SearchContainer>
        <label htmlFor="name">Search</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search By Name"
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
      </SearchContainer>

      {approvedList &&
        approvedList
          .filter(obj => {
            if (searchTerm == '') {
              return obj;
              console.log('all are there');
            } else if (
              obj.username.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return obj;
            }
          })
          .map(user => {
            const { id, username, profession } = user;
            return (
              <OuterContainer key={id}>
                <LeftContainer>
                  <ImageContainer>
                    <Image src={userImage} alt="" />
                  </ImageContainer>
                </LeftContainer>
                <DetailsContainer>
                  <UserName>
                    <h3 style={{}}>{username}</h3>
                  </UserName>
                  <Profession>
                    <h3 style={{}}>{profession}</h3>
                  </Profession>
                </DetailsContainer>
                <ButtonContainer>
                  <Link
                    to={{
                      pathname: `/viewServiceProvider/${id}`,
                      state: { users: user }
                    }}
                  >
                    <Button>Visit</Button>
                  </Link>

                  <Button onClick={() => Suspend(id)}>Suspend</Button>
                  <Button onClick={() => RemoveProfile(id)}>Remove</Button>
                </ButtonContainer>
              </OuterContainer>
            );
          })}
    </div>
  );
}

export default ApprovedList;
