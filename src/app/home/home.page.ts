/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  data = { fname: '',pnum: '',email: '',city: '',job: ''};
  mobNumberPattern = '^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$';
  baseURI = 'https://cloudide.appson.in/workspace/vaishnavi/registration.php';
  message: any;
  form: any;


  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(){
    this.router.navigate(['/home']);
  }

  register(submitform: NgForm){
    this.checkalert();
    this.form = submitform;
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
     this.message = data1;
     this.successalert();
    },
    err => {
    console.log('ERROR!: ', err);
    this.erroralert();
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
        }
      }]
     }).then(alertEL => {
       alertEL.present();
     });
  }

  successalert(){
    this.alertCtrl.create({
      header: this.data.fname ,
      message: this.message,
      buttons: [
        {
        text: 'Okay',
        handler: () => {
          this.form.resetForm();
          this.router.navigate(['/home']);
        }
      }]
     }).then(alertEL => {
       alertEL.present();
     });
  }

  erroralert(){
    this.alertCtrl.create({
      header: 'Error !!!',
      message: 'Try Again Later',
      buttons: [
        {
        text: 'Okay',
        handler: () => {
          this.form.resetForm();
          this.router.navigate(['/home']);
        }
      }]
     }).then(alertEL => {
       alertEL.present();
     });
  }

}
