import React from "react";
import ReactLoading from "react-loading"
import tw from "twin.macro";

const Container = tw.div`w-full h-screen bg-white opacity-75 z-50 flex`
const Text = tw.span`text-black opacity-75 m-auto`
const Loader = ()=>{
  return(
    <Container>
      <Text>
        <ReactLoading type={"spin"} color={"black"} />
      </Text>
    </Container>
  )
}

export default Loader