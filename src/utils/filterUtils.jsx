export const filterTasks = (tasks, filter) => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.taskstatus.toLowerCase() === filter);
  };
  