import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-bootstrap';

import data from './assets/data';

import Header from './components/header';
import LeftBar from './components/content/leftBar';
import Content from './components/content';
import Basket from './components/header/basket';

import './App.css';

function App() {
  const [list, setList] = useState(data);

  return (
    <div className="App">
      <Helmet>
        <title>Pinsoft Shopping</title>
      </Helmet>
      <Row>
        <Col md={12} lg={12} >
          <Header />
        </Col>
      </Row>
      <Row>
        <Col md={4} lg={4} >
          <LeftBar setList={setList} />
        </Col>
        <Col md={8} lg={8} >
          <Content list={list} />
        </Col>
      </Row>
      <Basket />
    </div>
  );
}

export default App;
