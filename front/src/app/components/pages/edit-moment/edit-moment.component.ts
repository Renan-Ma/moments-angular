import { MessagesService } from './../../../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  async editHandler(event: Moment) {
    console.log("aq")
    const id = event.id;

    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.description);

    if (event.image) {
      formData.append('image', event.image);
    }

    await this.momentService.updateMoment(formData, id!).subscribe();

    this.messageService.add('Momento editado com sucesso!');

    this.router.navigate(['/']);
  }
}
