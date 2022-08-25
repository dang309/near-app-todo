import React, { useState } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import { addTask, getTasks } from "../near-api";

const FormInput = ({ setTasks, setOpenLoader }) => {
  const [taskValue, setTaskValue] = useState("");

  const handleAddTask = (e) => {
    if (!taskValue) return;

    if (e.key === "Enter") {
      setOpenLoader(true);
      addTask(taskValue).then(() => {
        getTasks()
          .then((res) => setTasks(res))
          .finally(() => {
            setOpenLoader(false);
            setTaskValue("");
          });
      });
    }
  };

  return (
    <TextField
      variant="outlined"
      value={taskValue}
      onChange={(e) => setTaskValue(e.target.value)}
      onKeyDown={handleAddTask}
      sx={{ minWidth: "512px" }}
    />
  );
};

FormInput.propTypes = {
  setTasks: PropTypes.func,
  setOpenLoader: PropTypes.func,
};

export default FormInput;
