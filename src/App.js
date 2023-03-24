import { ColorModeContext, useMode } from './utils/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
// import { AuthProvider } from './hooks'

// auth
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// admin
import AdminPage from './pages/admin/AdminPage';

import Dashboard from './pages/admin/Dashboard';

import Medicines from './pages/admin/medicine/Medicines';
import CreateMedicine from './pages/admin/medicine/CreateMedicine';

import Categories from './pages/admin/category/Categories';
import CreateCategory from './pages/admin/category/CreateCategory';

import DeliveryPersons from './pages/admin/deliveryPerson/DeliveryPersons';
import CreateDeliveryPerson from './pages/admin/deliveryPerson/CreateDeliveryPerson';

import Orders from './pages/admin/order/Orders';

// user
import Users from './pages/admin/user/Users';
import ActivateEmail from './pages/auth/ActivateEmail';
import OrderDetails from './pages/admin/order/OrderDetails';
import EditMedicine from './pages/admin/medicine/EditMedicine';
import EditCategory from './pages/admin/category/EditCategory';
import ImageUpload from './components/ImageUpload';
import DeliverOrder from './pages/admin/order/DeliverOrder';

function App() {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* auth */}
          <Route path='/register' element={<Register />} />
          <Route path='/activateEmail/:activation_token' element={<ActivateEmail />} />          
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword/:token' element={<ResetPassword />} /> 

          {/* admin */}
          <Route path='/admin' element={<AdminPage />} >         

            <Route path='dashboard' element={<Dashboard />} />

            <Route path='medicines' element={<Medicines />} />
            <Route path='medicines/create' element={<CreateMedicine />} />
            <Route path='medicines/edit/:id' element={<EditMedicine />} />

            <Route path='categories' element={<Categories />} /> 
            <Route path='categories/create' element={<CreateCategory />} /> 
            <Route path='categories/edit/:id' element={<EditCategory />} />

            <Route path='deliveryPersons' element={<DeliveryPersons />} />
            <Route path='deliveryPersons/create' element={<CreateDeliveryPerson />} />

            <Route path='orders' element={<Orders />} />
            <Route path='orders/:id' element={<OrderDetails />} />
            <Route path='orders/deliver/:id' element={<DeliverOrder />} />

            <Route path='users' element={<Users />} />

            <Route path='test' element={<ImageUpload />} />

            {/* <Route path='/contacts' element={<Contacts />} /> */}
            {/* <Route path='/invoices' element={<Invoices />} /> */}
            {/* <Route path='/form' element={<Form />} /> */}
            {/* <Route path='/calendar' element={<Calendar />} /> */}
            {/* <Route path='/faq' element={<FAQ />} /> */}
            {/* <Route path='/bar' element={<Bar />} /> */}
            {/* <Route path='/pie' element={<Pie />} /> */}
            {/* <Route path='/line' element={<Line />} /> */}
            {/* <Route path='/geography' element={<Geography />} /> */}
          </Route>

        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
