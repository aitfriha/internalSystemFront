import React, { useContext } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  Grid, IconButton, Chip, Fab, Tooltip, Collapse, Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import OperationIcon from '@material-ui/icons/Assignment';
import CustomersIcon from '@material-ui/icons/PeopleAlt';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ArchiveIcon from '@material-ui/icons/Archive';

import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Avatar from '@material-ui/core/Avatar';

import { AssignStaff } from './AssignStaff';
import avatarApi from '../../../../api/images/avatars';
// import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';
import {
  updateOperationAssignment,
  getTreeData,
  getEligibleStaff,
  getStaffAssignedByOperation,
  exportStaffAssignment
} from '../../../../redux/staffAssignment/actions';

import { ThemeContext } from '../../../App/ThemeWrapper';


let self = null;

const styles = {
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  }
};

const ITEM_HEIGHT = 40;

/* const myTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        width: '100px',
        minWidth: '80px'
      },
      head: {
        fontWeight: 600,
        width: '100px',
        minWidth: '80px'
      }
    }
  }
}); */

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));


function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other
  } = props;

  return (
    <TreeItem
      label={(
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      )}
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Weekly Report';
const description = brand.desc;

class StaffAssignment extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      columns: [
        {
          title: 'Id', // intl.formatMessage({ id: 'connection.id' }),
          field: 'id',
          hidden: true,
          searchable: false,
          export: false
        },
        {
          title: 'Image',
          field: 'avatar',
          searchable: false,
          export: false,
          maxWidth: 100,
          width: 100,
          minWidth: 100,
          render: rowData => (
            <Tooltip title={`${rowData.name} ${rowData.fatherFamilyName} ${rowData.motherFamilyName}`}>
              {/* <Avatar alt="Employee name" src={rowData.avatar} /> */}
              <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} />
            </Tooltip>
          )
        },
        {
          title: 'Employee Number', // intl.formatMessage({ id: 'connection.id' }),
          field: 'personalNumber',
          searchable: true,
          maxWidth: 125,
          width: 125,
          minWidth: 125,
          export: true
        },
        {
          title: 'Company Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'company',
          searchable: true,
          minWidth: 140,
          export: true
        },
        {
          title: 'Company Email', // intl.formatMessage({ id: 'connection.id' }),
          field: 'companyEmail',
          searchable: true,
          minWidth: 140,
          export: true
        },
        {
          title: 'Start Date', // intl.formatMessage({ id: 'connection.id' }),
          field: 'startDate',
          searchable: true,
          minWidth: 115,
          width: 115,
          maxWidth: 115,
          export: true,
          render: rowData => new Date(rowData.startDate).toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        },
        {
          title: 'End Date', // intl.formatMessage({ id: 'connection.id' }),
          field: 'endDate',
          searchable: true,
          minWidth: 115,
          width: 115,
          maxWidth: 115,
          render: rowData => (rowData.endDate ? new Date(rowData.endDate).toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }) : '')
        }
      ],
      expanded: [],
      selectedOperation: null,
      customerId: '',
      open: false,
      anchorEl: null,
      openMenu: false,
      buttonAll: false,
      reportData: [],
      components: {
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            {thelogedUser.userRoles[0].actionsNames.operativeModule_staffAssignments_modify ? (
              <Tooltip title="Assign staff">
                <span>
                  <Fab size="small" color="primary" aria-label="add" style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '15px' }} disabled={this.state.selectedOperation === null}>
                    <AssignmentIndIcon onClick={e => this.handleAssignStaff(e)} />
                  </Fab>
                </span>
              </Tooltip>
            ) : null}
          </div>
        )
      }
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('greenTheme');

    const { getTreeData, getStaffAssignedByOperation } = this.props;
    getTreeData();
    const params = {
      operationId: ''
    };
    getStaffAssignedByOperation(params);
  }

  componentWillUnmount() {
    this.setState({
      columns: this.state.columns,
      expanded: [],
      selectedOperation: null,
      customerId: '',
      open: false,
      anchorEl: null,
      openMenu: false,
      buttonAll: false
    });
  }

  getNodeValueById(nodeId) {
    const data = this.props.treeData;
    let selected = '';
    data.forEach(node => {
      if (node.customer.clientId === nodeId) {
        selected = node;
      } else {
        node.operations.forEach(op => {
          if (op.commercialOperationId === nodeId) {
            selected = op;
          }
        });
      }
    });
    return selected;
  }

  getCustomerObject() {
    const index = this.props.treeData.findIndex(obj => obj.customer.clientId === this.state.customerId);
    return index > -1 ? this.props.treeData[index].customer : null;
  }

  getCustomerByOperation(operationId) {
    const data = this.props.treeData;
    let id = -1;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const operationIndex = element.operations.findIndex(obj => obj.commercialOperationId === operationId);
      if (operationIndex > -1) {
        id = element.customer.clientId;
        break;
      }
    }
    return id;
  }

  handleOpenMenu(event, option) {
    self.setState({
      anchorEl: event.currentTarget,
      openMenu: true,
      buttonAll: option === 'all'
    });
  }

  handleCloseMenu() {
    self.setState({
      anchorEl: null,
      openMenu: false,
      buttonAll: false
    });
  }

  //------------------------------------------------------------------------------------------------------------------


  // HANDLE ACTIONS
  handleToogleSelect(evt, nodeId) {
    console.log("handleToogleSelect"+nodeId);
    self.setState({
      expanded: nodeId
    });
  }

  handleNodeSelect(evt, nodeId) {
    const { getStaffAssignedByOperation, getEligibleStaff } = self.props;
    console.log(nodeId);
    const selectedNode = self.getNodeValueById(nodeId);
    console.log(selectedNode);
    const operation = !selectedNode.hasOwnProperty('operations') ? selectedNode : null;

    const id = selectedNode.hasOwnProperty('operations') ? nodeId : self.getCustomerByOperation(operation.commercialOperationId);

    self.setState({
      selectedOperation: operation,
      customerId: id
    });
    const data = {
      operationId: operation !== null ? operation.commercialOperationId : ''
    };
    getStaffAssignedByOperation(data);

    if (operation !== null) {
      getEligibleStaff(operation.commercialOperationId);
    }
  }

  handleAssignStaff(evt) {
    this.setState({
      open: true
    });
  }

  handleClose() {
    self.setState({
      open: false
    });
  }

  handleExportCSV(event) {
    const { exportStaffAssignment } = this.props;
    new Promise((resolve) => {
      const params = {
        fileType: 'excel',
        option: this.state.buttonAll ? 'HISTORY' : 'BY_OPERATION',
        operationId: this.state.buttonAll ? '' : this.state.selectedOperation.id
      };
      exportStaffAssignment(params);
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      this.setState({
        searchComplete: true,
        anchorEl: null,
        openMenu: false,
      });

      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.state.buttonAll ? 'STAFF ASSIGNMENT HISTORY.xlsx' : 'STAFF ASSIGNMENT HISTORY BY OPERATION.xlsx');
      document.body.appendChild(link);
      link.click();
    });
  }

  handleExportPDF(event) {
    const { exportStaffAssignment } = this.props;
    new Promise((resolve) => {
      const params = {
        fileType: 'pdf',
        option: this.state.buttonAll ? 'HISTORY' : 'BY_OPERATION',
        operationId: this.state.buttonAll ? '' : this.state.selectedOperation.id
      };
      exportStaffAssignment(params);
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      this.setState({
        searchComplete: true,
        anchorEl: null,
        openMenu: false,
      });

      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.state.buttonAll ? 'STAFF ASSIGNMENT HISTORY.pdf' : 'STAFF ASSIGNMENT HISTORY BY OPERATION.pdf');
      document.body.appendChild(link);
      link.click();
    });
  }

  //------------------------------------------------------------------------------------------------------------------

  render() {
    const {
      location, classes, intl, treeData, isLoading, staffAssignmentResponse, errors, assignedStaff, eligibleStaff, updateOperationAssignment, getStaffAssignedByOperation, logedUser
    } = this.props;
    const { columns } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    (!isLoading && staffAssignmentResponse) && this.editingPromiseResolve(staffAssignmentResponse);
    (!isLoading && !staffAssignmentResponse) && this.editingPromiseResolve(errors);
    return (
      <div>
        {/* <HelmetCustom location={location} /> */}
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Card>
          <CardContent height="100%">
            <Grid container direction="row" spacing={1}>
              <Grid item xs={12} md={3}>
                <Chip label="Customers and Operations" style={{ marginTop: '10px' }} color="secondary" />
                {thelogedUser.userRoles[0].actionsNames.operativeModule_staffAssignments_export ? (
                  <Box display="flex" justifyContent="flex-end">
                    <Tooltip title="Export all">
                      <span>
                        <IconButton disabled={treeData.length === 0} style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }} onClick={(event) => this.handleOpenMenu(event, 'all')}>
                          <SaveAltIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                ) : null}
                {treeData.length > 0
                  ? (
                    <TreeView
                      className={classes.root}
                      defaultExpanded={[]}
                      defaultCollapseIcon={<ArrowDropDownIcon />}
                      defaultExpandIcon={<ArrowRightIcon />}
                      defaultEndIcon={<div style={{ width: 24 }} />}
                      expanded={this.state.expanded}
                      onNodeToggle={this.handleToogleSelect}
                      onNodeSelect={this.handleNodeSelect}
                      style={{ minWidth: '100%', minHeight: '87.5%', overflow: 'auto' }}
                    >
                      {treeData.map(el => (
                        <StyledTreeItem key={el.customer.clientId} nodeId={el.customer.clientId} labelText={el.customer.name} labelIcon={CustomersIcon}>
                          {el.operations.map(operation => (
                            <StyledTreeItem
                              key={operation.commercialOperationId}
                              nodeId={operation.commercialOperationId}
                              labelText={operation.name}
                              labelIcon={OperationIcon}
                              color="#3c8039"
                              bgColor="#e6f4ea"
                            />
                          ))}
                        </StyledTreeItem>
                      ))}
                    </TreeView>
                  )

                  : (
                    <div style={{ textAlign: 'center', marginTop: '95%', marginBottom: '95%' }}>
                      <ArchiveIcon color="action" fontSize="large" />
                      <Typography variant="body2">
                      No records to display
                      </Typography>
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} md={9}>
                <Chip label="Assignment History" style={{ marginTop: '10px', marginBottom: '10px' }} color="secondary" />
                <MaterialTable
                  title=""
                  columns={columns}
                  data={assignedStaff && assignedStaff}
                  actions={[
                    {
                      icon: 'save_alt',
                      tooltip: 'Export',
                      disabled: !thelogedUser.userRoles[0].actionsNames.operativeModule_staffAssignments_export || !assignedStaff.length > 0,
                      isFreeAction: true,
                      onClick: (event) => this.handleOpenMenu(event, 'operation')
                    }
                  ]}
                  // localization={localizationMaterialTable(intl)}
                  components={this.state.components}
                />
                {/* </MuiThemeProvider> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {this.state.openMenu
          ? (
            <React.Fragment>
              <Menu
                id="long-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={this.state.openMenu}
                onClose={this.handleCloseMenu}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 150
                  },
                }}
              >
                <MenuItem key="csv" onClick={(event) => this.handleExportCSV(event)} value="csv">
                  Export as CSV
                </MenuItem>
                <MenuItem key="pdf" onClick={(event) => this.handleExportPDF(event)} value="pdf">
                  Export as PDF
                </MenuItem>
              </Menu>
            </React.Fragment>
          )
          : null
        }
        {this.state.open
          ? (
            <AssignStaff
              open={this.state.open}
              data={{
                customer: this.getCustomerObject(),
                operation: this.state.selectedOperation,
                assignedStaff,
                eligibleStaff
              }}
              handleClose={this.handleClose}
              updateOperationAssignment={updateOperationAssignment}
              getStaffAssignedByOperation={getStaffAssignedByOperation}
              errors={errors}
              staffAssignmentResponse={staffAssignmentResponse}
              isLoading={isLoading}
            />
          )
          : null}
      </div>
    );
  }
}

StaffAssignment.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,

  treeData: PropTypes.array.isRequired,
  getTreeData: PropTypes.func.isRequired,

  assignedStaff: PropTypes.array.isRequired,
  getStaffAssignedByOperation: PropTypes.func.isRequired,

  updateOperationAssignment: PropTypes.func.isRequired,

  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  treeData: state.getIn(['staffAssignment']).treeData,
  eligibleStaff: state.getIn(['staffAssignment']).eligibleStaff,
  assignedStaff: state.getIn(['staffAssignment']).assignedStaff,
  staffAssignmentResponse: state.getIn(['staffAssignment']).staffAssignmentResponse,
  isLoading: state.getIn(['staffAssignment']).isLoading,
  errors: state.getIn(['staffAssignment']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateOperationAssignment,
  getTreeData,
  getEligibleStaff,
  getStaffAssignedByOperation,
  exportStaffAssignment
}, dispatch);

const StaffAssignmentMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(StaffAssignment));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <StaffAssignmentMapped changeTheme={changeTheme} classes={classes} />;
};
// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(StaffAssignment)));
