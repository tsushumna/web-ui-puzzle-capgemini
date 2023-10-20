import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, markAsFinished, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from 'libs/shared/models/src/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
  onMarkAsFinished(item : ReadingListItem){
    this.store.dispatch(markAsFinished({item}));
  }
  returnDate(isoString :string){
    return new Date(isoString);
  }

}
