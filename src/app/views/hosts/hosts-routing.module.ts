import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostsComponent } from './hosts.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: HostsComponent,
    data: {
      title: 'Hosts'
    },
    children :[
      {
        path :'view',
        component : ViewComponent,
        data: {
          title: 'Edit Hosts'
        }
      },
      {
        path :'edit',
        component : UpdateComponent,
        data: {
          title: 'Edit Hosts'
        }
      },
      {
        path :'add',
        component : UpdateComponent,
        data: {
          title: 'Add Hosts'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostsRoutingModule { }
