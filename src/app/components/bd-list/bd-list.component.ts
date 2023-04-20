import { Component, Input } from '@angular/core';
import { Bd } from 'src/app/models/bd.model';

@Component({
  selector: 'app-bd-list',
  templateUrl: './bd-list.component.html',
  styleUrls: ['./bd-list.component.scss']
})
export class BdListComponent {
  @Input() bds!: Bd[];
  @Input() isCollection: boolean = false;
}
