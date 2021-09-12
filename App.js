import React from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import "/styles/style.css"
import "tailwindcss/dist/base.min.css"
import "bulma/css/bulma.min.css"
import Pages from './pages';
import GlobalStyles from "./styles/GlobalStyles";
import english from "./translations/english";
import sinhala from "./translations/sinhala";
import tamil from "./translations/tamil";
//Setting up apollo client
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext} from "apollo-link-context";
import { ToastProvider } from "react-toast-notifications";
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


//End of query


//Translation stuff

i18n.use(initReactI18next).init({
  resources:{
    en:{
      translation:{
       ...english
      }
    },
    si:{
      translation:{
       ...sinhala
      }
    },
    ta:{
      translation:{
        ...tamil
      }
    }
  }

    ,
    lng:"en",
    fallbackLng:"en",
    interpolation:{
      escapeValue:false
    }

});
const App = () => {

    return (
      <ApolloProvider client={client}>
        <ToastProvider>
          <GlobalStyles/>
          <Pages />
        </ToastProvider>
      </ApolloProvider>
);
};

ReactDOM.render(<App />, document.getElementById('root'));