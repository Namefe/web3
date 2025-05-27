import './App.css';
import ClickEffect from './view/clickEffect';
import Footer from './view/footer';
import Header from './view/header';
import View01 from './view/view01';
import View01M from './view/view01M';
import View02 from './view/view02';
import View02M from './view/view02M';
import View03 from './view/view03';
import View04 from './view/view04';
import View05 from './view/view05';

function App() {
  return (
    <>
    <ClickEffect/>
    <Header/>
      <View01/>
      <View01M/>
      <View02/>
      <View02M/>
      <View03/>
      <View04/>
      <View05/>
      <Footer/>
    </>
  );
}

export default App;
