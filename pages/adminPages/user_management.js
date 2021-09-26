import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useQuery } from '@apollo/client';
import { GET_USERS_BY_AC_STATE } from '../../gql/query';
import tw from 'twin.macro';
import ProviderContainer from '../../components/ProviderContainer';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
  const user_query = useQuery(GET_USERS_BY_AC_STATE, {
    variables: {
      takeUsersAccountState: 'Pending'
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network'
  });
  console.log(user_query.data);

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
              {user_query.data &&
                user_query.data.takeUsers.map((obj, i) => {
                  return (
                    <ProviderContainer
                      key={i}
                      provider_rating={obj.provider_rating}
                      provider_review_count={obj.provider_review_count}
                      username={obj.username}
                      email={obj.email}
                      nic={obj.nic}
                      address={obj.address}
                      city={obj.city}
                      contactNumber={obj.contactNum}
                    />
                  );
                })}
              {/* <ProviderContainer
                provider_rating="00"
                provider_review_count="5241"
                fullname="Gotabaya Rajapaksha"
                username="GRPaksha"
                bio="President from America"
                city="New York"
                postalCode="265"
              /> */}
            </TabPanel>
            <TabPanel value={value} index={1}>
              No Profiles Suspended
            </TabPanel>
            <TabPanel value={value} index={2}>
              No Profiles Approved
            </TabPanel>
          </div>
          {/* <Button color="primary">Hello World</Button> */}
        </Content>
      </Container>
    </div>
  );
}

export default UserManage;
