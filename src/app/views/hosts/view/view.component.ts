import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { HostService } from '../../../services/host/host.service';
import { Host } from '../../../models/Host';

@Component({
  templateUrl: 'view.component.html'
})
export class ViewComponent implements OnInit {

  hosts: Host[];

  constructor(private hostService: HostService, private router: Router) { }

  ngOnInit() {
    this
      .hostService
      .getHosts()
      .subscribe((data: Host[]) => {
        this.hosts = data;
      });
  }


  deleteHost(host: Host) {
    this
      .hostService
      .deleteHost(host.id)
      .subscribe();
    console.log("deleted " + host.host_name);
    this.hosts = this.hosts.filter(item => item !== host);
  }

}
