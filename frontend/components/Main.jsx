import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import FormInput from "./FormInput";
import Tasks from "./Tasks";

import { getTasks } from "../near-api";

const Main = ({ setOpenLoader }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setOpenLoader(true);
    getTasks()
      .then((res) => setTasks(res))
      .catch((err) => console.error(err))
      .finally(() => {
        setOpenLoader(false);
      });
  }, []);

  console.log({ tasks });

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <h1>To Do List</h1>
      <span>
        Press <kbd>Enter</kbd> to add/update task.
      </span>
      <FormInput setTasks={setTasks} setOpenLoader={setOpenLoader} />
      <Tasks tasks={tasks} setTasks={setTasks} setOpenLoader={setOpenLoader} />
    </Stack>
  );
};

Main.propTypes = {
  setOpenLoader: PropTypes.func,
};

export default Main;
