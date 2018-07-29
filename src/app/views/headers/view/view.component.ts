import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../services/header/header.service';
import { Header } from '../../../models/Header';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {


  headers: Header[];

  constructor(
    private headerservice: HeaderService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadProxyList();
  }

  loadProxyList() {
    this
      .headerservice
      .getHeaders()
      .subscribe((data: Header[]) => {
        this.headers = data;
        console.log('loaded proxy list');
      });
  }

  deleteHeader(header) {
    this
      .headerservice
      .deleteHeader(header.id)
      .subscribe(result => {
        this.removeFromList(header);
        this.toastr.success('Header deleted!', 'Success');
      }, error => {
        this.toastr.error('Unable to delete header', 'Failed');
      });
  }

  removeFromList(header) {
    this.headers = this.headers.filter(item => item !== header);
  }
}
