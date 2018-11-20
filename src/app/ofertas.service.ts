import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs';

import { Oferta } from "./shared/oferta.model";
import { URL_API } from "./app.api";

@Injectable()
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas';

    constructor(private http: Http) {}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}?destaque=true`)
        .toPromise()
        .then((resposta: any) => resposta.json());
    }

    /**
     * getOfertasPorCategoria
categoria: string  : Promise<Oferta[]>    */
    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta.json());
    }

    /**
     * getOfertaPorId
     */
    public getOfertaPorId(id: number): Promise<Oferta>  {
        return this.http.get(`${URL_API}?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta.json()[0];
        })
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