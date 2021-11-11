import React, { useState } from "react";
import { Button, Content, Modal } from "react-bulma-components";

const MyModal = ({title,content,proceed,modalState,setModalState})=>{
  return(
    <Modal show={modalState} onClose={(event)=>setModalState(false)}>
      <Modal.Card>
        <Modal.Card.Header>
          <Modal.Card.Title>
            {title}
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <Content>
            {content}
          </Content>
        </Modal.Card.Body>
        <Modal.Card.Footer>
          <Button.Group>
            <Button color={"success"} onClick={(event)=>{
              event.preventDefault()
              setModalState(false)
              proceed()}}>Yes</Button>
            <Button color={"danger"} onClick={event=>setModalState(false)}>No</Button>
          </Button.Group>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  )
}

export default MyModal