import './App.css';
import ClickEffect from './view/clickEffect';
import Footer from './view/footer';
import Header from './view/header';
import Mobile from './view/mobile/mobile';
import View01 from './view/view01';
import View02 from './view/view02';
import View03 from './view/view03';
import View05 from './view/view05';

function App() {


  return (
    <>
    <ClickEffect/>
    <Header/>

    <div className='hidden lg:block'>
      <View01/>
      <View02/>
      <View03/>
    </div>
    {/* <div className='block lg:hidden'>
      <Mobile/>
    </div> */}
    <View05/>
      <Footer/>
    </>
  );
}

export default App;
