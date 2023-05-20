import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topicos: any[] = []
  topicEditing: any = null;

  constructor(
    private toastController: ToastController,

  ) {
    this.getTopics()
  }


  ngOnInit() {
    this.getTopics()
  }

  getTopics() {
    axios.get("http://localhost:3000/topics/listarTodos")
      .then(result => {
        if (result.data.success == true) {
          this.topicos = result.data.topicos;
        } else {
          console.log(result.data.error);
        }

      }).catch(error => {
        console.log(error.message);
      })
  }

  deleteTopic(id: number) {
    axios.delete(`http://localhost:3000/topics/delete/${id}`)
      .then(result => {
        if (result.data.success) {
          this.presentToats("Topicp Eliminado!!!");
          this.getTopics()
          this.topicos = this.topicos.filter(t => t.id !== id);
        } else {
          console.error('Error al eliminar el tópico');
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  async presentToats(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  editar(topic: any) {
    console.log(topic);

    this.topicEditing = topic;
  }

  saveTopic() {
    // Aquí deberías guardar los cambios en tu servidor
    axios.put('http://localhost:3000/topics/update', this.topicEditing)
      .then(res => {
        console.log(res.data);
        this.topicEditing = null; // finaliza la edición
      })
      .catch(error => {
        console.log(error);
      });
  }

  cancelEdit() {
    this.topicEditing = null; // finaliza la edición sin guardar
  }

  nuevo() {
    console.log("nuevo");

  }

}
