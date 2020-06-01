import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { CreateContactComponent } from './pages/create-contact/create-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'create-contact' , component : CreateContactComponent },
  { path: 'edit-contact/:contactId' , component : EditContactComponent },
  { path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
