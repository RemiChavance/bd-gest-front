import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bd } from 'src/app/models/bd.model';
import { AuthService } from 'src/app/services/auth.service';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-single-bd-collection',
  templateUrl: './single-bd-collection.component.html',
  styleUrls: ['./single-bd-collection.component.scss']
})
export class SingleBdCollectionComponent implements OnInit {
  
  @Input() bd!: Bd;
  showShareModal: boolean = false;
  showReturnModal: boolean = false;

  shared: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private bdService: BdService
  ) { }


  ngOnInit(): void {
    this.shared = this.bd.isShared!;
  }  

  onClick() {
    this.router.navigateByUrl(`bd/${this.bd.isbn}`);
  }

  onShowShareModal() {
    this.showShareModal = !this.showShareModal;
  }

  onShowReturnModal() {
    this.showReturnModal = !this.showReturnModal;
  }

  onMarkAsShared() {
    const userId = this.authService.getUserValue()!.id;
    const isbn = this.bd.isbn;
    this.bdService.markedAsShared(isbn, userId);
    this.onShowShareModal();
    this.shared = true;
  }

  onMarkAsReturned() {
    const userId = this.authService.getUserValue()!.id;
    const isbn = this.bd.isbn;
    this.bdService.markedAsReturned(isbn, userId);
    this.onShowReturnModal();
    this.shared = false;
  }
}
