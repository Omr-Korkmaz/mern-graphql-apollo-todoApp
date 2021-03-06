import { useMutation } from "@apollo/client";
import moment from "moment";
import { DELETE_TODO, UPDATE_TODO } from "../graphql/Mutation";

import GET_TODOS from "../graphql/Queries";
import styles from "./TodoCard.module.css";
import DeleteIcon from '@mui/icons-material/Delete';





import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const TodoCard = ({ title, id, detail, date, complete }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [deleteTodo] = useMutation(DELETE_TODO);
  const removeTodo = (id) => {
    deleteTodo({
      variables: {
        id: id,
      },
      refetchQueries: [
        {
          query: GET_TODOS,
        },
      ],
    });
  };

  const [updateTodo] = useMutation(UPDATE_TODO);
  const update = (id) => {
    updateTodo({
      variables: {
        id: id,
        complete: !complete,
      },
      refetchQueries: [
        {
          query: GET_TODOS,
        },
      ],
    });
  };

  return (


    <Card sx={{ maxWidth: 345 }}
       onClick={() => update(id)}
       className={`${styles.container}  ${
         complete === true
           ? styles.container_completed
           : styles.container_uncompleted
       }`}>
      <CardActionArea>
    
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="h6" >
          {detail}
          </Typography>

          <Typography variant="body2" >
          Created ({moment(date).format("MMMM DD YY")})
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      
        <DeleteIcon  sx={{ "&:hover": {  color: "red" } }}   size="large" color="primary"   onClick={() => removeTodo(id)}/>
    
      </CardActions>
    </Card>


  );
};

export default TodoCard;
