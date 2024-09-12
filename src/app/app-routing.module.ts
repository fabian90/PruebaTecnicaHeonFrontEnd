import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EmployeeCreateComponent, canActivate: [AuthGuard] },
  { path: 'entity', component: EntityListComponent },
  { path: 'entity/create', component: EntityFormComponent, canActivate: [AuthGuard] },
  { path: 'entity/edit/:id', component: EntityFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
