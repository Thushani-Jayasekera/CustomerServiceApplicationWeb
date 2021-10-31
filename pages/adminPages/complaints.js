import React, { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import tw from 'twin.macro';
import Complaint from '../../components/Complaint';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPLAINTS } from '../../gql/query';
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
  const complaint_query = useQuery(GET_ALL_COMPLAINTS);
  console.log(complaint_query.data);
  if (complaint_query.loading) return <Loader />;

  return (
    <div>
      <Container>
        <AdminNavbar />
        <Section>
          <Content>
            <CenteredH1>User Complaints</CenteredH1>
          </Content>
        </Section>
        {complaint_query.data &&
          complaint_query.data.viewAllComplaints.map(complaint => {
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
              />
            );
          })}
        {complaint_query.data &&
          complaint_query.data.viewAllComplaints.length === 0 && (
            <Message color={'danger'}>
              <Message.Body>There are no complaints found</Message.Body>
            </Message>
          )}
      </Container>
    </div>
  );
}

export default Complaints;
