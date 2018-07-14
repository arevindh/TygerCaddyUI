import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { HostService } from '../../../services/host/host.service';
import { Host } from '../../../models/Host';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'view.component.html'
})
export class ViewComponent implements OnInit {

  hosts: Host[];

  constructor(private hostService: HostService, private router: Router, private toastr: ToastrService) { }

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
      .subscribe(result => {
        this.removeFromList(host);
        this.toastr.success('Host deleted!', 'Success');
      }, error => {
        this.toastr.error('Unable to add Host', 'Failed');
      });

  }
  removeFromList(host) {
    this.hosts = this.hosts.filter(item => item !== host);
  }

}
