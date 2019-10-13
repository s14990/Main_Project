import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Artykuls from './components/Artukyls';
import Add_Scans from './components/Add_Scans';
import Scans from './components/Scans';
import Login from './components/Login';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
        <Route path='/artykuls' component={Artykuls} />
        <Route path='/add_scans' component={Add_Scans} />
        <Route path='/scans' component={Scans} />
        <Route path='/login' component={Login} />
  </Layout>
);
