import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimpsonApi } from '../../../../services/simpsonsService';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-simpsons-detail',
  imports: [],
  templateUrl: './simpsons-detail.html',
  styleUrl: './simpsons-detail.css',
})
export class SimpsonsDetail {
  private route = inject(ActivatedRoute);
  private service = inject(SimpsonApi);

  personaje = toSignal(
    this.route.paramMap.pipe(
      map((params) => +params.get('id')!),
      switchMap((id) => this.service.getCharacterById(id))
    ),
    { initialValue: null }
  );
}
