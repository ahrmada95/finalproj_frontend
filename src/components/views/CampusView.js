/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, Box, Button, CardHeader, CardMedia, Divider, FormLabel, Input, List, ListItem, makeStyles, Select, Typography } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import { useState } from "react";
// Take in props data to construct the component
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexDirection: "column",
  },
  header: {
    margin: 'auto',
    display: 'flex',
    flexGrow: 1,
    color: '#4499ff'
  },
  h1: {
    flexGrow: 1,
    fontType: 'bold',
    fontFamily: 'sans-serif', 
    fontSize: '48px', 
  },
  h2: {
    fontType: 'bold',
    fontSize: '36px', 
  },
  h3: {
    fontSize: '28px'
  },
  cards: {
    marginBottom: '20px',
    backgroundColor: '#eef',
    width: '60%',
    margin: 'auto'
  },
  avatar: {
    height: '80px',
    width: '80px'
  },
  lists:{
    listStyle: 'none',
  },
  links:{
    textDecoration: 'none',
  },
  buttons:{
    margin: '10px',
  },
  warningButton: {
    backgroundColor: '#dd2222',
    color: 'white'
  }
}))
  const CampusView = (props) => {
  const {campus, testCampus, handleChange, handleSubmit, handleDelete} = props;
  const [editMode, setEditMode] = useState(false);
  const classes = useStyles();

  console.log(testCampus);

  // Render a single Campus view with list of its students
  return (
    <>
    <Card className={classes.cards} key={campus.id}>
    <CardHeader
        avatar= {
        <Avatar className={classes.avatar}>
          <CardMedia
            component="img"
            height="80px"
            image={campus.imageurl}
            alt={campus.name}
          />
        </Avatar>
        }
        title={
          <Typography className={[classes.header, classes.h2]} variant="h2">{campus.name}</Typography>
        }
        className={classes.header}
      />
      <CardContent>
        {
          !editMode ? 
          (
            <>
              <Typography variant="h4">{campus.address}</Typography>
              <Typography variant="body1">{campus.description}</Typography>
              <Button className={classes.buttons} variant="contained" color="primary" onClick={() => setEditMode(true)}>Edit Campus</Button>
              <Button className={[classes.buttons, classes.warningButton]} variant="contained" color="error" onClick={() => handleDelete()}>Delete Campus</Button>
              
              <Divider />
              <Typography variant="h2">Enrolled Students</Typography>
              <br/>
              <div>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                !campus.students.length ? (
                  <div>
                    <Typography variant="body1">There are no students currently enrolled at this school.</Typography>
                  </div>
                ) : (
                  <List className={classes.lists}>
                    {campus.students.map( student => {
                      let name = student.firstname + " " + student.lastname;
                      return (
                        <ListItem key={student.id}>
                          <Link className={classes.links} to={`/student/${student.id}`}>
                            <ListItemButton><h3>{name}</h3></ListItemButton>
                          </Link>             
                        </ListItem>
                      );
                    })}
                  </List>
                  )}
                </Box>
              </div>
            </>
          ) : (
            <div className={classes.formContainer}>
            <div className={classes.formTitle}>
              <Typography style={{fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '20px'}}>
                Edit Campus
              </Typography>
            </div>
            <form style={{textAlign: 'center'}} onSubmit={(e) => {
                handleSubmit(e);
                setEditMode(false);
            }}>
              <FormLabel style={{fontWeight: 'bold'}}>Name: </FormLabel>
              <Input className={classes.formInput} type="text" name="name" defaultValue={campus.name} onChange ={(e) => handleChange(e)}/>
              <br/>
              <FormLabel style={{fontWeight: 'bold'}}>Address: </FormLabel>
              <Input className={classes.formInput} type="text" name="address" defaultValue={campus.address} onChange ={(e) => handleChange(e)}/>
              <br/>
              <FormLabel style={{fontWeight: 'bold'}}>Description: </FormLabel>
              <Input className={classes.formInput} type="text" name="description" defaultValue={campus.description} onChange ={(e) => handleChange(e)}/>
              <br/>
              <FormLabel style={{fontWeight: 'bold'}}>Image URL: </FormLabel>
              <Input className={classes.formInput} type="text" name="imageurl" onChange={(e) => handleChange(e)} />
              <br/>
              <Button className={classes.buttons} variant="contained" color="primary" type="submit">Submit</Button>
              <Button className={classes.buttons} variant="contained" color="primary" onClick={() => setEditMode(false)}>Cancel</Button>
            </form>
          </div>
          )
        }
      </CardContent>
    </Card>
    </>
  );
};

export default CampusView;