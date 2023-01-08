import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly todoListKey: string = "todo-list"
  private readonly counterKey: string = "counter"

  constructor() { 
    this.initData();
  }

  getList(): TodoItem[]{
    return this.data;
  }

  addItem(item: TodoItem): void {
    item.id = this.counter + "-item";
    this.data.push(item);
    this.counter = this.counter + 1;

    this.saveData();
  }

  deleteItem(id: string): void {
    const item = this.data.find(d => d.id == id);

    if (item) {
      const index = this.data.indexOf(item);
      this.data.splice(index, 1);
    }

    this.saveData();
  }

  private initData(): void {
    const dataStorage = localStorage.getItem(this.todoListKey);

    if (dataStorage) {
      this.data = JSON.parse(dataStorage);
    }else{
      this.data = [];
    }

    const counterStorage = localStorage.getItem(this.counterKey);

    if (counterStorage) {
      this.counter = +localStorage.getItem(this.counterKey);
    }else{
      this.counter = 0;
    }
  }

  private saveData(): void {
    const dataStorage = JSON.stringify(this.data);

    localStorage.setItem(this.todoListKey, dataStorage);
    localStorage.setItem(this.counterKey, this.counter.toString());
  }

  private data: TodoItem[];
  private counter: number;
}
