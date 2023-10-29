import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import SignIn from "../components/register/SignIn";
import SignUp from "../components/register/SignUp";
import ProtectedRoutes from "../utils/ProtectedRoute";
import Confirmation from "../components/register/confirmation";
import Store from "../components/productsStore/Store";
import Upgrade from "../components/upgrade/Upgrade";
import Checkout from "../components/payment/Checkout";
import PaymentConfirmation from "../components/payment/PaymentConfirmation";

export default function AppRoutes () {
    return(
        <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upgrade" element={<Upgrade />} />
                <Route path="/store" element={<Store />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            </Route>

            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />

        </Routes>
    );
}
