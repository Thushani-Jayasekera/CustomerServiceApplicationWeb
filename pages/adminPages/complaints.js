import React, { useState } from 'react';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import tw from 'twin.macro';
import Complaint from '../../components/adminComponents/Complaint';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_COMPLAINTS } from '../../gql/query';
import { REMOVE_COMPLAINT } from '../../gql/mutation';
import { useToasts } from 'react-toast-notifications';
import Loader from '../../components/utils/Loader';
import {
  Columns,
  Container,
  Content,
  Message,
  Section
} from 'react-bulma-components';

const CenteredH1 = tw.h1`text-center`;

function Complaints() {
  const [complaints, setComplaints] = useState([]);

  const { addToast } = useToasts();

  const [remove_Complaint, setRemoveProfile] = useMutation(REMOVE_COMPLAINT, {
    onCompleted: data => {
      addToast('Successfully Removed.', { appearance: 'success' });
    },
    onError: error => {
      addToast(error.message.substring(15), { appearance: 'error' });
      console.log(error.message.substring(15));
    }
  });

  const complaint_query = useQuery(GET_ALL_COMPLAINTS, {
    onCompleted: data => setComplaints(data.viewAllComplaints)
  });
  console.log(complaint_query.data);
  if (complaint_query.loading) return <Loader />;

  const removeComplaint = id => {
    let newComplaints = complaints.filter(complaint => complaint.id !== id);
    setComplaints(newComplaints);
    remove_Complaint({
      variables: {
        removeComplaintId: id
      }
    });
  };

  return (
    <div>
      <Container>
        <AdminNavbar />
        <Section>
          <Content>
            <CenteredH1 style={{ color: '#2caeba' }}>
              User Complaints
            </CenteredH1>
          </Content>
        </Section>
        {complaints &&
          complaints.map(complaint => {
            let date =
              complaint.createdAt.substring(0, 10) +
              ' ' +
              complaint.createdAt.substring(11, 19);
            console.log(date);
            return (
              <Complaint
                key={complaint.id}
                id={complaint.id}
                title={complaint.title}
                date={date}
                complaint={complaint.complaint}
                complainer={complaint.complainer.username}
                victim={complaint.victim}
                removeComplaint={removeComplaint}
              />
            );
          })}
        {complaints && complaints.length === 0 && (
          <Message color={'danger'}>
            <Message.Body>There are no complaints found</Message.Body>
          </Message>
        )}
      </Container>
    </div>
  );
}

export default Complaints;
