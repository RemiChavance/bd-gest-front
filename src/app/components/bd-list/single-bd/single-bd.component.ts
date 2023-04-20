import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Bd } from 'src/app/models/bd.model';

@Component({
  selector: 'app-single-bd',
  templateUrl: './single-bd.component.html',
  styleUrls: ['./single-bd.component.scss']
})
export class SingleBdComponent {

  @Input() bd!: Bd;

  constructor(private router: Router) { }

  onClick() {
    this.router.navigateByUrl(`bd/${this.bd.isbn}`);
  }
}
