import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'notemgnt',
    pathMatch: 'full'
  },
  {
    path: 'docmgnt',
    loadChildren: () => import('./pages/doc-management/doc-management.module').then(m => m.DocManagementPageModule)
  },
  {
    path: 'notemgnt',
    loadChildren: () => import('./pages/note-management/note-management.module').then(m => m.NoteManagementPageModule)
  },
  {
    path: 'emimgnt',
    loadChildren: () => import('./pages/emi-management/emi-management.module').then(m => m.EMIManagementPageModule)
  },
  {
    path: 'goalmgnt',
    loadChildren: () => import('./pages/goal-management/goal-management.module').then(m => m.GoalManagementPageModule)
  },
  {
    path: 'daymgnt',
    loadChildren: () => import('./pages/day-management/day-management.module').then(m => m.DayManagementPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  //dummy links
  {
    path: 'customers',
    loadChildren: () => import('./pages/customer-management/customer-management.module').then(m => m.CustomerManagementPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },

  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopPageModule)
  },
  {
    path: 'offer',
    loadChildren: () => import('./pages/offer/offer.module').then(m => m.OfferPageModule)
  },

  {
    path: 'inventry',
    loadChildren: () => import('./pages/inventry/inventry.module').then(m => m.InventryPageModule)
  },

  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./pages/analytics/analytics.module').then(m => m.AnalyticsPageModule)
  },

  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrderPageModule)
  },

  {
    path: 'products',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule)
  },
  {
    path: 'search/:query',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'reminders/:reminderId',
    loadChildren: () => import('./pages/reminders/reminders.module').then( m => m.RemindersPageModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./pages/notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'goals',
    loadChildren: () => import('./pages/goals/goals.module').then( m => m.GoalsPageModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./pages/finance/finance.module').then( m => m.FinancePageModule)
  },
  {
    path: 'emi',
    loadChildren: () => import('./pages/emi/emi.module').then( m => m.EmiPageModule)
  },
  {
    path: 'docs',
    loadChildren: () => import('./pages/docs/docs.module').then( m => m.DocsPageModule)
  },
  {
    path: 'routine',
    loadChildren: () => import('./pages/routine/routine.module').then( m => m.RoutinePageModule)
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
