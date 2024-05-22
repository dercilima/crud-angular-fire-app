import { Task } from "../../task.model";

export interface TaskDialogData {
  task: Task
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task?: Task;
  deleted?: boolean;
}
