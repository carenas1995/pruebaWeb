import { HttpClient } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { Elements } from 'src/app/interfaces/elements';
import { Sucursales } from 'src/app/interfaces/sucursales';
import { Tecnicos } from 'src/app/interfaces/tecnicos';
import { ElementsService } from 'src/app/services/elements.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';
import { NavService } from 'src/app/services/nav.service';
import { Tecsucu } from 'src/app/interfaces/tecsucu';
import { TecsucuService } from 'src/app/services/tecsucu.service';
import { TecelementsService } from 'src/app/services/tecelements.service';
import { Tecelement } from 'src/app/interfaces/tecelement';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  tittle: string = "Agregar Tecnico";
  cargando: boolean = true;
  cargandoelements: boolean = true;
  valedit: boolean = false;
  tecnico: Tecnicos = {
    nombre: "",
    codigo: "",
    sueldo: 0,
    master: false
  };
  elemento: any = {
    id: 0,
    tecnico: 0,
    element: 0,
    codigo: "",
    cantidad: 0,
  };
  item: SelectItem = null;
  item2: SelectItem = null;
  Elementos: SelectItem[] = [];
  Sucursales: SelectItem[] = [];
  sucursal: Sucursales;
  listaElementos: Elements[];
  listaElementosedit: Tecelement[];
  listaElementoscompleta: Elements[];
  listaElementosasig: any[];
  listaSucursales: Sucursales[];
  listaSucursalescompleta: Sucursales[];
  columnas: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private tecnicosService: TecnicosService, private sucursalesService: SucursalesService, private elementosService: ElementsService, private tecsucuService: TecsucuService, private tecelementService: TecelementsService, private currencyPipe: CurrencyPipe, private navServicio: NavService) { }

  ngOnInit() {
    this.cargando = true;
    this.valedit = false;
    this.columnas = [];
    this.listaElementosasig = [];
    this.Elementos = [];
    this.Sucursales = [];
    this.sucursal = null;
    this.tecnico = {
      nombre: "",
      codigo: "",
      sueldo: 0,
      master: false
    };
    this.elemento = {
      id: 0,
      tecnico: 0,
      element: 0,
      codigo: "",
      cantidad: 0
    }
    this.sucursal = {
      id: 0,
      nombre: "",
      codigo: ""
    }
    this.item = { label: "", value: 0 };
    this.item2 = { label: "", value: 0 };
    this.columnas = [
      { field: 'nombre', header: 'Nombre', sort: false },
      { field: 'codigo', header: 'Codigo', sort: false },
      { field: 'cantidad', header: 'Cantidad', sort: false },
      { field: 'acciones', header: 'Acciones', sort: false }
    ];
    this.route.params.subscribe((params: Params) => {
      this.sucursalesService.getAll().subscribe(res2 => {
        this.listaSucursales = res2;
        this.listaSucursalescompleta = res2;
        this.elementosService.getAll().subscribe((res3: any) => {
          this.listaElementos = res3;
          this.listaElementoscompleta = res3;
          if (params['id']) {
            this.tittle = "Editar Tecnico";
            this.tecnicosService.getById(params['id']).subscribe(res => {
              this.tecnico = res;
              for (var te of res.tecelement) {
                var data: Elements = this.listaElementos.find(x => te.element == x.id);
                data.id = te.id;
                data.cantidad = te.cantidad;
                this.listaElementosasig.push(data);
              }
              for (var ts of res.tecsucu) {
                var data2: Sucursales = this.listaSucursales.find(x => ts.sucursal == x.id);
                if (data2) {
                  this.sucursal = data2;
                }
                else {
                  this.navServicio.setMesage(4, { severity: 'warning', summary: 'Datos Errados', detail: 'Error en la carga de la sucursal.' });
                }
              }
              for (var s of this.listaElementos) {
                if (s != null && s != undefined && s.id > 0 && !this.Elementos.find(x => x.value == s.id)) {
                  this.Elementos.push({ label: s.nombre, value: s.id });
                }
              }
              for (var t of this.listaSucursales) {
                if (t != null && t != undefined && t.id > 0 && !this.Sucursales.find(x => x.value == t.id)) {
                  this.Sucursales.push({ label: t.nombre, value: t.id });
                }
              }
              this.item2 = { label: this.sucursal.nombre, value: this.sucursal.id };
              this.cargandoelements = false;
              this.cargando = false;
            }, err => {
              this.navServicio.setMesage(3);
            });
          } else {
            this.tittle = "Agregar Tecnico";
            for (var l of this.listaElementos) {
              if (l != null && l != undefined && l.id > 0 && !this.Elementos.find(x => x.value == l.id)) {
                this.Elementos.push({ label: l.nombre, value: l.id })
              }
            }
            for (var s of this.listaSucursales) {
              if (s != null && s != undefined && s.id > 0 && !this.Elementos.find(x => x.value == s.id)) {
                this.Sucursales.push({ label: s.nombre, value: s.id })
              }
            }
            this.listaElementosasig = [];
            this.cargandoelements = false,
              this.cargando = false;
          }
        }, err => {
          this.navServicio.setMesage(3);
        });
      }, err => {
        this.navServicio.setMesage(3);
      });
    });
  }

  back() {
    this.router.navigate(['home']);
  }

  validate(event) {
    var selectitem = this.listaElementos.find(x => x.id == event.value);
    if (!this.listaElementosasig.find(y => y.codigo == selectitem.codigo)) {
      this.elemento.element = selectitem.id;
      this.elemento.codigo = selectitem.codigo;
      this.elemento.cantidad = 0;
    }
    else {
      this.navServicio.setMesage(4, { severity: 'warning', summary: 'Datos Errados', detail: 'El elemento que desea asignar ya esta registrado.' });
    }
  }

  validatesucu(event) {
    var selectitem = this.listaSucursales.find(x => x.id == event.value);
    if (selectitem) {
      this.sucursal = selectitem;
    }
    else {
      this.navServicio.setMesage(4, { severity: 'warning', summary: 'Datos Errados', detail: 'No ha seleccinado ninguna sucursal' });
    }
  }

  agregar(type) {
    this.clear();
    if (this.elemento.id > 0) {
      if (type == 'add') {
        this.listaElementosasig.push(this.elemento);
        var tecelm: Tecelement = { tecnico: this.tecnico.id, element: this.elemento.id, cantidad: this.elemento.cantidad }
        this.listaElementosedit.push(this.elemento);
        for (var s of this.listaElementos) {
          if (s != null && s != undefined && s.id > 0 && !this.Elementos.find(x => x.value == s.id)) {
            this.Elementos.push({ label: s.nombre, value: s.id })
          }
        }
      }
      else {
        if (this.listaElementosedit.find(x => x.id == this.elemento.id)) {
          this.listaElementosedit[this.listaElementosedit.findIndex(x => x.id == this.elemento.id)] = this.elemento;
        }
        else {
          this.listaElementosasig[this.listaElementosedit.findIndex(x => x.id == this.elemento.id)] = this.elemento;
          this.listaElementosedit.push(this.elemento);
        }
      }
    }
    else {
      this.navServicio.setMesage(4, { severity: 'warning', summary: 'Datos Errados', detail: 'El dato ingresado no es correcto.' });
    }
  }

  clear() {
    this.elemento = {
      id: 0,
      tecnico: 0,
      element: 0,
      codigo: "",
      cantidad: 0
    }
    this.valedit = false;
    this.item = { label: "", value: 0 };
    this.listaElementos = this.listaElementoscompleta;
    for (var l of this.listaElementos) {
      if (l != null && l != undefined && l.id > 0 && !this.Elementos.find(x => x.value == l.id)) {
        this.Elementos.push({ label: l.nombre, value: l.id })
      }
    }
  }

  edit(id: Number) {
    this.clear();
    this.Elementos = [];
    this.valedit = true;
    var l = this.listaElementoscompleta.find(x => x.id == id);
    this.item = { label: l.nombre, value: l.id };
    var d = this.listaElementosasig.find(y => y.element == l.id);
    var elemento = {
      element: this.item.value,
      tecnico: this.tecnico.id,
      codigo: l.codigo,
      cantidad: d ? d.cantidad : 0
    };
    this.Elementos.push(this.item);
    this.elemento = elemento;
  }

  submit() {
    if (this.tecnico.nombre && this.tecnico.codigo && this.tecnico.sueldo > 0 && this.sucursal.id && this.listaElementosasig.length > 0) {
      this.cargando = true;
      this.tecnico.tecelement = [];
      this.tecnico.tecsucu = [];
      if (!this.tecnico.id) {
        this.tecnicosService.add(this.tecnico).subscribe(res => {
          this.tecnico = res;
          var tecsucu: Tecsucu = { tecnico: this.tecnico.id, sucursal: this.sucursal.id };
          this.restdata(tecsucu);
        }, err => {
          this.cargando = false;
          this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al crear Tecnico.' });
        });
      }
      else {
        this.tecnicosService.update(this.tecnico).subscribe(res => {
          this.tecnico = res;
          var tecsucu: Tecsucu = { tecnico: this.tecnico.id, sucursal: this.sucursal.id };
          this.restdata(tecsucu);
        }, err => {
          this.cargando = false;
          this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al editar Tecnico.' });
        });
      }
    }
    else {
      this.navServicio.setMesage(4, { severity: 'warning', summary: 'Faltan Datos', detail: 'Por favor termine de diligencia para crear el tecnicor la informacion.' });
    }
  }

  restdata(tecsucu) {
    if (this.tecnico.tecsucu && this.tecnico.tecsucu[0].sucursal != this.sucursal.id) {
      this.tecsucuService.add(tecsucu).subscribe(restec1 => {
        var count = 0;
        if (this.listaElementosedit.length >= 1) {
          for (var le of this.listaElementosedit) {
            if (le.id) {
              this.tecelementService.add(le).subscribe(restelc1 => {
                var daten = this.listaElementoscompleta.find(l => l.id == restelc1.element);
                daten.cantidad = daten.cantidad - restelc1.cantidad;
                this.elementosService.update(daten).subscribe(end => {
                  count = count + 1;
                  if (count == this.listaElementosedit.length) {
                    this.navServicio.setMesage(1);
                    this.clear();
                    this.cargando = false;
                    setTimeout(() => {
                      this.back();
                    }, 2000);
                  }
                }, err => {
                  this.cargando = false;
                  this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al Editar los Elementos.' });
                })
              }, err => {
                this.cargando = false;
                this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al Agregar Elementos al tecnico.' });
              });
            }
            else {
              this.tecelementService.update(le).subscribe(restelc2 => {
                var daten = this.listaElementoscompleta.find(l => l.id == restelc2.element);
                daten.cantidad = daten.cantidad - restelc2.cantidad;
                this.elementosService.update(daten).subscribe(end => {
                  count = count + 1;
                  if (count == this.listaElementosedit.length) {
                    this.navServicio.setMesage(1);
                    this.clear();
                    this.cargando = false;
                    setTimeout(() => {
                      this.back();
                    }, 2000);
                  }
                }, err => {
                  this.cargando = false;
                  this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al Editar los Elementos.' });
                });
              }, err => {
                this.cargando = false;
                this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al Editar Elementos al tecnico.' });
              });
            }
          }
        }
        else {
          this.clear();
          this.cargando = false;
          setTimeout(() => {
            this.back();
          }, 2000);
        }
      }, err => {
        this.cargando = false;
        this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al crear Tecnico.' });
      });
    }
    else {
      var count = 0;
      if (this.listaElementosedit.length >= 1) {
        for (var le of this.listaElementosedit) {
          if (le.id) {
            this.tecelementService.add(le).subscribe(restelc1 => {
              var daten = this.listaElementoscompleta.find(l => l.id == restelc1.element);
              daten.cantidad = daten.cantidad - restelc1.cantidad;
              this.elementosService.update(daten).subscribe(end => {
                count = count + 1;
                if (count == this.listaElementosedit.length) {
                  this.navServicio.setMesage(1);
                  this.clear();
                  this.cargando = false;
                  setTimeout(() => {
                    this.back();
                  }, 2000);
                }
              }, err => {
                this.cargando = false;
                this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al Editar los Elementos.' });
              })
            }, err => {
              this.cargando = false;
              this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al Agregar Elementos al tecnico.' });
            });
          }
          else {
            this.tecelementService.update(le).subscribe(restelc2 => {
              var daten = this.listaElementoscompleta.find(l => l.id == restelc2.element);
              daten.cantidad = daten.cantidad - restelc2.cantidad;
              this.elementosService.update(daten).subscribe(end => {
                count = count + 1;
                if (count == this.listaElementosedit.length) {
                  this.navServicio.setMesage(1);
                  this.clear();
                  this.cargando = false;
                  setTimeout(() => {
                    this.back();
                  }, 2000);
                }
              }, err => {
                this.cargando = false;
                this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al Editar los Elementos.' });
              });
            }, err => {
              this.cargando = false;
              this.navServicio.setMesage(4, { severity: 'warning', summary: 'Error', detail: 'Falla al Editar Elementos al tecnico.' });
            });
          }
        }
      }
      else {
        this.clear();
        this.cargando = false;
        setTimeout(() => {
          this.back();
        }, 2000);
      }
    }
  }
}
