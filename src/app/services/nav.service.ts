import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Subject } from 'rxjs/index';
import { Generico } from '../interfaces/generico';
import * as jQuery from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class NavService {

   /**
    * Indica si está cargando el servicio de funcionalidades
    * @type {boolean}
    */
   static loadFunctionalities: boolean;
   /**
    * Tab específico que se quiera seleccionar al regresar a una pantalla
    * @type {any}
    */
   _navTab: any;
   /**
    * Accordion específico que se quiera seleccionar al regresar a una pantalla
    * @type {any}
    */
   _navAccordion: any;
   /**
    * Mensaje por defecto(Información)
    * @type {Message}
    */
   msgs: Message = { severity: 'info', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' };
   /**
    * Mensaje por defecto(Adición)
    * @type {Message}
    */
   msgAdd: Message = { severity: 'success', summary: 'Exitoso', detail: 'Registro agregado correctamente.' };
   /**
    * Mensaje por defecto(Actualización)
    * @type {Message}
    */
   msgUpdate: Message = { severity: 'success', summary: 'Exitoso', detail: 'Registro actualizado correctamente.' };
   /**
    * Mensaje por defecto(Error)
    * @type {Message}
    */
   msgError: Message = { severity: 'error', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' };
   /**
    * Observable para los mensajes
    * @type {Subject<Message>}
    */
   subject = new Subject<Message>();
   /**
    * Observable para el avatar
    * @type {Subject<string>}
    */
   avatar = new Subject<string>();
   /**
    * Busqueda para ciertas tablas
    * @type {any[]}
    */
   arraySearch: any[] = [ { id: '', strSearch: '' } ];
   /**
    * Nombre y datos de usuario del usuario logueado
    * @type { any}
    */
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   /**
    * Observable string streams
    */
   getMessage$ = this.subject.asObservable();
   /**
    * Observable avatar
    */
   getAvatar$ = this.avatar.asObservable();
   /**
    * Bandera para forma de pago
    * @type {[{id: string; strFlag: string}]}
    */
   arrayFlag: any[] = [ { id: '', boolFlag: Boolean } ];
   /**
    * Bandera para filtos
    * @type {[{ id: '', filters: [ { filter: '', value: '' } ] }]}
    */
   arrayFilter: any[] = [ { id: '', filters: [ { filter: '', value: '' } ] } ];

   /**
    * Construye la instancia
    */
   constructor() {
      this.arraySearch = [];
   }

   /**
    * asignar mensaje para notificar al usuario
    * @param {number} type
    * @param {Message} msgCustom
    * @param {boolean} hide
    */
   setMesage( type: number, msgCustom: Message = null, hide = true ) {
      switch ( type ) {
         case 1:
            this.msgs = this.msgAdd;
            break;
         case 2:
            this.msgs = this.msgUpdate;
            break;
         case 3:
            this.msgs = this.msgError;
            break;
         default:
            this.msgs = msgCustom;
            break;
      }
      jQuery( '#msgNotificacion' ).hide();
      this.subject.next( this.msgs );
      jQuery( '#msgNotificacion' ).slideDown( 400 );
      if ( hide ) {
         setTimeout( () => {
            jQuery( '#msgNotificacion' ).slideUp( 200 );
         }, 5000 );
      }
   }

   /**
    * Recibe y guarda el número de Tab
    * @param {any} numero
    */
   setTab( numero: any ) {
      this._navTab = numero;
   }

   /**
    * Recibe la búsqueda
    * @param {string} id
    * @param {string} strSearch
    */
   setSearch( id: string, strSearch: string ) {
      if ( this.arraySearch.find( c => c.id === id ) ) {
         this.arraySearch.find( c => c.id === id ).strSearch = strSearch;
      } else {
         this.arraySearch.push( { id: id, strSearch: strSearch } );
      }
   }

   /**
    * Recibe la bandera de forma de pago
    * @param {string} id
    * @param {boolean} boolFlag
    */
   setFlag( id: string, boolFlag: boolean ) {
      if ( this.arrayFlag.find( c => c.id === id ) ) {
         this.arrayFlag.find( c => c.id === id ).boolFlag = boolFlag;
      } else {
         this.arrayFlag.push( { id: id, boolFlag: boolFlag } );
      }
   }

   /**
    * Recibe los filtros
    * @param {string} id
    * @param {string} filter
    * @param {any} value
    */
   setFilters( id: string, filter: string, value: any ) {
      const data = this.arrayFilter.find( x => x.id === id );
      if ( data ) {
         const filtro = data.filters.find( y => y.filter === filter );
         if ( filtro ) {
            filtro.value = value;
         } else {
            data.filters.push( { filter: filter, value: value } );
         }
      } else {
         // const filtro2 = { filter: filter, value: value };
         this.arrayFilter.push( { id: id, filters: [ { filter: filter, value: value } ] } );
      }
      const d = this.arrayFilter;
   }

   /**
    * Recibe el estado de carga del servicio de funcionalidades
    * @param {boolean} load
    */
   setLoadFunctionalities( load: boolean ) {
      NavService.loadFunctionalities = load;
   }

   /**
    * Retorna el Tab
    * @returns {any}
    */
   getTab() {
      return this._navTab;
   }

   /**
    * Retorna la búsqueda
    * @param {string }id
    * @returns {string}
    */
   getSearch( id: string ) {
      if ( this.arraySearch.find( c => c.id === id ) ) {
         return this.arraySearch.find( c => c.id === id ).strSearch;
      } else {
         return '';
      }
   }

   /**
    * Retorna la bandera
    * @param id
    * @returns {string}
    */
   getFlat( id: string ) {
      if ( this.arrayFlag.find( c => c.id === id ) ) {
         return this.arrayFlag.find( c => c.id === id ).boolFlag;
      } else {
         return null;
      }
   }

   /**
    * Retorna un filtro en específico
    * @param {string} id
    * @param {string} filter
    * @returns {any}
    */
   getFilter( id: string, filter: string ): any {
      const data = this.arrayFilter.find( x => x.id === id );
      if ( data ) {
         const temp = data.filters.find( s => s.filter === filter );
         if ( temp ) {
            return temp.value;
         } else {
            return null;
         }
      } else {
         return null;
      }
   }

   /**
    * Retorna todos los filtros
    * @param {string} id
    * @param {string} filter
    * @returns {Any}
    */
   getFilters( id: string ): any {
      const data = this.arrayFilter.find( x => x.id === id );
      if ( data ) {
         return data.filters;
      } else {
         return null;
      }
   }

   /**
    * Retorna el estado de cargue del servicio de funcionalidades
    * @returns {boolean}
    */
   getLoadFuncionalities() {
      return NavService.loadFunctionalities;
   }

   /**
    * Limpia el arreglo de búsqueda
    */
   resetSearch() {
      this.arraySearch = [];
   }

   /**
    * Limpia la bandera
    */
   resetFlag() {
      this.arrayFlag = [];
   }

   /**
    * Limpia el filtro
    */
   resetFilter() {
      this.arrayFilter = [];
   }

   /**
    * Asigna el avatar.
    * @param {string} avatar
    */
   setAvatar( avatar: string ) {
      this.avatar.next( avatar );
   }

   /**
    * Asigna el accordiaon
    * @param {any} accordion
    */
   setAccordion( accordion: any ) {
      this._navAccordion = accordion;
   }

   /**
    * Retorna el accordeon
    * @returns {any}
    */
   getAccordion() {
      return this._navAccordion;
   }

   /**
    * Directorio de mensajes
    * @type {Array}
    */
   static dirMensajes: Generico[] = [];

   buscarMensaje( id: string ) {
      const buscado = NavService.dirMensajes.find( x => x.identificador === id );
      if ( buscado ) {
         return buscado.valor;
      } else {
         return id;
      }
   }

}

