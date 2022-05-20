import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sidebar: {
      position: 'fixed',
      flexGrow: 1,
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#88ccff',
      paddingRight: '30px',
      zIndex: '10',      
    },
    links:{
      textDecoration: 'none',
    },
    buttons:{
      marginTop: '10px',
      fontSize: '16px',
      width: '100%',
      color: '#4499ff',
    },
    lists:{
        listStyle: 'none',
        margin: 0
    }
  }));

const Sidebar = ({show}) => {
    const classes = useStyles();
    return (
        <div className={classes.sidebar} style={{display: show}}>
            <ul className={classes.lists}>
                <li>
                    <Link className={classes.links} to={'/'} >
                        <Button className={classes.buttons} variant="contained">
                        Home
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link className={classes.links} to={'/campuses'} >
                        <Button className={classes.buttons} variant="contained">
                        Campuses
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link className={classes.links} to={'/students'} >
                        <Button className={classes.buttons} variant="contained">
                        Students
                        </Button>
                    </Link>
                </li>
            </ul>
      </div>
    );
};

export default Sidebar;