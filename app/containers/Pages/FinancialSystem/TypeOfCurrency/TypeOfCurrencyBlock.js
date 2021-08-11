import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import TypeOfCurrencylService from '../../../Services/TypeOfCurrencylService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import CurrencyService from '../../../Services/CurrencyService';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles();

class TypeOfCurrencyBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      typeOfCurrencyId: '',
      datas: [],
      currencies: [],
      openPopUp: false,
      openWarning: false,
      currencyCode: '',
      currencyName: '',
      columns: [
        {
          label: 'Currency Name',
          name: 'currencyName',
          options: {
            filter: true
          }
        },
        {
          label: 'Currency Code',
          name: 'currencyCode',
          options: {
            filter: true
          }
        },
        {
          label: 'Actions',
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_delete ? (
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
    TypeOfCurrencylService.getTypeOfCurrency().then(result => {
      this.setState({ datas: result.data });
    });
    CurrencyService.getCurrency().then(result => {
      this.setState({ currencies: result.data });
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
      const id = this.state.datas[index].typeOfCurrencyId;
      TypeOfCurrencylService.getTypeOfCurrencyById(id).then(result => {
        this.setState({
          typeOfCurrencyId: id,
          currencyName: result.data.currencyName,
          currencyCode: result.data.currencyCode,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
      let test = false;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].typeOfCurrencyId;
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      this.state.currencies.map(row => {
        if ((row.typeOfCurrency._id) === (id)) test = true;
      });
      if (test) this.setState({ openWarning: true });
      else {
        TypeOfCurrencylService.deleteTypeOfCurrency(id).then(result => {
          this.setState({ datas: result.data });
        });
      }
    };

    handleClose = () => {
      this.setState({ openPopUp: false, openWarning: false });
    };

    handleSave = () => {
      let {
        currencyName, currencyCode
      } = this.state;
      const {
        typeOfCurrencyId
      } = this.state;
      currencyName = currencyName.toUpperCase();
      currencyCode = currencyCode.toUpperCase();
      const Currency = {
        typeOfCurrencyId, currencyName, currencyCode
      };
      const code = currencyCode.toString();
      if (code.length < 4) {
        TypeOfCurrencylService.updateTypeOfCurrency(Currency).then(result => {
          if (result.status === 200) {
            notification('success', 'Type of currency updated');
            this.setState({ datas: result.data, openPopUp: false });
          } else {
            notification('danger', 'Type of currency not updated');
          }
        })
          .catch(err => notification('danger', err.response.data.errors.message));
      }
    };

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const {
        columns, openPopUp, datas, currencyName, currencyCode, openWarning
      } = this.state;
      const { logedUser } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        print: exportButton,
        downloadOptions: { filename: 'Currency types.csv' },
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add Currency Type"
            tooltip="add new Currency Type"
            fileName="Currency types"
            hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_create}
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_export}
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Currencies Type List"
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
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="currencyName"
                      label="Currency Name"
                      variant="outlined"
                      name="currencyName"
                      value={currencyName}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="currencyCode"
                      label="Currency Code"
                      variant="outlined"
                      name="currencyCode"
                      value={currencyCode}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Cancel
              </Button>
              {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_modify ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSave}
                >
                            update
                </Button>
              ) : null}
            </DialogActions>
          </Dialog>

          <Dialog
            open={openWarning}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth=""
            maxWidth=""
          >
            <DialogTitle id="alert-dialog-slide-title"> Delete Denied </DialogTitle>
            <DialogContent dividers>
              <Typography
                style={{
                  color: 'red',
                  marginRight: 20,
                  width: '100%'
                }}
              >
                 You can't delete this currency type because its used in other module
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser'),
});
const CurrencyBlockMapped = connect(
  mapStateToProps,
  null
)(TypeOfCurrencyBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <CurrencyBlockMapped changeTheme={changeTheme} classes={classes} />;
};
