import { Component, OnInit, inject } from '@angular/core';
import { Task } from './task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TaskDialogResult } from './components/task-dialog/dialog-data.model';
import { CollectionReference, Firestore, addDoc, deleteDoc, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  taskCollection: CollectionReference;
  tasks: Task[] = [];

  constructor(private dialog: MatDialog) {
    this.taskCollection = collection(this.firestore, 'tasks');
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    getDocs(this.taskCollection).then((value) => {
      this.tasks = value.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Task;
      });
    });
  }

  addNewTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result && result.task) {
        // this.tasks.push(result.task);
        addDoc(this.taskCollection, {
          title: result.task.title,
          description: result.task.description
        }).then(() => this.loadTasks());
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
          // this.tasks.splice(indexOf, 1);
          deleteDoc(doc(this.taskCollection, task.id)).then(() => this.loadTasks());
        }
        if (result?.task) {
          //this.tasks.splice(indexOf, 1, result.task);
          setDoc(doc(this.taskCollection, task.id), result.task).then(() => this.loadTasks())
        }
      }
    });
  }
}
