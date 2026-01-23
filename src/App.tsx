import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import View from "./pages/View";
import Community from "./pages/Community";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import AuthPage from "./pages/auth/AuthPage";
import Settings from "./pages/Settings";
import Loading from "./pages/Loading";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/Privacy";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

const App = () => {
  const { pathname } = useLocation();
  const hideComponent =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");

  return (
    <div>
      <Toaster />
      {!hideComponent && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/projects" element={<MyProjects />} />
          <Route path="/projects/:projectId" element={<Projects />} />
          <Route path="/preview/:projectId" element={<Preview />} />
          <Route path="/preview/:projectId/:versionId" element={<Preview />} />
          <Route path="/view/:projectId" element={<View />} />
          <Route path="/community" element={<Community />} />
          <Route path="/auth/:pathname" element={<AuthPage />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/loading" element={<Loading />} />

          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!hideComponent && <Footer />}
    </div>
  );
};

export default App;
