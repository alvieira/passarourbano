import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((termo: string) => {
          console.log('requisição http para a api');

          if (termo.trim() === '') {
            return of<Oferta[]>([]);
          }
          return this.ofertasService.pesquisaOfertas(termo);
        }),
        catchError((err: any) => {
          console.log(err);
          return of<Oferta[]>([]);
        })
      )
    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas));
  }

  /**
   * pesquisa
event: Event   */
  public pesquisa(termoDaBusca: string) {
    console.log('keyup character: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);

  }

}
