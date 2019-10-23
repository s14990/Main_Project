import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Artykuls from './components/Artykuls/Artykuls';
import Add_Scans from './components/Scans/Add_Scans';
import Scans from './components/Scans/Scans';
import Login_Form from './components/Login/Login_Form';
import EditArtykul from './components/Artykuls/EditArtykul';
import ShowArtykul from './components/Artykuls/ShowArtykul';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
        <Route path='/artykuls' component={Artykuls} />
        <Route path='/add_scans' component={Add_Scans} />
        <Route path='/scans' component={Scans} />
        <Route path='/login' component={Login_Form} />
        <Route path='/forecast' component={FetchData} />
        <Route path='/counter' component={Counter} />
        <Route exact path='/artykul_edit/:id' component={EditArtykul} />
        <Route exact path='/artykul_show/:id' component={ShowArtykul} />
  </Layout>
);
