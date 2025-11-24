import { Component, inject } from '@angular/core';
import { PaginationService } from '../../services/pagination-service';
import { SimpsonApi } from '../../services/api-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-simpsons-page',
  imports: [RouterLink],
  templateUrl: './simpsons-page.html',
  styleUrl: './simpsons-page.css',
})
export class SimpsonsPage {
  private simpsonsService = inject(SimpsonApi);
  paginationService = inject(PaginationService);

  simpsonsResource = toSignal(
    this.simpsonsService
      .getCharacters(this.paginationService.currentPage())
      .pipe(map((res) => res)),
    { initialValue: null }
  );
}
