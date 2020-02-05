import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import useStyles from '../../AppStyle'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import SelectComparison from '../../components/SelectComparison/SelectComparison'
import SelectCountry from '../../components/SelectCountry/SelectCountry'
import SelectAgeGroup from '../../components/SelectAgeGroup/SelectAgeGroup'
import Buttons from '../../components/Buttons/Buttons'
import { useEffect } from 'react';

export default function SideBar(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const drawerWidth = 240;

    useEffect(()=>{
        console.log(props.history.location.pathname)
    })


    const drawer = props.user && !(props.history.location.pathname==='/savedcharts') ?

        <div>
          {/* <div className={classes.toolbar} /> */}
          <SelectComparison user={props.user} handleRadioClick={props.useHandleRadioClick}/>
          <SelectCountry 
            // handleCountryClick={useHandleCountryClick}
            countryMessage={props.countryMessage}
            country={props.country}
            multiple={props.multiple}
            handleChangeMultiple={props.useHandleChangeMultiple}
            />
          <SelectAgeGroup 
            handleAgeClick={props.useHandleAgeClick} 
            // handleChange={handleChange}
            country={props.country} 
            isEnabled={props.isEnabled}
            ageMessage={props.ageMessage}
            checkboxes={props.checkboxes}
            />
            <Buttons 
            handleChartClick={props.useHandleChartClick}
            handleResetClick={props.useHandleResetClick}
            handleSaveClick={props.useHandleSaveClick}
            />
        </div>
    :
    <div></div>

    return (
        <div>
            <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >

                {drawer}
            </Drawer>
            </Hidden>
        </nav>
        </div>
    );
}