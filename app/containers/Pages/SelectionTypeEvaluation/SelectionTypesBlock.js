import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';

import {
  Button,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  TextField,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PapperBlock } from 'dan-components';
import Transition from '../../../components/Transition/transition';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './selectionTypes-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import AutoComplete from '../../../components/AutoComplete';
import SelectionTypeEvaluationService from '../../Services/SelectionTypeEvaluationService';
import {
  getAllSelectionTypeEvaluation,
  updateSelectionTypeEvaluation,
  deleteSelectionTypeEvaluation
} from '../../../redux/selectionTypeEvaluation/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class SelectionTypesBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      selectionType: {},
      index: -1,
      selectionTypes: [],
      isSelectionTypeEdit: false,
      isSelectionTypeDelete: false,
      description: '',
      selectionTypeName: '',
      columns: [
        {
          name: 'selectionTypeId',
          label: 'Selection Type Id',
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
          label: 'Description',
          name: 'description',
          options: {
            filter: true
          }
        },
        {
          label: 'Type',
          name: 'type',
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
                {thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_modify
                  ? (
                    <IconButton onClick={() => this.handleOpenEdit(tableMeta)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  ) : null}
                {thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_delete
                  ? (
                    <IconButton onClick={() => this.handleOpenDelete(tableMeta)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };

    this.editingPromiseResolve = () => {
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
    this.updateData();
  }

  handleOpenEdit = tableMeta => {
    const { allSelectionTypeEvaluation } = this.props;
    const selectionTypeSelected = allSelectionTypeEvaluation.filter(
      selectinType => selectinType.selectionTypeId === tableMeta.rowData[0]
    )[0];
    this.setState({
      selectionType: selectionTypeSelected,
      selectionTypeName: selectionTypeSelected.name,
      description: selectionTypeSelected.description,
      isSelectionTypeEdit: true
    });
  };

  handleOpenDelete = tableMeta => {
    const { allSelectionTypeEvaluation } = this.props;
    const selectionTypeSelected = allSelectionTypeEvaluation.filter(
      selectinType => selectinType.selectionTypeId === tableMeta.rowData[0]
    )[0];
    this.setState({
      selectionType: selectionTypeSelected,
      isSelectionTypeDelete: true
    });
  };

  handleClose = () => {
    this.updateData();
    this.setState({
      isSelectionTypeEdit: false,
      isSelectionTypeDelete: false
    });
  };

  updateData = () => {
    const { getAllSelectionTypeEvaluation } = this.props;
    getAllSelectionTypeEvaluation();
    SelectionTypeEvaluationService.getSelectionTypeByType('Main Type').then(
      ({ data }) => {
        this.setState({
          selectionTypes: data.payload
        });
      }
    );
  };

  handleExpandClick = index => {
    this.setState({
      index
    });
  };

  handleValueChange = (value, type) => {
    this.setState({ [type]: value });
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  getSelectionTypes = () => {
    const { allSelectionTypeEvaluation } = this.props;
    const { selectionType } = this.state;
    if (selectionType) {
      return allSelectionTypeEvaluation.filter(
        type => type.type === selectionType.type
      );
    }
    return [];
  };

  handleUpdateType = () => {
    const {
      updateSelectionTypeEvaluation,
      getAllSelectionTypeEvaluation
    } = this.props;
    const { selectionTypeName, description, selectionType } = this.state;
    console.log(selectionType.selectionTypeId);
    const type = {
      selectionTypeId: selectionType.selectionTypeId,
      name: selectionTypeName,
      description,
      type: selectionType.type
    };
    const promise = new Promise(resolve => {
      updateSelectionTypeEvaluation(type);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllSelectionTypeEvaluation();
        this.handleClose();
      } else {
        notification('danger', result);
      }
    });
  };

  handleDeleteType = () => {
    const { deleteSelectionTypeEvaluation } = this.props;
    const { selectionType } = this.state;
    const promise = new Promise(resolve => {
      deleteSelectionTypeEvaluation(selectionType.selectionTypeId);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllSelectionTypeEvaluation();
      } else {
        notification('danger', result);
      }
      this.handleClose();
    });
  };

  render() {
    const {
      classes,
      allSelectionTypeEvaluation,
      isLoadingselectionTypeEvaluation,
      selectionTypeEvaluationResponse,
      errorselectionTypeEvaluation,
      logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const {
      isSelectionTypeEdit,
      isSelectionTypeDelete,
      selectionTypes,
      index,
      selectionTypeName,
      description,
      columns
    } = this.state;
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_export) {
      exportButton = true;
    }
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
          csvData={allSelectionTypeEvaluation}
          url="/app/hh-rr/selectionTypeEvaluation/create-type"
          tooltip="add new selection type"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_export}
        />
      )
    };
    !isLoadingselectionTypeEvaluation
      && selectionTypeEvaluationResponse
      && this.editingPromiseResolve(selectionTypeEvaluationResponse);
    !isLoadingselectionTypeEvaluation
      && !selectionTypeEvaluationResponse
      && this.editingPromiseResolve(errorselectionTypeEvaluation);
    selectionTypes.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return (
      <div>
        <Dialog
          open={isSelectionTypeDelete}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">
            Delete Selection Type
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: 'sans-serif , Arial',
                fontSize: '17px'
              }}
            >
              Are you sure you want to delete this type with all sub-types?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleDeleteType}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isSelectionTypeEdit}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">Edit Selection Type</DialogTitle>
          <DialogContent>
            <div style={{ width: '100%' }}>
              {/*              <AutoComplete
                value={this.handleValueChange}
                placeholder="Selection Type Name"
                data={this.getSelectionTypes()}
                type="selectionTypeName"
                attribute="name"
              /> */}
              <TextField
                id="outlined-basic"
                label="Selection Type Name"
                variant="outlined"
                name="selectionTypeName"
                value={selectionTypeName}
                fullWidth
                required
                className={classes.textField}
                onChange={this.handleChange}
                style={{ marginBottom: 10 }}
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
              style={{ marginBottom: 10 }}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleUpdateType}
              disabled={!selectionTypeName}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Selection Type Evaluation Table"
          icon="md-menu"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allSelectionTypeEvaluation}
            columns={columns}
            options={options}
          />
        </PapperBlock>
        <PapperBlock
          title="Selection Type Evaluation Tree"
          icon="md-menu"
          noMargin
        >
          {selectionTypes ? (
            selectionTypes.map((mainType, indexMainType) => (
              <div style={{ width: '100%' }}>
                <Paper
                  elevation={1}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    paddingLeft: '2%'
                  }}
                >
                  <div className={classes.divSpace}>
                    <div>{mainType.name}</div>
                    <Button
                      name="personalInformation"
                      style={{ backgroundColor: 'transparent' }}
                      disableRipple
                      endIcon={
                        indexMainType === index ? (
                          <ExpandLessOutlinedIcon />
                        ) : (
                          <ExpandMoreOutlinedIcon />
                        )
                      }
                      onClick={() => this.handleExpandClick(indexMainType)}
                    />
                  </div>
                </Paper>
                <Collapse in={indexMainType === index}>
                  {mainType.childs ? (
                    mainType.childs.map(subType => (
                      <div>
                        <Paper
                          elevation={1}
                          style={{
                            width: '100%',
                            paddingLeft: '30%'
                          }}
                        >
                          <div className={classes.divSpace}>
                            <div>{subType.name} </div>
                          </div>
                        </Paper>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </Collapse>
              </div>
            ))
          ) : (
            <div />
          )}
        </PapperBlock>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  allSelectionTypeEvaluation: state.getIn(['selectionTypeEvaluations'])
    .allSelectionTypeEvaluation,
  selectionTypeEvaluationResponse: state.getIn(['selectionTypeEvaluations'])
    .selectionTypeEvaluationResponse,
  isLoadingselectionTypeEvaluation: state.getIn(['selectionTypeEvaluations'])
    .isLoading,
  errorselectionTypeEvaluation: state.getIn(['selectionTypeEvaluations']).errors,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateSelectionTypeEvaluation,
    deleteSelectionTypeEvaluation,
    getAllSelectionTypeEvaluation
  },
  dispatch
);

const SelectionTypesBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionTypesBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <SelectionTypesBlockMapped changeTheme={changeTheme} classes={classes} />
  );
};
