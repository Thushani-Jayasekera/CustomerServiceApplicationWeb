import React from "react";
import { render,screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Header from "../../../components/Header";
import {MockedProvider} from "@apollo/client/testing";
import { IS_LOGGED_IN } from "../../../gql/query";
import Home from "../../../pages/home";

jest.mock("../../../images/design-illustration-2.svg")
describe("Given the homepage",()=>{
  it("should display the header",async ()=>{
    const mocks = [
      {
        request: {
          query: IS_LOGGED_IN,
        },
        result: {
          data: {
            isLoggedIn:true
          },
        },
      },
    ];
    const {container} = render(
      <MockedProvider mocks={mocks}>
        <Home/>
      </MockedProvider>
      )
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(screen.getByRole('banner',  {name:""})).toBeEnabled()
  })
})