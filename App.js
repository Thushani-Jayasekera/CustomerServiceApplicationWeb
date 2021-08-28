import React from 'react';
import ReactDOM from 'react-dom';
import "/styles/style.css"
import "tailwindcss/dist/base.min.css"
import Pages from './pages';
import GlobalStyles from "./styles/GlobalStyles";

//Setting up apollo client
import {ApolloClient,ApolloProvider,InMemoryCache,createHttpLink} from "@apollo/client";
import {setContext} from "apollo-link-context";
const uri = process.env.API_URI;
const httpLink = createHttpLink({uri});
const cache = new InMemoryCache();
const authLink = setContext((_,{headers})=>{
  return{
    headers:{
      ...headers,
      authorization:localStorage.getItem('token')||''
    }
  }
})
const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache,
  resolvers:{},
  connectToDevTools:true
})

const data = {
  isLoggedIn: !!localStorage.getItem('token')
}
cache.writeData({data});
client.onResetStore(()=>cache.writeData({data}))
const App = () => {
    return (
      <ApolloProvider client={client}>
        <GlobalStyles/>
        <Pages />
      </ApolloProvider>
);
};

ReactDOM.render(<App />, document.getElementById('root'));