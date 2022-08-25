import React from "react";

import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

import { updateTaskStatus, deleteTask, getTasks } from "../near-api";

const Tasks = ({ tasks, setTasks, setOpenLoader }) => {
  return (
    tasks &&
    tasks.length > 0 &&
    tasks.map((task) => {
      return (
        <TaskItem
          key={task.id}
          {...task}
          tasks={tasks}
          setTasks={setTasks}
          setOpenLoader={setOpenLoader}
        />
      );
    })
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  setOpenLoader: PropTypes.func,
};

export default React.memo(Tasks);
