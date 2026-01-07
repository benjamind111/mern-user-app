import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import TestFunction from './components/Test.jsx' 
import PropFunction from './components/Props.jsx'
import StateFunction from './components/State.jsx'
import DynamicButton from './components/Rendering.jsx'
import RandomColors from './components/ColorChange.jsx'
import MapMovies from './components/Mapping.jsx'
import DataEffect from './components/Effect.jsx'
import RandomDogs from './components/RandomDogs.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import HomePage from './components/routes/Home.jsx'
// import ServicePage from './components/routes/Service.jsx'
// import ContactPage from './components/routes/Contact.jsx'
// import AboutPage from './components/routes/About.jsx'
import NavBarPage from './components/routes/NavBar.jsx'
import Route404 from './components/routes/Route404.jsx'
import User from './components/routes/User.jsx'
import PropDrilling1 from './components/PropDrilling.jsx'
import Counter from './components/Counter.jsx'
import Useref from './components/ref/Useref.jsx'
import InputRef from './components/ref/InputRef.jsx'
import VideoRef from './components/ref/VideoRef.jsx'
import CRUD from './components/CRUD.jsx'


// const HomePage=lazy(()=>import('./components/routes/Home.jsx'))
// const ServicePage=lazy(()=> import('./components/routes/Service.jsx'))
// const ContactPage=lazy(()=>import('./components/routes/Contact.jsx'))
// const AboutPage=lazy(()=>import('./components/routes/About.jsx'))


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <TestFunction/> */}
    {/* <PropFunction name="benjamin" age={25} heroname='batman' isTrue={true} />
    <PropFunction name="daniel" age={26} heroname='spiderman' /> */}
    {/* // <StateFunction/> */}
    {/* <DynamicButton name='Benjamin' /> */}
    {/* <RandomColors /> */}
    {/* <MapMovies /> */}
    {/* <DataEffect /> */}
    {/* <RandomDogs/> */}
      {/* <BrowserRouter>
      <NavBarPage/>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
        
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/service' element={<ServicePage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/about' element={<AboutPage/>} />
          <Route path='*' element={<Route404/>} />
          <Route path='/user/:username' element={<User/>} />
        </Routes>
      </Suspense>
      </BrowserRouter> */}
      {/* <PropDrilling1/> */}
      {/* <Counter/> */}
      {/* <DataEffect/> */}
      {/* {<Useref/>} */}
      {/* {<InputRef />} */}
      {/* {<VideoRef/>} */}
      {/* {<CRUD />} */}

  </StrictMode>,
)


//browserRouter
//routes
//route(path)
//hashRouter
//unstable history router
//memory router
//server router