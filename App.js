import React from 'react';
import ReactDOM from 'react-dom';
import "/styles/style.css"
import "tailwindcss/dist/base.min.css"
import Pages from './pages';
import GlobalStyles from "./styles/GlobalStyles";
const App = () => {
    return (
      <React.Fragment>
        <GlobalStyles/>
        <Pages />
      </React.Fragment>
);
};

ReactDOM.render(<App />, document.getElementById('root'));