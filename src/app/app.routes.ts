import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { Login } from './Pages/login/login';
import { Register } from './Pages/register/register';
import { MyTrips } from './Pages/my-trips/my-trips';
import { AllTrips } from './Pages/all-trips/all-trips';
import { Home } from './Pages/home/home';
import { SingleTrip } from './Pages/single-trip/single-trip';
import { BookedTripCard } from './components/booked-trip-card/booked-trip-card';
import { HomeAdmin } from './Features/Admin/Pages/home-admin/home-admin';
import { adminGuard } from './services/admin.guard';
import { AdminTrips } from './Features/Admin/Pages/admin-trips/admin-trips';
import { AdminBooking } from './Features/Admin/Pages/admin-booking/admin-booking';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'home',
    canMatch: [authGuard],
    component: Home,
    children: [
      { path: '', redirectTo: 'all-trips', pathMatch: 'full' },

      { path: 'all-trips', component: AllTrips },
      { path: 'all-trips/:id', component: SingleTrip },

      { path: 'my-trips', component: MyTrips },
      { path: 'my-trips/:id', component: BookedTripCard },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canMatch: [adminGuard],
    component: HomeAdmin,
    children: [
      {
        path: 'all-trips',
        component: AdminTrips,
      },
      { path: 'all-booking', component: AdminBooking },
    ],
  },
];
