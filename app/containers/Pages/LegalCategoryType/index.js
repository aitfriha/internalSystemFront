import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transition from '../../../components/Transition/transition';
import styles from './legalCategoryType-jss';
import { ThemeContext } from '../../App/ThemeWrapper';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllLegalCategoryType,
  updateLegalCategoryType,
  deleteLegalCategoryType
} from '../../../redux/legalCategoryType/actions';
import { getAllStaffContractByLegalCategoryType } from '../../../redux/staffContract/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class LegalCategoryType extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      name: '',
      functions: '',
      isDialogOpen: false,
      isDeleteDialogOpen: false,
      isRelated: false,
      legalCategoryTypeSelected: {},
      replaceLegalCategoryTypeList: [],
      oldId: '',
      newId: '',
      columns: [
        {
          name: 'legalCategoryTypeId',
          label: 'Legal Category Type Id',
          options: {
            display: false,
            filter: false
          }
        },
        {
          name: 'name',
          label: 'Name',
          options: {
            filter: true
          }
        },
        {
          label: 'Functions',
          name: 'functions',
          options: {
            filter: true
          }
        },
        {
          label: 'Company',
          name: 'companyName',
          options: {
            filter: true
          }
        },
        {
          label: ' ',
          name: ' ',
          options: {
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.hh_typesOfLegalCategory_modify
                  ? (
                    <IconButton onClick={() => this.handleOpenDialog(tableMeta)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  ) : null}
                {thelogedUser.userRoles[0].actionsNames.hh_typesOfLegalCategory_delete
                  ? (
                    <IconButton onClick={() => this.handleOpenDeleteDialog(tableMeta)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };

    this.editingPromiseResolve1 = () => {
    };

    this.editingPromiseResolve2 = () => {
    };
  }

  componentDidMount() {
    const { changeTheme, getAllLegalCategoryType } = this.props;
    changeTheme('blueCyanTheme');
    getAllLegalCategoryType();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const {
      allLegalCategoryType,
      getAllLegalCategoryType,
      updateLegalCategoryType
    } = this.props;
    const { name, functions, legalCategoryTypeSelected } = this.state;
    const legalCategoryType = {
      legalCategoryTypeId: legalCategoryTypeSelected.legalCategoryTypeId,
      name,
      functions
    };
    const promise = new Promise(resolve => {
      updateLegalCategoryType(legalCategoryType);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllLegalCategoryType();
        console.log(result);
        this.setState({
          isDialogOpen: false
        });
      } else {
        console.log(result);
        notification('danger', result);
      }
    });
  };

  handleOpenDialog = tableMeta => {
    const { allLegalCategoryType } = this.props;
    const legalCategoryTypeSelected = allLegalCategoryType.filter(
      legalCategoryType => legalCategoryType.legalCategoryTypeId === tableMeta.rowData[0]
    )[0];
    this.setState({
      legalCategoryTypeSelected,
      name: legalCategoryTypeSelected.name,
      functions: legalCategoryTypeSelected.functions,
      isDialogOpen: true
    });
  };

  handleOpenDeleteDialog = tableMeta => {
    const {
      allLegalCategoryType,
      getAllStaffContractByLegalCategoryType
    } = this.props;
    const legalCategoryTypeSelected = allLegalCategoryType.filter(
      legalCategoryType => legalCategoryType.legalCategoryTypeId === tableMeta.rowData[0]
    )[0];
    const promise = new Promise(resolve => {
      // get client information
      getAllStaffContractByLegalCategoryType(
        legalCategoryTypeSelected.legalCategoryTypeId
      );
      this.editingPromiseResolve2 = resolve;
    });
    promise.then(result => {
      if (this.props.allStaffContractByLegalCategoryType.length === 0) {
        this.setState({
          isDeleteDialogOpen: true,
          isRelated: false,
          oldId: legalCategoryTypeSelected.legalCategoryTypeId
        });
      } else {
        const replaceLegalCategoryTypeList = allLegalCategoryType.filter(
          type => type.legalCategoryTypeId
              !== legalCategoryTypeSelected.legalCategoryTypeId
         //   && type.companyName === legalCategoryTypeSelected.companyName
        );
        this.setState({
          isDeleteDialogOpen: true,
          isRelated: true,
          oldId: legalCategoryTypeSelected.legalCategoryTypeId,
          replaceLegalCategoryTypeList
        });
      }
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false,
      isDeleteDialogOpen: false,
      newId: ''
    });
  };

  handleDeleteType = () => {
    const { getAllLegalCategoryType, deleteLegalCategoryType } = this.props;
    const { oldId, newId } = this.state;
    const promise = new Promise(resolve => {
      deleteLegalCategoryType(oldId, newId);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllLegalCategoryType();
        this.handleClose();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const {
      classes,
      allLegalCategoryType,
      isLoadingLegalCategoryType,
      legalCategoryTypeResponse,
      errorLegalCategoryType,
      isLoadingStaffContract,
      staffContractResponse,
      errorStaffContract,
      logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const {
      name,
      functions,
      isDialogOpen,
      isDeleteDialogOpen,
      isRelated,
      replaceLegalCategoryTypeList,
      newId,
      columns
    } = this.state;
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_typesOfLegalCategory_export) {
      exportButton = true;
    }
    const title = brand.name + ' - Types of legal category';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      download: exportButton,
      print: exportButton,
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allLegalCategoryType}
          url="/app/hh-rr/legalCategoryType/create-legal-category-type"
          tooltip="add new legal category type"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.hh_typesOfLegalCategory_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.hh_typesOfLegalCategory_export}
        />
      )
    };
    !isLoadingLegalCategoryType
      && legalCategoryTypeResponse
      && this.editingPromiseResolve1(legalCategoryTypeResponse);
    !isLoadingLegalCategoryType
      && !legalCategoryTypeResponse
      && this.editingPromiseResolve1(errorLegalCategoryType);

    !isLoadingStaffContract
      && staffContractResponse
      && this.editingPromiseResolve2(staffContractResponse);
    !isLoadingStaffContract
      && !staffContractResponse
      && this.editingPromiseResolve2(errorStaffContract);
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={desc} />
        </Helmet>
        <Dialog
          open={isDeleteDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">
            Delete Legal Category Type
          </DialogTitle>
          <DialogContent>
            {isRelated ? (
              <div>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                >
                  this type is related to some contracts, choose an other legal
                  category type to replace it:
                </Typography>
                <div>
                  <FormControl
                    className={classes.formControl}
                    required
                    style={{ width: '30%' }}
                  >
                    <InputLabel>Legal category type</InputLabel>
                    <Select
                      name="newId"
                      value={newId}
                      onChange={this.handleChange}
                    >
                      {replaceLegalCategoryTypeList.map(type => (
                        <MenuItem
                          key={type.code}
                          value={type.legalCategoryTypeId}
                        >
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#dc3545',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '14px'
                  }}
                >
                  Notice that all the staff contract history related to this
                  legal category type will be deleted permanently
                </Typography>
              </div>
            ) : (
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px'
                }}
              >
                this type is not related to any contract, are you sure you want
                to delete this type?
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            {isRelated ? (
              <Button
                color="primary"
                disabled={newId === ''}
                onClick={this.handleDeleteType}
              >
                Replace and delete
              </Button>
            ) : (
              <Button color="primary" onClick={this.handleDeleteType}>
                Delete
              </Button>
            )}
          </DialogActions>
        </Dialog>
        <Dialog
          open={isDialogOpen}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">
            Edit Legal Category Type
          </DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={name}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Functions"
              variant="outlined"
              name="functions"
              value={functions}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleUpdate}
              disabled={!functions || !name}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Types of Legal Category"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allLegalCategoryType}
            columns={columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allLegalCategoryType: state.getIn(['legalCategoryTypes'])
    .allLegalCategoryType,
  legalCategoryTypeResponse: state.getIn(['legalCategoryTypes'])
    .legalCategoryTypeResponse,
  isLoadingLegalCategoryType: state.getIn(['legalCategoryTypes']).isLoading,
  errorLegalCategoryType: state.getIn(['legalCategoryTypes']).errors,
  staffContractResponse: state.getIn(['staffContracts']).staffContractResponse,
  isLoadingStaffContract: state.getIn(['staffContracts']).isLoading,
  errorStaffContract: state.getIn(['staffContracts']).errors,
  allStaffContractByLegalCategoryType: state.getIn(['staffContracts'])
    .allStaffContractByLegalCategoryType,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateLegalCategoryType,
    getAllLegalCategoryType,
    deleteLegalCategoryType,
    getAllStaffContractByLegalCategoryType
  },
  dispatch
);

const LegalCategoryTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LegalCategoryType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <LegalCategoryTypeMapped changeTheme={changeTheme} classes={classes} />
  );
};
