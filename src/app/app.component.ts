import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TaskDialogResult } from './components/task-dialog/dialog-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  tasks: Task[] = [
    {
      title: 'Ir ao mercado',
      description: 'Comprar ovos, leite e frutas',
    },
    {
      title: 'Estudar Firebase',
      description: 'Ler a documentação em https://firebase.google.com/docs',
    },
    {
      title: 'Trabalhar',
      description: 'Não dá pra viver só de brisa',
    },
    {
      title: 'Participar da Oficina de Firestore',
      description: 'Aprender a desenvolver um CRUD com Angular + Firestore',
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  addNewTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result && result.task) {
        this.tasks.push(result.task);
      }
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        task: task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result) {
        const indexOf = this.tasks.indexOf(task);
        if (result?.deleted) {
          this.tasks.splice(indexOf, 1);
        }
        if (result?.task) {
          this.tasks.splice(indexOf, 1, result.task);
        }
      }
    });
  }
}
