import { Component, effect, inject, resource, signal } from '@angular/core';
import { PaginationService } from '../../services/pagination-service';
import { SimpsonApi } from '../../services/simpsonsService';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Pagination } from '../../shared/components/pagination/pagination';
import { HeroSimpsons } from '../simpsons/components/hero-simpsons/hero-simpsons';
import { Breadcrumbs } from "../../shared/components/breadcrumbs/breadcrumbs";
import { BackToTop } from "../../shared/components/back-to-top/back-to-top";

@Component({
  selector: 'app-simpsons-page',
  imports: [RouterLink, Pagination, HeroSimpsons, Breadcrumbs, BackToTop],
  templateUrl: './simpsons-page.html',
  styleUrl: './simpsons-page.css',
})
export class SimpsonsPage {
  private simpsonsService = inject(SimpsonApi);
  paginationService = inject(PaginationService);

  charactersPerPage = signal(20);

  // Signal que mantiene el número total de páginas
  totalPages = signal(0);

  constructor() {
    // Effect que actualiza el número de páginas cuando hay datos válidos
    effect(() => {
      if (this.simpsonsResource.hasValue()) {
        this.totalPages.set(this.simpsonsResource.value().pages);
      }
    });
  }

  // simpsonsResource = toSignal(
  //   this.simpsonsService
  //     .getCharacters(this.paginationService.currentPage())
  //     .pipe(map((res) => res)),
  //   { initialValue: null }
  // );

  // simpsonsResource2 = resource({
  //   params: () => ({
  //     page: this.paginationService.currentPage() - 1,
  //     limit: this.charactersPerPage(),
  //   }),
  //   loader: async ({ params }) => {
  //     return this.simpsonsService.getCharactersOptions({
  //       offset: params.page,
  //       limit: params.limit,
  //     });
  //   },
  // });

  /// VERSIUON CON RXRESOURCE
  simpsonsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.charactersPerPage(),
    }),
    stream: ({ params }) => {
      return this.simpsonsService.getCharactersOptions({
        offset: params.page,
        limit: params.limit,
      });
    },
  });
}
