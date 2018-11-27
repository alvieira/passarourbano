import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaPagamento: string = '';

  // controles de validação dos campos
  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;

  // estados primitivos dos campos (pristine)
  public enderecoEstadoPrimitivo: boolean = true;
  public numeroEstadoPrimitivo: boolean = true;
  public complementoEstadoPrimitivo: boolean = true;
  public formaPagamentoEstadoPrimitivo: boolean = true;

  // controlar botão confirmar compra
  public formEstado: string = 'disabled';

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    this.ordemCompraService.efetivarComprar();
  }

  /**
   * atualizaEndereco
   */
  public atualizaEndereco(endereco: string): void {
    this.endereco = endereco;

    this.enderecoEstadoPrimitivo = false;
    //console.log(this.endereco);

    if (this.endereco.length > 3) {
      this.enderecoValido = true;
    } else {
      this.enderecoValido = false;
    }

    this.habilitaForm();
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero;

    this.numeroEstadoPrimitivo = false;
    //console.log(this.numero);

    if (this.numero.length > 1) {
      this.numeroValido = true;
    } else {
      this.numeroValido = false;
    }

    this.habilitaForm();
  }

  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento;

    this.complementoEstadoPrimitivo = false;
    //console.log(this.complemento);

    if (this.complemento.length > 0) {
      this.complementoValido = true;
    } else {
      this.complementoValido = false;
    }

    this.habilitaForm();
  }

  public atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento;

    this.formaPagamentoEstadoPrimitivo = false;
    console.log(this.formaPagamento);

    if (this.formaPagamento.length > 0) {
      this.formaPagamentoValido = true;
    } else {
      this.formaPagamentoValido = false;
    }

    this.habilitaForm();
  }
 
  public habilitaForm(): void {
    if(this.enderecoValido === true && this.numeroValido === true && this.formaPagamentoValido === true) {
      this.formEstado = '';
    } else {
      this.formEstado = 'disabled';
    }
  }

}
