import React, { useState } from "react";
import { Button, Container, Content, Form, Section } from "react-bulma-components";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../gql/query";
import Loader from "../components/utils/Loader";
import { handleChangefn } from "../utils";
import { UPDATE_ME } from "../gql/mutation";
import { useToasts } from "react-toast-notifications";
import { Widget, WidgetLoader } from "react-cloudinary-upload-widget";
import UploadWidget from "../components/utils/UploadWidget";

const EditProfilePage = ({history})=>{
  const [values,setValues] = useState({})
  const [image,setImage] = useState({})
  const [imgPresent,setImagePresent] = useState(false)
  const {addToast} = useToasts()
  const meQuery = useQuery(GET_ME,{
    onCompleted:(data)=>{
      setValues({
        updateMeFullname: data.me.fullname,
        updateMeContactNum:data.me.contactNum ,
        updateMeAddress: data.me.address,
        updateMeProfession: data.me.profession,
        updateMeProvince: data.me.province,
        updateMeCity: data.me.city,
        updateMeTown: data.me.town,
        updateMePostalCode: data.me.postalCode,
        updateMeProfileUrl:data.me.profile_url
      })
    }
  })
  const [updateMe,stateOfupdateMe] = useMutation(UPDATE_ME,{
    onCompleted:(data)=>{
      addToast("Successfully updated",{appearance:"success"})
      history.push("/profile")
    }
  })
  const handleSubmit = (event)=>{
    event.preventDefault()
    if(imgPresent){
      console.log(image)
      const formData = new FormData()
      formData.append("file",image)
      formData.append("upload_preset","huhs8y0f")
      formData.append("cloud_name","ded0k5ukr")
      event.preventDefault()
      fetch("https://api.cloudinary.com/v1_1/ded0k5ukr/upload",{
        method:"post",
        body:formData
      }).then((resp)=>{
        resp.json().then(data=>{
          console.log(data.url)
          updateMe({
            variables:{
              ...values,
              updateMeProfileUrl:data.url
            }
          })
        })
      }).catch((err)=>{
        addToast("Image upload error",{appearance:"error"})
        console.log(err)
      })
    }else{
      updateMe({
        variables:{
          ...values
        }
      })
    }


  }
  const handleChange = handleChangefn(setValues,values)
  if(meQuery.loading) return <Loader/>
  return(
    <Layout>
     <Header/>
      <Container>
        <Section>
          <Content>
            <h1>Edit profile page </h1>
          </Content>
        </Section>
        <Section>
          <form onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Label>
                Full name
              </Form.Label>
              <Form.Control>
                <Form.Input type={"text"} name={"updateMeFullname"} value={values.updateMeFullname || ""} onChange={handleChange}/>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>
                Contact Number
              </Form.Label>
              <Form.Control>
                <Form.Input type={"text"} name={"updateMeContactNum"} value={values.updateMeContactNum || ""} onChange={handleChange} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>
                Address
              </Form.Label>
              <Form.Control>
                <Form.Input type={"text"} name={"updateMeAddress"} value={values.updateMeAddress || ""} onChange={handleChange} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>
                Profession
              </Form.Label>
              <Form.Control>
                <Form.Input type={"text"} name={"updateMeProfession"} value={values.updateMeProfession || ""} onChange={handleChange} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>
                Province
              </Form.Label>
              <Form.Control>
                <Form.Input type={"text"} name={"updateMeProvince"} value={values.updateMeProvince || ""} onChange={handleChange} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>
                City
              </Form.Label>
              <Form.Control>
                <Form.Input type={"text"} name={"updateMeCity"} value={values.updateMeCity || ""} onChange={handleChange} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>
                Town
              </Form.Label>
              <Form.Control>
                <Form.Input type={"text"} name={"updateMeTown"} value={values.updateMeTown || ""} onChange={handleChange} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>
                Postal Code
              </Form.Label>
              <Form.Control>
                <Form.Input type={"text"} name={"updateMePostalCode"} value={values.updateMePostalCode || ""} onChange={handleChange} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>
                Profile image (optional, .png,.jpg,.bmp accepted)
              </Form.Label>
              <Form.Control>
                <Form.InputFile inputProps={{"accept":"image/*"}} onChange={(event)=>{setImage(event.target.files[0]);setImagePresent(true)}} />
              </Form.Control>
            </Form.Field>
            <Form.Field kind="group">
              <Form.Control>
                <Button color="success" type={"submit"}>Update</Button>
              </Form.Control>
              <Form.Control>
                <Link to={"/profile"}>
                  <Button color="danger">
                    Cancel
                  </Button>
                </Link>
              </Form.Control>
            </Form.Field>
          </form>
        </Section>
      </Container>
    </Layout>
  )
}

export default EditProfilePage