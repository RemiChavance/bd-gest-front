import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Bd } from 'src/app/models/bd.model';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionService } from 'src/app/services/collection.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {

  collection$!: Observable<Bd[]>;
  
  link: string = environment.frontURL;
  code!: string;
  showModal: boolean = false;

  constructor(
    private collectionService: CollectionService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.collection$ = this.collectionService.collection$;
    this.collectionService.getMyCollection(this.auth.getUserValue()!.id);
    
    this.code = this.getSharedCode();
    this.link=`${environment.frontURL}/shared-collection/${this.code}`
  }

  private getSharedCode(): string {
    const id = this.auth.getUserValue()!.id;
    return id.toString();
  }

  onShowModal() {
    this.showModal = !this.showModal;
  }

  onClickOnSharedLink() {
    this.router.navigateByUrl(`/shared-collection/${this.code}`);
  }
}
