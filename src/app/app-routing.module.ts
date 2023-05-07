import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectComponent } from './components/select.component';
import { ViewComponent } from './components/view.component';

const routes: Routes = [
  { path: '', component: SelectComponent },
  { path: 'view/:pokemon', component: ViewComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
