import './App.css';
import ClickEffect from './view/clickEffect';
import Footer from './view/footer';
import Header from './view/header';
import View01 from './view/view01';
import View02 from './view/view02';
import View03 from './view/view03';
import View05 from './view/view05';

function App() {


  return (
    <>
    <ClickEffect/>
    <Header/>
{/* 

<div ref={ref} className="relative">
  <ScrollImage/> 
  <View01/>
  <View02/>
  <View03/>
</div>

*/}

    <div className='hidden lg:block'>
      <View01/>
      <View02/>
      <View03/>
      <View05/>
    </div>
      <Footer/>
    </>
  );
}

export default App;
