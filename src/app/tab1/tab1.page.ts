import { Component } from '@angular/core';
import { TodoItem } from '../models/todoItem';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private todoService: TodoService) { }

  ionViewDidEnter() {
    this.searchedTitle = undefined;
    this.data = this.todoService.getList();
    this.results = JSON.parse(JSON.stringify(this.data));
  }

  handleChange(event: any): void {
    const title = event.target.value.toLowerCase();
    this.results = this.todoService.getListByTitle(title);
  }

  deleteItem(id: string): void {
    this.todoService.deleteItem(id);
    this.results = this.todoService.getListByTitle(this.searchedTitle);
  }

  searchedTitle: string;
  results: TodoItem[];
  data: TodoItem[];
}
