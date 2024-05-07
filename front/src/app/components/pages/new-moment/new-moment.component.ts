import { MomentService } from './../../../services/moment.service';
import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../Moment';
import { MessagesService } from '../../../services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async createHandler(event: Moment) {
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.description);

    if (event.image) {
      formData.append('image', event.image);
    }

    await this.momentService.createMoment(formData).subscribe();

    this.messageService.add('Momento adicionado com sucesso!');

    this.router.navigate(['/']);
  }
}
