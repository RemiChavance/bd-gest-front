import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Bd } from 'src/app/models/bd.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-shared-collection',
  templateUrl: './shared-collection.component.html',
  styleUrls: ['./shared-collection.component.scss']
})
export class SharedCollectionComponent {

  collection$!: Observable<Bd[]>;

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.collection$ = this.collectionService.collection$;

    this.route.params.pipe(
      tap(params => {
        this.collectionService.getSharedCollection(params['id']);
      })
    ).subscribe();
  }

}
