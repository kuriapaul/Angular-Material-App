import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataSource} from '@angular/cdk/table';

import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(public auth: AuthService, public dialog: MatDialog, private dataService: DataService)  {
  }

  displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  dataSource = new PostDataSource(this.dataService);

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

deletePost(id) {
  if (this.auth.isAuthenticated()) {
    this.dataService.deletePost(id);
    this.dataSource = new PostDataSource(this.dataService);
  } else {
    alert('Login in Before');
  }
}
}
export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
}
