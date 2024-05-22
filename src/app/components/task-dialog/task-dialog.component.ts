import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from './../../task.model';
import { Component, Inject, OnInit } from '@angular/core';
import { TaskDialogData } from './dialog-data.model';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css',
})
export class TaskDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {
  }

  ngOnInit(): void {
    if (this.data?.task) {
      this.form.patchValue(this.data.task);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close({
        task: this.form.value as Task
      })
    }
  }
}
