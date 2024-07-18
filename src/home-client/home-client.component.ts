import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css',
})

export class HomeClientComponent {
  constructor(
    private router: Router      
  ) {}
  @Input() selected: boolean = false; // Indica se o botão está selecionado
  @Output() selectedChange = new EventEmitter<boolean>(); // Evento emitido quando o estado de seleção muda

  onClick() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
  navigateToAbout(){
    this.router.navigate(['/registerTask']);
  }
}
