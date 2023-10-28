import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';

  constructor(private crudService : CrudService){

  }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe(
      (res: Task[]) => { // This is where you expect the response to be an array of Task objects
        this.taskArr = res;
      },
      (err) => {
        alert(err);
      }
    );
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    } , err => {
      alert(err);
    })
  }

  updateTask(){
    this.crudService.updateTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    } , err => {
      alert("Failed to update task");
    })
  }

  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    } , err => {
      alert("Failed to delete task.")
    })
  }


}
