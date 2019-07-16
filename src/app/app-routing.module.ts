import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { EditComponent } from './edit/edit.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  {path: 'edit', component: EditComponent},
  {path: 'request', component: RequestComponent},
  {path: '', component: ManageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
