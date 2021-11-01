import React from 'react';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewProfileList from './NewProfileList';
import ApprovedList from './ApprovedList';
import SuspendedList from './SuspendedList';

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#6147E0'
  },
  appbar: {
    backgroundColor: '#6147E0',
    color: '#222'
  }
}));

function UserManage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Container>
        <AdminNavbar />
        <Content>
          <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <LinkTab
                  label="New Profiles"
                  href="/drafts"
                  {...a11yProps(0)}
                />
                <LinkTab
                  label="Suspended Profiles"
                  href="/trash"
                  {...a11yProps(1)}
                />
                <LinkTab
                  label="Approved Profiles"
                  href="/spam"
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <NewProfileList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SuspendedList />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ApprovedList />
            </TabPanel>
          </div>
        </Content>
      </Container>
    </div>
  );
}

export default UserManage;

// import React, { useState } from 'react';
// import AdminNavbar from '../../components/AdminNavbar';
// import { useQuery } from '@apollo/client';
// import styled from 'styled-components';
// import ProfileSet from '../../components/adminComponents/ProfileSet';
// import { GET_PROFILES } from '../../gql/query';

// const Section = styled.section`
//   padding: 5rem 0;
//   width: 90vw;
//   margin: 0 auto;
//   max-width: 1170px;
//   @media screen and (min-width: 992px) {
//     width: 95vw;
//   }
// `;

// const Title = styled.div`
//   text-align: center;
//   margin-bottom: 2rem;
// `;

// const H2 = styled.h2`
//   font-size: 2rem;
//   letter-spacing: var(--spacing);
//   text-transform: capitalize;
//   line-height: 1.25;
//   margin-bottom: 0.75rem;
//   @media screen and (min-width: 800px) {
//     font-size: 2.5rem;
//     line-height: 1;
//   }
// `;

// const Underline = styled.div`
//   width: 5rem;
//   height: 0.25rem;
//   background: #c59d5f;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const ButtonContainer = styled.div`
//   margin-bottom: 4rem;
//   display: flex;
//   justify-content: center;
// `;

// const Button = styled.button`
//   background: transparent;
//   border-color: transparent;
//   font-size: 1rem;
//   text-transform: capitalize;
//   margin: 0 0.5rem;
//   letter-spacing: 1px;
//   padding: 0.375rem 0.75rem;
//   color: #c59d5f;
//   cursor: pointer;
//   transition: all 0.3s linear;
//   border-radius: 0.25rem;
//   :hover {
//     background: #c59d5f;
//     color: #fff;
//   }
// `;

// function UserManage() {
//   const [userProfiles, setProfiles] = useState([]);

//   const all_profiles = useQuery(GET_PROFILES, {
//     onCompleted: data => setProfiles(data.takeServiceProviders),
//     fetchPolicy: 'cache-and-network',
//     nextFetchPolicy: 'cache-and-network'
//   });

//   const filterProfiles = profile_state => {
//     const profileList = all_profiles.data.takeServiceProviders.filter(
//       profile => profile.profile_state === profile_state
//     );
//     console.log(userProfiles);
//     setProfiles(profileList);
//     console.log(userProfiles);
//   };
//   return (
//     <main>
//       <AdminNavbar />
//       <Section>
//         <Title>
//           <H2>Service Providers</H2>
//           <Underline></Underline>
//         </Title>
//         <ButtonContainer>
//           <Button type="button" onClick={() => filterProfiles('created')}>
//             New Profiles
//           </Button>
//           <Button type="button" onClick={() => filterProfiles('approved')}>
//             Approved Profiles
//           </Button>
//           <Button type="button" onClick={() => filterProfiles('suspended')}>
//             Suspended Profiles
//           </Button>
//         </ButtonContainer>
//         <ProfileSet allProfiles={userProfiles} />
//       </Section>
//     </main>
//   );
// }

// export default UserManage;
