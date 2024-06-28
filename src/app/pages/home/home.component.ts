import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tecsucu } from 'src/app/interfaces/tecsucu';
import { NavService } from 'src/app/services/nav.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';
import { TecsucuService } from 'src/app/services/tecsucu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cargando: boolean;
  columnas: any[] = [];
  listData: any[] = [];

  constructor(private router: Router, private tecnicosService: TecnicosService, private sucursalesService: SucursalesService, private navServicio: NavService) {
  }

  ngOnInit() {    
   this.cargando = true;
    this.listData = [];
    this.columnas = [];
    this.columnas = [
      { field: 'id', header: 'id', sort: false },
      { field: 'tecnico', header: 'Tecnico', sort: false },
      { field: 'sucursal', header: 'Sucursal', sort: false },
      { field: 'cantidad', header: 'Elementos Asignados', sort: false },
      { field: 'acciones', header: 'Acciones', sort: false }
    ];
    this.cargar();
  }

  cargar() {
    this.tecnicosService.getAll().subscribe(res1 => {
      var list = [];
      for (var r1 of res1) {
        var data1: Tecsucu[] = [];
        for (var r2 of r1.tecsucu) {
          data1.push(r2);
        }
        var data2 = {
          id: r1.id,
          tecnico: r1.nombre,
          sucursalid: null,
          sucursal: "",
          cantidad: r1.tecsucu.length
        };
        data2.sucursalid = data1.length > 0 ? data1[0].sucursal : 0;
        if (!r1.master) {
          list.push(data2);
        }
      }

      this.sucursalesService.getAll().subscribe(res2 => {
        var list2 = [];
        for (var ld2 of list) {
          var nombsucu = ld2.sucursalid > 0 ? res2.find(x => ld2.sucursalid == x.id).nombre : "";
          var data3 = {
            id: ld2.id,
            tecnico: ld2.tecnico,
            sucursal: nombsucu,
            cantidad: ld2.cantidad
          };
          list2.push(data3);
        }
        this.listData = list2;
        this.cargando = false;
      }, err => {
        this.navServicio.setMesage(3);
      });

    }, err => {
      this.navServicio.setMesage(3);
    });
  }

  add() {
    this.router.navigate(['addusuarios']);
  }

  edit(id: number) {
    this.router.navigate(['editusuarios/' + id]);
  }
}
