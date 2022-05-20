/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, CardHeader, CardMedia } from "@material-ui/core";
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
  warningButton: {
    backgroundColor: '#dd2222',
    color: 'white'
  }
}));

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  const classes = useStyles();
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <Typography className={classes.h1} variant="h1">All Students</Typography>

      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
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
                <Typography className={classes.h3} variant="h3"><b>email:</b> {student.email}</Typography>
                <Link className={classes.links} to={`/student/${student.id}`}>
                  <Button 
                    className={classes.button} 
                    variant="contained" 
                    color="primary">
                      View Student
                  </Button>
                </Link>
                <Button 
                  className={[classes.button, classes.warningButton]} 
                  variant="contained" 
                  color="warning"
                  onClick={() => deleteStudent(student.id)}>
                    Delete Student
                </Button>
              </CardContent>
            </Card>
          );
        }
      )}
      <br/>
      <Link className={classes.links} to={`/newstudent`}>
        <Button variant="contained" color="primary">Add New Student</Button>
      </Link>
      <br/><br/>
    </div>
  );
};


export default AllStudentsView;