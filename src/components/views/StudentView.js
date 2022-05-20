import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, makeStyles, Typography, Input, Select, MenuItem, FormLabel } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";

/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
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
  links: {
    textDecoration: 'none',
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
  button: {
    margin: '10px'
  },
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  formTitle:{
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
  formInput: {
    margin: '10px',
    width: 'auto',
  },
  warningButton: {
    backgroundColor: '#dd2222',
    color: 'white'
  }
}));

const StudentView = (props) => {
  const { student, allCampuses, handleChange, handleSubmit, handleDelete } = props;
  const [editMode, setEditMode] = useState(false);
  const classes = useStyles();
  const name = student.firstname + " " + student.lastname;

  // Render a single Student view 
  return (
      <Card className={classes.cards} key={student.id}>
      <CardHeader
        avatar= {
        <Avatar className={classes.avatar}>
          <CardMedia
            component="img"
            height="80px"
            image={student.imageurl}
            alt={name}
          />
        </Avatar>
        }
        title={
          <Typography className={[classes.header, classes.h2]} variant="h2">{name}</Typography>
        }
        className={classes.header}
      />
    <CardContent>
      {
      !editMode ? (
          <>
            <Typography className={classes.h3} variant="h3"><b>Email:</b> {student.email}</Typography>
            <Typography className={classes.h3} variant="h3"><b>Campus:</b> {
              student.campus ? student.campus.name : "Not currently enrolled at a campus"
            }</Typography>
            <Typography className={classes.h3} variant="h3"><b>GPA:</b> {student.gpa}</Typography>
          </>
        ) : (
          <div className={classes.formContainer}>
            <div className={classes.formTitle}>
              <Typography style={{fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '20px'}}>
                Edit Student
              </Typography>
            </div>
            <form style={{textAlign: 'center'}} onSubmit={(e) => {
                handleSubmit(e);
                setEditMode(false);
            }}>
              <FormLabel style={{fontWeight: 'bold'}}>First Name: </FormLabel>
              <Input className={classes.formInput} type="text" name="firstname" defaultValue={student.firstname} onChange ={(e) => handleChange(e)}/>
              <br/>
              <FormLabel style={{fontWeight: 'bold'}}>Last Name: </FormLabel>
              <Input className={classes.formInput} type="text" name="lastname" defaultValue={student.lastname} onChange ={(e) => handleChange(e)}/>
              <br/>
              <FormLabel style={{fontWeight: 'bold'}}>Email: </FormLabel>
              <Input className={classes.formInput} type="text" name="email" defaultValue={student.email} onChange ={(e) => handleChange(e)}/>
              <br/>
              <FormLabel style={{fontWeight: 'bold'}}>Image URL: </FormLabel>
              <Input className={classes.formInput} type="text" name="imageurl" onChange={(e) => handleChange(e)} />
              <br/>
              <FormLabel style={{fontWeight: 'bold'}}>Campus: </FormLabel>
                <Select className={classes.formInput} value={student.campus.id} name="campusId" onChange={(e) => handleChange(e)}>
                  {
                    allCampuses.map(c => {
                      return (
                        <MenuItem key={c.id} value={c.id}>{c.id}: {c.name}</MenuItem>
                      );
                    })
                  }
                </Select>
                <br/>
              <FormLabel style={{fontWeight: 'bold'}}>GPA: </FormLabel>
              <Input className={classes.formInput} name="gpa" defaultValue={student.gpa} onChange ={(e) => handleChange(e)}/>
              <br/>
              <Button className={classes.button} variant="contained" color="primary" type="submit">Submit</Button>
              <Button className={classes.button} variant="contained" color="primary" onClick={() => setEditMode(false)}>Cancel</Button>
            </form>
          </div>
      )}
      {
        !editMode ? (
          <>
            <Button 
              className={classes.button} 
              variant="contained" 
              color="primary" 
              onClick={() => setEditMode(true)}>
                Edit Student
            </Button>
            <Button 
              className={[classes.button, classes.warningButton]} 
              variant="contained" 
              color="warning"
              onClick={() => handleDelete()}>
                Delete Student
            </Button>
          </>
        ) : null
      }
    </CardContent>
  </Card>
  );

};

export default StudentView;