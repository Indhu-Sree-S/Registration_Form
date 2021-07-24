import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  flag: number;

  constructor(
    private connect: ConnectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.flag = this.connect.nowork();
  }

  buttonclick(){
    this.router.navigate(['./home']);
  }



}
