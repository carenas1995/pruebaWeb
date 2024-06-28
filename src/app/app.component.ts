import { AfterViewInit, Component } from '@angular/core';
import { NavService } from './services/nav.service';
import { SelectItem, Message, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NavService],
})
export class AppComponent implements AfterViewInit {
  title = 'prueba';

  msgs: Message[] = [];

  constructor(private navService: NavService) {
    navService.getMessage$.subscribe(
      msgs => {
        this.msgs = [];
        this.msgs.push(msgs);
      });
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
}
