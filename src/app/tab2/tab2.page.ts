import { Component } from '@angular/core';
import { TodoItem } from '../models/todoItem';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private todoService: TodoService) {}

  addItemClicked(): void {
    if (!this.title || this.title.length == 0) {
      this.message = "Field 'Title' is required";
      return;
    }else{
      this.message = undefined;
    }

    const item: TodoItem = {
      id: "",
      timestamp: (new Date()).toLocaleString(),
      title: this.title,
      description: this.description
    }

    this.title = "";
    this.description = "";

    this.todoService.addItem(item);

    this.message = "The item has been added"
  }

  title: string;
  description: string;
  message: string = "";
}
