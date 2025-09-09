import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClientesListComponent } from './features/clientes/clientes-list/clientes-list.component';
import { ContratosListComponent } from './features/contratos/contratos-list/contratos-list.component';
import { ServicosListComponent } from './features/servicos/servicos-list/servicos-list.component';
import { CategoriasListComponent } from './features/categorias/categorias-list/categorias-list.component';

import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clientes', component: ClientesListComponent },
      { path: 'contratos', component: ContratosListComponent },
      { path: 'servicos', component: ServicosListComponent },
      { path: 'categorias', component: CategoriasListComponent }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }