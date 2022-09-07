import { Drawer, ListItem, Divider, ListItemIcon, ListItemText, List } from "@material-ui/core";
import React from "react";
import NeoSaveModal from "../../modal/SaveModal";
import NeoLoadModal from "../../modal/LoadModal";
import NeoShareModal from "../../modal/ShareModal";
import { NeoAboutModal } from "../../modal/AboutModal";
import { NeoReportExamplesModal } from "../../modal/ReportExamplesModal";
import { applicationGetConnection, applicationHasAboutModalOpen, applicationIsStandalone } from '../../application/ApplicationSelectors';
import { connect } from 'react-redux';
import { setAboutModalOpen, setConnected, setWelcomeScreenOpen } from '../../application/ApplicationActions';
import NeoSettingsModal from "../../settings/SettingsModal";
import { createNotificationThunk } from "../../page/PageThunks";
import { getDashboardSettings } from "../DashboardSelectors";
import { updateDashboardSetting } from "../../settings/SettingsActions";
import { HeroIcon, CustomIcon, Button, IconButton } from '@neo4j-ndl/react'

// The sidebar that appears on the left side of the dashboard.
export const NeoDrawer = ({ open, hidden, connection, dashboardSettings, updateDashboardSetting,
    handleDrawerClose, onAboutModalOpen, resetApplication }) => {

    // Override to hide the drawer when the application is in standalone mode.
    if (hidden) {
        return <></>;
    }

    const content = (
        <Drawer
            variant="permanent"
            style={
                (open) ? {
                    position: 'relative',
                    overflowX: 'hidden',
                    width: '240px',
                    transition: "width 125ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                    boxShadow: "2px 1px 10px 0px rgb(0 0 0 / 12%)",
                    zIndex: 1000

                } : {
                    position: 'relative',
                    overflowX: 'hidden',
                    boxShadow: " 2px 1px 10px 0px rgb(0 0 0 / 12%)",
                    zIndex: 1000,

                    transition: "width 125ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                    width: "56px"
                }
            }
            open={open == true}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'hidden',
                justifyContent: 'flex-end',
                padding: '0 8px',
                minHeight: '64px',

            }}>
                <ListItem>
                    <Button
                        onClick={resetApplication}
                        color="neutral"
                        fill="outlined">
                            <HeroIcon className="ndl-icon n-w-6 n-h-6" type="outline" iconName="LoginIcon" />
                            Menu
                    </Button>
                </ListItem>


                <IconButton onClick={handleDrawerClose} clean>
                    <CustomIcon className="ndl-icon n-w-6 n-h-6" iconName="CollapseExpand" />
                </IconButton>
            </div>
            <Divider />
            <div >
                <ListItem style={{ background: "white", height: "47px" }} >
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="" />
                </ListItem>
            </div>
            <Divider />
            <List>
                <div>
                    <NeoSettingsModal dashboardSettings={dashboardSettings} updateDashboardSetting={updateDashboardSetting}></NeoSettingsModal>
                    <NeoSaveModal></NeoSaveModal>
                    <NeoLoadModal></NeoLoadModal>
                    <NeoShareModal></NeoShareModal>
                </div>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={(e) => window.open("https://neo4j.com/labs/neodash/2.1/user-guide/", "_blank")}>
                    <ListItemIcon>
                        <HeroIcon className="ndl-icon n-w-6 n-h-6" type="outline" iconName="BookOpenIcon" />
                    </ListItemIcon>
                    <ListItemText primary="Documentation" />
                </ListItem>
                <NeoReportExamplesModal database={connection.database}></NeoReportExamplesModal>
                <ListItem button onClick={onAboutModalOpen}>
                    <ListItemIcon>
                        <HeroIcon className="ndl-icon n-w-6 n-h-6" type="outline" iconName="InformationCircleIcon" />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
            </List>
            <Divider />
        </Drawer>

    );
    return content;
}

const mapStateToProps = state => ({
    dashboardSettings: getDashboardSettings(state),
    hidden: applicationIsStandalone(state),
    aboutModalOpen: applicationHasAboutModalOpen(state),
    connection: applicationGetConnection(state)
});

const mapDispatchToProps = dispatch => ({
    onAboutModalOpen: _ => dispatch(setAboutModalOpen(true)),
    updateDashboardSetting: (setting, value) => {
        dispatch(updateDashboardSetting(setting, value));
    },
    resetApplication: _ => {
        dispatch(setWelcomeScreenOpen(true));
        dispatch(setConnected(false));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(NeoDrawer);
