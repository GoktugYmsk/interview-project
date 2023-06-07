import { Helmet } from 'react-helmet';

import Header from './components/header';
import Content from './components/content';
import './App.css';

function App() {

  return (
    <div className="App">
      <Helmet>
        <title>Pinsoft Shopping</title>
      </Helmet>
      <Header />
      <Content />
    </div>
  );
}

export default App;
