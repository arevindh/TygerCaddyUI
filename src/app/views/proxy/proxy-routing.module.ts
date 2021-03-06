import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ProxyComponent } from './proxy.component';

const routes: Routes = [
  {
    path: '',
    component: ProxyComponent,
    data: {
      title: 'Proxies'
    },
    children :[
      {
        path :'view',
        component : ViewComponent,
        data: {
          title: 'View'
        }
      },
      {
        path :'edit/:id',
        component : EditComponent,
        data: {
          title: 'Proxy Details',
          type : 'edit'
        }
      },
      {
        path :'add',
        component : EditComponent,
        data: {
          title: 'Add',
          type : 'add'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProxyRoutingModule { }
