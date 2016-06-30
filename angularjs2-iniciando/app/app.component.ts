import { Component } from '@angular/core';

var TASKS:Task[] = [
    {id:1,name:'Task 1'},
    {id:2,name:'Task 2'},
    {id:3,name:'Task 3'},
    {id:4,name:'Task 4'},
    {id:5,name:'Task 5'},
    {id:6,name:'Task 6'},
    {id:7,name:'Task 7'}
];

export class Task{
    id:number;
    name:string;
}

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title.name}}</h1>
        <input type="text" [(ngModel)]="title.name"/>
        <p>{{ title.description }}</p>

        <ul>
            <li *ngFor="let t of tasks" (click)="onClick(t)">{{t.id}} - {{t.name}}</li>
        </ul>
        <div *ngIf="selectedTask">
            <input type="text" [(ngModel)]="selectedTask.name"/>
        </div>

    `
})
export class AppComponent {
    title = {
        name:"Hello World",
        description:"Description Hello World!!"
    };
    tasks:Task[] = TASKS;
    selectedTask:Task;

    onClick(task){
        this.selectedTask = task;
    }
}