import React, { useState } from 'react';
import { useParams } from 'react-router';
import { CREATE_SERVICE } from '../../gql/mutation';
import Layout from '../../components/Layout';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import Loader from '../../components/utils/Loader';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button } from 'react-bulma-components';

// *************************************Stylings***************************************
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Form = tw.form`mx-auto lg:max-w-lg max-w-sm`;
const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-green-600 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea,
  select {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder,
    option {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
// ***********************************End of styling******************************************

const AddService = ({ history }) => {
  const [values, setValues] = useState({});
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');
  const { addToast } = useToasts();

  const uploadImage = e => {
    e.preventDefault();
    setUploading(true);
    addToast('Started uploading photo', { appearance: 'info' });
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'service');
    data.append('cloud_name', 'dpb0ths5c');
    fetch('  https://api.cloudinary.com/v1_1/dpb0ths5c/upload', {
      method: 'post',
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        setUrl(data.url);
        setUploading(false);
        addToast('Successfully uploaded photo', { appearance: 'success' });
      })
      .catch(err => console.log(err));

    console.log(url);
  };

  const [createService, { loading, error }] = useMutation(CREATE_SERVICE, {
    onCompleted: data => {
      addToast('Successfully Added new service! ', { appearance: 'success' });
      history.push('/admin/addService');
    }
  });
  if (loading) {
    return <Loader />;
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Container>
      <AdminNavbar />
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2 style={{ textAlign: 'center' }}>Add New Service</h2>
            <Form
              onSubmit={event => {
                event.preventDefault();
                console.log(values);
                createService({
                  variables: {
                    ...values,
                    createServiceImage: url
                  }
                });
              }}
            >
              <InputContainer>
                <Label htmlFor="date-input">Service Name</Label>
                <Input
                  id="date-input"
                  type="text"
                  name={'createServiceServiceName'}
                  placeholder="Service Name"
                  onChange={handleChange}
                  required
                />
              </InputContainer>

              <InputContainer>
                <Label htmlFor="date-input">User Type</Label>
                <Input
                  id="date-input"
                  type="text"
                  name={'createServiceUserType'}
                  placeholder="User Type"
                  onChange={handleChange}
                  required
                />
              </InputContainer>

              <InputContainer tw="flex-1">
                <Label htmlFor="job-input">Service Description</Label>
                <TextArea
                  id="job-input"
                  name={'createServiceDescription'}
                  placeholder="Details about the type of service"
                  onChange={handleChange}
                  required
                />
              </InputContainer>

              <InputContainer tw="flex-1">
                <Label htmlFor="name-input">Add a Display Image</Label>
                <input
                  type="file"
                  onChange={e => setImage(e.target.files[0])}
                ></input>
                <Button data-testid="FileUploadBtn" onClick={uploadImage}>
                  Click to Upload Selected
                </Button>
              </InputContainer>

              {uploading ? (
                <SubmitButton type="submit" value="Submit" disabled={true}>
                  Please wait..
                </SubmitButton>
              ) : (
                <SubmitButton
                  data-testid="SubmitBtn"
                  type="submit"
                  value="Submit"
                  disabled={uploading}
                >
                  ADD SERVICE
                </SubmitButton>
              )}
            </Form>
          </div>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default AddService;
