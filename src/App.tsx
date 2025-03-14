import { createGlobalStyle } from "styled-components";
import { HashRouter, Route, Routes} from "react-router-dom";
import { LessonPage } from "./pages/LessonPage";
import { Error404 } from "./pages/Error404";
import { NavBarComponent } from "./components/NavBar/NavBarComponent";
import { HomePage } from "./pages/HomePage";
import { CoursePage } from "./pages/CoursePage";
import { ModulePage } from "./pages/ModulePage";
import { PageProvider } from "./hooks/PageContext";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import BottomBar from "./components/BottomBar/BottomBar";
import { UserPage } from "./pages/UserPage";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
  body {
    font-family: 'Poppins', sans-serif;
  }
`;
export default GlobalStyle;


export const App = () => {
  return (
    <>
    <PageProvider>
      <HashRouter>
        <NavBarComponent/>
        <div style={{ marginTop: '60px', padding: '20px' }}>
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/courses/:id" element={<CoursePage/>} />
            <Route path="/modules/:id" element={<ModulePage/>} />
            <Route path="/lessons/:id" element={<LessonPage/>} />
            <Route path="/users" element={<UserPage/>} />
            <Route path="*" element={<Error404/>} />
          </Routes>
        </div>
        <BottomBar />
      </HashRouter>
    </PageProvider>
    </>
  );
};


