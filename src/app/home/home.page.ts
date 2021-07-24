/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ConnectService } from './connect.service';
import { variable05 } from './variable';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  data = { fname: '',pnum: '',email: '',city: '',job: ''};
  mobNumberPattern = '^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$';
  baseURI = 'https://cloudide.appson.in/workspace/vaishnavi/registration.php';
 // baseURI = 'registration.php';
   hideForm: boolean;


  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private http: HttpClient,
    private connect: ConnectService
  ) {}

  ngOnInit(){
    this.router.navigate(['/home']);
  }

  register(submitform: NgForm){
    this.checkalert();
    }

  sending(){
    const file=JSON.stringify(
      {
      Fullname: this.data.fname,
      Email_id: this.data.email,
      Phone_number: this.data.pnum,
      City: this.data.city,
      Profession: this.data.job
     }
    );
    console.log(file);
    this.http.post(this.baseURI,file)
    .subscribe(data1 => {
     console.log(data1);
     //alert('working');
     //this.connect.success(this.data);
    },
    err => {
    console.log('ERROR!: ', err);
    //alert('NOt Working');
    this.connect.notworking(err);
    //this.hideForm   = true;
    //this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
  });
  }

  checkalert(){
    this.alertCtrl.create({
      header: this.data.fname ,
      message: 'Mobile Number '+ this.data.pnum + ' and Email Id '+ this.data.email,
      buttons: [
        {
          text: 'Edit',
          role: 'cancel'},
      {
        text: 'Submit',
        handler: () => {
          this.sending();
          this.router.navigate(['/home/confirm']);
        }
      }]
     }).then(alertEL => {
       alertEL.present();
     });
  }

}
