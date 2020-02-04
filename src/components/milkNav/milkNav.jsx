import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import useStyles from '../../AppStyle'
import './milkNav.css'


function MilkNav(props) {
    const { container } = props;
    const classes = useStyles();
    const handleSavedChartsClick = props.useHandleSavedChartsClick

    let nav = props.user ?
        <span className={'toRight'}>
            <span style={{fontStyle: 'italic'}}>{`Welcome, ${props.user.name}`} </span>
            <Link to='/savedcharts' className='NavBar-link' style={{ textDecoration: 'none', marginRight: 20}} onClick={handleSavedChartsClick}>
                {'Saved Charts'}
            </Link>
            <Link to='/' style={{ textDecoration: 'none'}} className='NavBar-link'>
                {'Create Chart'}
            </Link>
            <Link to = '' className='NavBar-link' style={{ textDecoration: 'none'}} onClick={props.handleLogout}>
                {'Log Out'}
            </Link>
        </span>
        :
        <span>
            <Link to='/login' style={{ textDecoration: 'none'}} className='NavBar-link text'>
            {'Log In'}
            </Link>
            <Link to='/signup' style={{ textDecoration: 'none'}} className='NavBar-link'>
                {'Sign Up'}
            </Link>
        </span>

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                <div class="navContainer">
                    <Link to='/' className='NavBar-link' style={{ textDecoration: 'none'}}>
                        Mama's Milk 
                    </Link>
                        {nav}
                </div>
                </Typography>
                </Toolbar>
            </AppBar> 
        </div>
    );
}

export default MilkNav