import { Id } from "domain/valueObject/Identifier";
import { IdentifierUUID } from "infra/security/IdentifierUUID";

export namespace Task {
  export type TaskImportance = "important" | "veryImportant" | "normal";
  export type Props = {
    id: Id
    title: string
    start: string
    end: string
    date: string
    important: TaskImportance
    description: string
    icon: string
    userId: string
  }

  export type CreateTaskProps = {
    title: string
    start: string
    end: string
    date: string
    important: TaskImportance
    description: string
    icon?: string
    userId: string
  }
}

export class Task {
  private id: Id;
  private title: string
  private start: string
  private end: string
  private date: string
  private important: Task.TaskImportance
  private description: string
  private icon?: string
  private userId: string

  constructor(
    props: Task.Props
  ){
    this.id = props.id
    this.title = props.title
    this.start = props.start
    this.end = props.end
    this.date = props.date
    this.important = props.important
    this.description = props.description
    this.icon = props.icon
    this.userId = props.userId
  }

  static create(
    props: Task.CreateTaskProps
  ){
    return new Task({
      id: new Id(new IdentifierUUID()),
      title: props.title,
      start: props.start,
      end: props.end,
      date: props.date,
      important: props.important,
      description: props.description,
      icon: props.icon,
      userId: props.userId
    })
  }

  getId(): string {
    return this.id.getId()
  }

  getTitle(): string {
    return this.title
  }

  getStart(): string {
    return this.start
  }

  getEnd(): string {
    return this.end
  }

  getDate(): string {    
    return this.date
  }

  getImportant(): Task.TaskImportance {
    return this.important
  }

  getDescription(): string {
    return this.description
  }

  getIcon(): string | undefined {
    return this.icon
  }

  getUserId(): string {
    return this.userId
  }
}


