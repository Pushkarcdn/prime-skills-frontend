import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import AuthLayout from "./components/layouts/AuthLayout";
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import SignUp from "./pages/auth/sign-up";
import SignIn from "./pages/auth/sign-in";
import AuthProvider from "./contexts/auth/AuthProvider";
import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import NewUser from "./pages/admin/users/new";
import UserEdit from "./pages/admin/users/edit";
import Jobs from "./pages/admin/jobs";
import NewJob from "./pages/admin/jobs/new";
import EditJob from "./pages/admin/jobs/edit";
import EmailVerificationFailed from "./pages/auth/email-verification/EmailVerificationFailed";
import NotFound from "./components/ui/NotFound";
import Search from "./pages/search";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route
              path="/auth/email-verification/failed"
              element={<EmailVerificationFailed />}
            />

            {/* 404 route */}
            <Route path="/auth/*" element={<NotFound />} />
          </Route>

          {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />

            {/* 404 route */}
            <Route path="/*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/new" element={<NewUser />} />
            <Route path="/admin/users/:id" element={<UserEdit />} />
            <Route path="/admin/jobs" element={<Jobs />} />
            <Route path="/admin/jobs/new" element={<NewJob />} />
            <Route path="/admin/jobs/:slug" element={<EditJob />} />

            {/* 404 route */}
            <Route path="/admin/*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>

      <ToastContainer
        position="top-center"
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
