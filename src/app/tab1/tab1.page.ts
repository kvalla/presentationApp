import { Component } from '@angular/core';
import { TodoItem } from '../models/todoItem';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private todoService: TodoService) {
    this.data = this.todoService.getList();
    this.results = JSON.parse(JSON.stringify(this.data));
  }

  handleChange(event: any): void {
    const query = event.target.value.toLowerCase();

    console.log(this.data)

    if (query.length == 0 || this.data.length == 0) {
      this.results = this.todoService.getList();
    }else{
      this.results = this.data.filter(d => d.title.toLowerCase().indexOf(query) > -1);
    }
  }

  deleteItem(id: string): void {
    this.todoService.deleteItem(id);
    this.results = this.todoService.getList();
  }

  results: TodoItem[];
  data: TodoItem[];
}
