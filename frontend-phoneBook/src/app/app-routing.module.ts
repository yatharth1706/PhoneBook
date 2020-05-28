import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { CreateContactComponent } from './pages/create-contact/create-contact.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'create-contact' , component : CreateContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
