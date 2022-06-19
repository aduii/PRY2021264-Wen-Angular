import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { FormComponent } from './form/form.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { EditAllFormsComponent } from './edit-all-forms/edit-all-forms.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'newProduct', component: FormComponent },
  { path: 'editProduct', component: EditFormComponent },
  { path: 'editAllProduct', component: EditAllFormsComponent },
  { path: 'newProduct/:id', component: FormComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
