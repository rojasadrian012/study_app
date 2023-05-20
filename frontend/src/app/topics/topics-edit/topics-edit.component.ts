import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-topics-edit',
  templateUrl: './topics-edit.component.html',
  styleUrls: ['./topics-edit.component.scss'],
})
export class TopicsEditComponent implements OnInit {
  topic: any = {};
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);


  constructor(
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    axios.get("http://localhost:3000/topics/" + id)
      .then(result => {
        if (result.data.success == true) {

          if (result.data.topicos != null) {
            this.topic = result.data.topicos;

          } else {
            this.topic = {};
          }

        } else {
          console.log(result.data.error);
        }

      }).catch(error => {
        console.log(error.message);
      })
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  saveUser() {
    console.log("topics", this.topic);
    var data = {
      id: this.topic.id,
      name: this.topic.name,
      create_date: this.topic.create_date,
      color: this.topic.color
    }

    axios.post("http://localhost:3000/topics/update", data)
      .then(async result => {
        if (result.data.success == true) {
          this.presentToats("Topicp Guardado!!!");
          this.router.navigate(["/topics"]);
        } else {
          this.presentToats(result.data.error);
        }

      }).catch(async error => {
        this.presentToats(error.message.data.error);
      })
  }

  async presentToats(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

}
