import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import SignUp from "./pages/auth/sign-up";
import SignIn from "./pages/auth/sign-in";
import AuthProvider from "./contexts/auth/AuthProvider";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<div>Admin Dashboard</div>} />
            <Route path="/admin/users" element={<div>Users</div>} />
          </Route>
        </Routes>
      </AuthProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
