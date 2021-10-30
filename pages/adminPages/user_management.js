import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewProfileList from '../../components/adminComponents/NewProfileList';
import ApprovedList from '../../components/adminComponents/ApprovedList';
import SuspendedList from '../../components/adminComponents/SuspendedList';

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
