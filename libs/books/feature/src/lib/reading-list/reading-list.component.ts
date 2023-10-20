import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,
    private snackBar : MatSnackBar) {}

  removeFromReadingList(item:ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    let snackbarRef =  this.snackBar.open("Removed from Reading List" , "Undo" ,{
      duration : 3000
    });
    snackbarRef.onAction().subscribe(res => {
      let book : Book = {
        id: item.bookId,
        title: item.title,
        authors: item.authors,
        description: item.description,
        publisher : item.publisher,
        coverUrl : item.coverUrl
      };
      this.store.dispatch(addToReadingList({ book })); 
      snackbarRef.dismiss();
    });
  }
}
