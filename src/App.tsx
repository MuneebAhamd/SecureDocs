import "./App.css";
// import HomeScreen from "./components/HomeScreen.js/HomeScreen";
import FAQs from "./components/FAQs/Faq";
import DashBoard from "./components/DashBoard/DashBoard";
import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/Header/HeaderComponent";
import UserProfile from "./components/Files/Files";
import "./globalTypes/global.d.ts";
import Protected from "./components/Protected";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile/Profile";
import HomeScreen from "./components/HomeScreen/HomeScreen";
const App = () => {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path='/' element={<Protected Component={HomeScreen} />} /> */}
        <Route path="Profile" element={<Profile />} />
        <Route path="faq" element={<Protected Component={FAQs} />} />
        <Route path="dashBoard" element={<Protected Component={DashBoard} />} />
        <Route path="files" element={<Protected Component={UserProfile} />} />
        <Route
          path="files/:type"
          element={<Protected Component={UserProfile} />}
        />
        <Route path="#" element={<Protected Component={UserProfile} />} />
      </Routes>
    </div>
  );
};

export default App;
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HeaderComponent from "./components/Header/HeaderComponent";
// import HomeScreen from "./components/HomeScreen/HomeScreen";
// import FAQs from "./components/FAQs/Faq";
// import DashBoard from "./components/DashBoard/DashBoard";
// import UserProfile from "./components/Files/Files";
// import Protected from "./components/Protected";
// import Profile from "./components/Profile/Profile";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   return (
//     <div className="App">
//       <Router>
//         <HeaderComponent />
//         <Routes>
//           <Route path="/" element={<HomeScreen />} />
//           {/* <Route path="/" element={<Protected Component={HomeScreen} />} /> */}
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/faq" element={<Protected Component={FAQs} />} />
//           <Route
//             path="/dashboard"
//             element={<Protected Component={DashBoard} />}
//           />
//           <Route
//             path="/files"
//             element={<Protected Component={UserProfile} />}
//           />
//           <Route
//             path="/files/:type"
//             element={<Protected Component={UserProfile} />}
//           />
//           <Route path="/*" element={<Protected Component={UserProfile} />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;
