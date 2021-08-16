import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import { ThemeContext } from '../../../App/ThemeWrapper';
import SuppliersTypeService from '../../../Services/SuppliersTypeService';
import notification from '../../../../components/Notification/Notification';
import IvaService from '../../../Services/IvaService';

const useStyles = makeStyles();

class SuppliersTypeBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      supplierTypeId: '',
      name: '',
      description: '',
      operationAssociated: false,
      internalOrder: false,
      datas: [],
      openPopUp: false,
      row: [],
      columns: [
        {
          label: 'Name',
          name: 'name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Description',
          name: 'description',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Operation Associated',
          name: 'operationAssociated',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  (value ? 'Yes' : 'No')
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Internal Order',
          name: 'internalOrder',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  (value ? 'Yes' : 'No')
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Actions',
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_delete ? (
                  <IconButton onClick={() => this.handleDelete(tableMeta)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  componentDidMount() {
    SuppliersTypeService.getSuppliersType().then(result => {
      this.setState({ datas: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].supplierTypeId;
      SuppliersTypeService.getSuppliersTypeById(id).then(result => {
        console.log(result);
        this.setState({
          supplierTypeId: id,
          name: result.data.name,
          description: result.data.description,
          operationAssociated: result.data.operationAssociated,
          internalOrder: result.data.internalOrder,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
    return;
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].supplierTypeId;
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      SuppliersTypeService.deleteSuppliersType(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleSave = () => {
      const {
        supplierTypeId, name, description, operationAssociated, internalOrder
      } = this.state;
      const SupplierType = {
        supplierTypeId, name, description, operationAssociated, internalOrder
      };
      SuppliersTypeService.updateSuppliersType(SupplierType).then(result => {
        if (result.status === 200) {
          notification('success', 'Supplier type updated');
          SuppliersTypeService.getSuppliersType().then(result2 => {
            this.setState({ datas: result2.data, openPopUp: false });
          });
        }
      })
        .catch(err => notification('danger', err.response.data.errors));
    };

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleCheck = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.operationAssociated;
      this.setState({ operationAssociated: ok });
    }

    handleCheck2 = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.internalOrder;
      this.setState({ internalOrder: ok });
    }

    render() {
      const {
        columns, openPopUp, datas,
        name, description, operationAssociated, internalOrder
      } = this.state;
      const {
        logedUser
      } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        downloadOptions: { filename: 'Suppliers type.csv' },
        print: exportButton,
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add-Suppliers"
            tooltip="Add New Supplier Type"
            fileName="Suppliers type"
            hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_create}
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_export}
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Suppliers Type List"
            data={datas}
            columns={columns}
            options={options}
          />
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={6}
                alignItems="flex-start"
                direction="row"
                justify="center"
              >
                <Grid item xs={10} md={6}>
                  <TextField
                    id="outlined-name"
                    label="Supplier Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    required
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <TextField
                    id="outlined-description"
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={description}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={6}
                alignItems="flex-start"
                direction="row"
                justify="center"
              >
                <Grid item xs={10} md={6}>
                  <FormControlLabel
                    id="operationAssociated"
                    name="operationAssociated"
                    value={operationAssociated}
                    control={<Checkbox color="primary" checked={operationAssociated} onChange={this.handleCheck} />}
                    label="● Associated with Commercial Operation "
                    labelPlacement="start"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    id="internalOrder"
                    name="internalOrder"
                    value={internalOrder}
                    control={<Checkbox color="primary" checked={internalOrder} onChange={this.handleCheck2} />}
                    label="● Had an Internal Order "
                    labelPlacement="start"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Cancel
              </Button>
              {thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_modify ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSave}
                >
                            save
                </Button>
              ) : null}
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser')
});
const SuppliersTypeMapped = connect(
  mapStateToProps,
  null
)(SuppliersTypeBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <SuppliersTypeMapped changeTheme={changeTheme} classes={classes} />;
};
