import React, { useState } from "react";
import PropTypes from "prop-types";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import {
  deleteTask,
  getTasks,
  updateTaskContent,
  updateTaskStatus,
} from "../near-api";

const TaskItem = ({
  id,
  content,
  is_completed,
  tasks,
  setTasks,
  setOpenLoader,
}) => {
  const [shouldUpdateTask, setShouldUpdateTask] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState(() => {
    if (content) return content;
    return "";
  });

  const handleCheckTask = (id) => {
    setOpenLoader(true);
    let selectedTask = tasks.filter((o) => o.id === id)[0];
    updateTaskStatus(selectedTask.id, !selectedTask.is_completed).then(() => {
      getTasks()
        .then((res) => setTasks(res))
        .finally(() => {
          setOpenLoader(false);
        });
    });
  };

  const handleDeleteTask = (id) => {
    setOpenLoader(true);
    let selectedTask = tasks.filter((o) => o.id === id)[0];
    deleteTask(selectedTask.id).then(() => {
      getTasks()
        .then((res) => setTasks(res))
        .finally(() => {
          setOpenLoader(false);
        });
    });
  };

  const handleUpdateTask = (e) => {
    if (e.key === "Enter") {
      setOpenLoader(true);
      let selectedTask = tasks.filter((o) => o.id === id)[0];

      updateTaskContent(selectedTask.id, newTaskValue).then(() => {
        getTasks()
          .then((res) => setTasks(res))
          .finally(() => {
            setOpenLoader(false);
            setShouldUpdateTask(false);
          });
      });
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => setShouldUpdateTask(!shouldUpdateTask)}
          >
            <EditIcon color="info" />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => handleDeleteTask(id)}
          >
            <DeleteForeverIcon color="error" />
          </IconButton>
        </Stack>
      }
    >
      <ListItemIcon>
        <Checkbox checked={is_completed} onChange={() => handleCheckTask(id)} />
      </ListItemIcon>
      <ListItemText
        id={id}
        primary={
          shouldUpdateTask ? (
            <TextField
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              onKeyDown={handleUpdateTask}
              autoFocus
            />
          ) : (
            content
          )
        }
        sx={{
          textDecoration: is_completed ? "line-through" : null,
          color: is_completed ? "#999" : null,
        }}
      />
    </ListItem>
  );
};

TaskItem.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
  is_completed: PropTypes.bool,
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  setOpenLoader: PropTypes.func,
};

export default TaskItem;
