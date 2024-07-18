import { Task } from "domain/entities/Task"

test("should create task entitie", () => {
  const task = Task.create({
    title: "any title",
    start: "any start",
    end: "any end",
    date: "2023-01-01",
    important: "important",
    description: "any description",
    icon: "any icon",
    userId: "any user id",
  })
  
  expect(task.getId()).toBeDefined()
  expect(task.getTitle()).toBe("any title")
  expect(task.getStart()).toBe("any start")
  expect(task.getEnd()).toBe("any end")
  expect(task.getDate()).toBe("2023-01-01")
  expect(task.getImportant()).toBe("important")
  expect(task.getDescription()).toBe("any description")
  expect(task.getIcon()).toBe("any icon")

  
})