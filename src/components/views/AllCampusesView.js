/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
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

const AllCampusesView = (props) => {
  const classes = useStyles();
  const {allCampuses, deleteCampus} = props;
  // If there is no campus, display a message.
  if (!allCampuses.length) {
    return <div>There are no campuses.</div>;
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <Typography className={classes.h1} variant="h1">All Campuses</Typography>

      {allCampuses.map((campus) => (
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
            <Typography className={classes.h3} variant="h3"><b>address:</b> {campus.address}</Typography>
            <Link className={classes.links} to={`/campus/${campus.id}`}>
              <Button 
                className={classes.button} 
                variant="contained" 
                color="primary">
                  View Campus
              </Button>
            </Link>
            <Button 
                className={[classes.button, classes.warningButton]} 
                variant="contained" 
                color="warning"
                onClick={() => deleteCampus(props)}>
                  Delete Campus
              </Button>
          </CardContent>
        </Card>
      ))}
      <br/>
      <Link className={classes.links} to={`/newcampus`}>
        <Button 
          className={classes.button} 
          variant="contained" 
          color="primary">
            Add New Campus
        </Button>
      </Link>
      <br/><br/>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;