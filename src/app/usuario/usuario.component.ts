import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public articulos = [1,2,3,4,5,6,7,8,9]

  constructor() { }

  ngOnInit() {
  }

}
