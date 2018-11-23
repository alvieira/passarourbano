import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs';

import { Oferta } from "./shared/oferta.model";
import { URL_API } from "./app.api";
import { Observable } from "rxjs";
import { map, retry } from 'rxjs/operators';

@Injectable()
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas';

    public ofertas: Oferta[];

    constructor(private http: Http) { }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }

    /**
     * getOfertasPorCategoria
categoria: string  : Promise<Oferta[]>    */
    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }

    /**
     * getOfertaPorId
     */
    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0];
            })
    }

    /**
     * getComoUsarOfertaPorId
id: number : Promise<string>    */
    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao;
            })
    }

    /**
     * getComoUsarOfertaPorId
id: number : Promise<string>    */
    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao;
            })
    }

    /**
     * pesquisaOfertas
    termo: string  : Obser*/
    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)            
            .pipe(
                retry(10),
                map((resposta: Response) => resposta.json())
            );
    }

    /*
    public ofertas: Array<Oferta> = [
        {
            id: 1,
            categoria: "restaurante",
            titulo: "Super Burger",
            descricao_oferta: "Rodízio de Mini-hambúrger com opção de entrada.",
            anunciante: "Original Burger",
            valor: 29.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/1/img1.jpg" },
                { url: "/assets/ofertas/1/img2.jpg" },
                { url: "/assets/ofertas/1/img3.jpg" },
                { url: "/assets/ofertas/1/img4.jpg" }
            ]
        },
        {
            id: 2,
            categoria: "restaurante",
            titulo: "Cozinha Mexicana",
            descricao_oferta: "Almoço ou Jantar com Rodízio Mexicano delicioso.",
            anunciante: "Mexicana",
            valor: 32.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/2/img1.jpg" },
                { url: "/assets/ofertas/2/img2.jpg" },
                { url: "/assets/ofertas/2/img3.jpg" },
                { url: "/assets/ofertas/2/img4.jpg" }
            ]

        },
        {
            id: 4,
            categoria: "diversao",
            titulo: "Estância das águas",
            descricao_oferta: "Diversão garantida com piscinas, trilhas e muito mais.",
            anunciante: "Estância das águas",
            valor: 31.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/3/img1.jpg" },
                { url: "/assets/ofertas/3/img2.jpg" },
                { url: "/assets/ofertas/3/img3.jpg" },
                { url: "/assets/ofertas/3/img4.jpg" },
                { url: "/assets/ofertas/3/img5.jpg" },
                { url: "/assets/ofertas/3/img6.jpg" }
            ]
        }
    ]
    /**
     * getOfertas
 : Array<string>    
    public getOfertas(): Array<Oferta> {
        return this.ofertas;
    }

    public getOfertas2(): Promise<Oferta[]> {
        return new Promise((resolve, reject) => {
            let deu_certo = true;
            if (deu_certo) {
                setTimeout(() => resolve(this.ofertas), 3000);
            } else {
                reject({ codigo_erro: 404, mensage: 'Serviço não encontrado XYZ!' });
            }
        })
            .then((ofertas: Oferta[]) => {
                console.log('primeiro then');
                return ofertas;
            })
            .then((ofertas: Oferta[]) => {
                console.log('segundo then');
                return new Promise((resolve2, reject2) => {
                    setTimeout(() => resolve2(this.ofertas), 3000); 
                });
            })
            .then((ofertas: Oferta[]) => {
                console.log('terceiro then executado após 3 s porque estava aguardando uma promise ser resolvida');
                return ofertas;
            })
    }
    */
}