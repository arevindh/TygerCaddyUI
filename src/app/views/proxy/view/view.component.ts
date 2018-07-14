import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../../../services/proxy/proxy.service';
import { Proxy } from '../../../models/Proxy';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  proxies: Proxy[];

  constructor(private proxyservice: ProxyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadProxyList();
  }

  loadProxyList() {
    this
      .proxyservice
      .getProxies()
      .subscribe((data: Proxy[]) => {
        this.proxies = data;
        console.log('loaded proxy list');
      });
  }

  deleteProxy(proxy) {
    this
      .proxyservice
      .deleteProxy(proxy.id)
      .subscribe(result => {
        this.removeFromList(proxy);
        this.toastr.success('Proxy deleted!', 'Success');
      }, error => {
        this.toastr.error('Unable to add Proxy', 'Failed');
      });
  }

  removeFromList(proxy) {
    this.proxies = this.proxies.filter(item => item !== proxy);
  }

}
