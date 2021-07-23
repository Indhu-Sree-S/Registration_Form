/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data = { fname: '',pnum: '',email: '',city: '',job: ''};
  mobNumberPattern = '^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$';
  baseURI = 'https://cloudide.appson.in/workspace/vaishnavi/Registration/registration.php';
  data1 = this.data;
  hideForm: boolean;


  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private http: HttpClient
  ) {}

  register(submitform: NgForm){
    this.data1.fname = submitform.value.fname;
    this.data1.email = submitform.value.email;
    this.data1.pnum = submitform.value.pnum;
    this.data1.city = submitform.value.city;
    this.data1.job = submitform.value.job;
    this.sending();
    this.successalert();
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
    .subscribe(data => {
     console.log(data);
     alert('working');
    },
    err => {
    console.log('ERROR!: ', err);
    alert('NOt Working');
    alert(err);
    console.log(err);
    this.hideForm   = true;
    //this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
  });
  }

  successalert(){
    this.alertCtrl.create({
      header: 'Thank You' ,
      message: 'Registered Successfully',
      buttons: [
      {
        text: 'Okay',
        handler: () => {
          this.router.navigate(['/home']);
        }
      }]
     }).then(alertEL => {
       alertEL.present();
     });
  }

}
