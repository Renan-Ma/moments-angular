import { ComentService } from './../../../services/coment.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../../../services/messages.service';
import { firstValueFrom } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Comment } from '../../../Comment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();

  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: ComentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: Number) {
    //pega a resposta do endpoint e salva no response
    try {
      const response: any = await firstValueFrom(
        this.momentService.deleteMoment(id)
      );
      this.messagesService.add(response.message);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  async submit(formDir: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }
    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add("Comentário adicionado")
    
    //reseta o form
    this.commentForm.reset();
    formDir.resetForm();
  }
}
