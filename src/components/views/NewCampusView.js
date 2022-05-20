/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
  formInput: {
    margin: '10px',
    width: 'auto',
  }
}));

const NewStudentView = (props) => {
  const {handleChange, handleSubmit} = props;
  const classes = useStyles();

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '20px'}}>
              Add a Campus
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <FormLabel style= {{fontWeight: 'bold'}}>Name: </FormLabel>
            <Input className={classes.formInput} type="text" name="name" onChange ={(e) => handleChange(e)} required/>
            <br/>
            <FormLabel style={{fontWeight: 'bold'}}>Address: </FormLabel>
            <Input className={classes.formInput} type="text" name="address" onChange={(e) => handleChange(e)} required/>
            <br/>
            <FormLabel style={{fontWeight: 'bold'}}>Description: </FormLabel>
            <Input className={classes.formInput} type="text" name="description" onChange={(e) => handleChange(e)} />
            <br/>
            <FormLabel style={{fontWeight: 'bold'}}>Image URL: </FormLabel>
            <Input className={classes.formInput} type="text" name="imageurl" onChange={(e) => handleChange(e)} />
            <br/>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )
}

export default NewStudentView;