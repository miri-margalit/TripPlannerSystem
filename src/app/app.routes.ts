import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { Login } from './Pages/login/login';
import { Register } from './Pages/register/register';
import { MyTrips } from './Pages/my-trips/my-trips';
import { AllTrips } from './Pages/all-trips/all-trips';
import { Home } from './Pages/home/home';
import { SingleTrip } from './Pages/single-trip/single-trip';
import { BookedTripCard } from './components/booked-trip-card/booked-trip-card';

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
];
