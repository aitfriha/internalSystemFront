import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import CurrencyService from '../../../Services/CurrencyService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import TypeOfCurrencylService from '../../../Services/TypeOfCurrencylService';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles();

class CurrencyBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    const year = (new Date()).getFullYear();
    this.years = Array.from(new Array(20), (val, index) => index + year);
    this.state = {
      currencyId: '',
      currencies: [],
      AllDatas: [],
      currencyNameFilter: 'All',
      datas: [],
      openPopUp: false,
      currencyCode: '',
      currencyName: '',
      year: '',
      month: '',
      changeFactor: '',
      row: [],
      columns: [
        {
          label: 'Currency Name',
          name: 'typeOfCurrency.currencyName',
          options: {
            filter: true,
            customBodyRender: (currencyName) => (
              <React.Fragment>
                {
                  currencyName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Currency Code',
          name: 'typeOfCurrency.currencyCode',
          options: {
            filter: true,
            customBodyRender: (currencyCode) => (
              <React.Fragment>
                {
                  currencyCode
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Year Date',
          name: 'year',
          options: {
            filter: true
          }
        },
        {
          label: 'Month Date',
          name: 'month',
          options: {
            filter: true
          }
        },
        {
          label: 'Change Factor',
          name: 'changeFactor',
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
                {thelogedUser.userRoles[0].actionsNames.financialModule_currencyManagement_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {/*                {thelogedUser.userRoles[0].actionsNames.financialModule_currencyManagement_delete ? (
                  <IconButton onClick={() => this.handleDelete(tableMeta)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                ) : null} */}
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  componentDidMount() {
    CurrencyService.getCurrency().then(result => {
      this.setState({ datas: result.data, AllDatas: result.data });
    });
    TypeOfCurrencylService.getTypeOfCurrency().then(result => {
      result.data.push({ currencyName: 'All', typeOfCurrencyId: 'All' });
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
      const id = this.state.datas[index].currencyId;
      CurrencyService.getCurrencyById(id).then(result => {
        console.log(result.data);
        this.setState({
          currencyId: id,
          currencyName: result.data.typeOfCurrency._id,
          currencyCode: result.data.typeOfCurrency.currencyCode,
          year: result.data.year,
          month: result.data.month,
          changeFactor: result.data.changeFactor,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].currencyId;
      CurrencyService.deleteCurrency(id).then(result => {
        this.setState({ datas: result.data, AllDatas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleSave = () => {
      const {
        currencyId, year, month, changeFactor, currencyName
      } = this.state;
      const typeOfCurrency = { _id: currencyName };
      const Currency = {
        currencyId, year, month, changeFactor, typeOfCurrency
      };
      CurrencyService.updateCurrency(Currency).then(result => {
        if (result.status === 200) {
          notification('success', 'Currency Updated');
        } else {
          notification('danger', 'Currency not Added');
        }
        this.setState({ datas: result.data, AllDatas: result.data, openPopUp: false });
      })
        .catch(err => notification('danger', err.response.data.errors.message));
    };

    handleChange = (ev) => {
      const { currencies, AllDatas } = this.state;
      if (ev.target.name === 'currencyNameFilter') {
        if (ev.target.value === 'All') {
          this.setState({ datas: AllDatas });
        } else {
          const test = AllDatas.filter(row => row.typeOfCurrency._id === ev.target.value);
          this.setState({ datas: test });
        }
      }
      if (ev.target.name === 'currencyName') {
        // eslint-disable-next-line array-callback-return
        currencies.map(row => {
          if (row.typeOfCurrencyId === ev.target.value) this.setState({ currencyCode: row.currencyCode });
        });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const months = [
        {
          value: 1,
          label: 'January ',
        },
        {
          value: 2,
          label: 'February ',
        },
        {
          value: 3,
          label: 'March ',
        },
        {
          value: 4,
          label: 'April ',
        },
        {
          value: 5,
          label: 'May ',
        },
        {
          value: 6,
          label: 'June ',
        },
        {
          value: 7,
          label: 'July ',
        },
        {
          value: 8,
          label: 'August ',
        },

        {
          value: 9,
          label: 'September ',
        },
        {
          value: 10,
          label: 'October ',
        },
        {
          value: 11,
          label: 'November ',
        },
        {
          value: 12,
          label: 'December ',
        }];
      const {
        columns, openPopUp, datas, currencyName, currencyCode, year, month, changeFactor, currencies, currencyNameFilter
      } = this.state;
      const {
        logedUser
      } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_currencyManagement_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        print: exportButton,
        downloadOptions: { filename: 'Currency management.csv' },
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add-Currency"
            tooltip="add new Currency"
            fileName="Currency management"
            hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_currencyManagement_create}
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_currencyManagement_export}
          />
        )
      };

      return (
        <div>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="left"
            alignItems="start"
          >
            <Grid item xs={12} md={1}>
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  opacity: 0.4,
                  marginRight: 20,
                  width: '100%'
                }}
              >
                Show :
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl style={{ width: '100%' }}>
                <Select
                  name="currencyNameFilter"
                  value={currencyNameFilter}
                  onChange={this.handleChange}
                >
                  {currencies.map((clt) => (
                    <MenuItem key={clt.typeOfCurrencyId} value={clt.typeOfCurrencyId}>
                      {clt.currencyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <MUIDataTable
            title="The Currencies List"
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
                    <FormControl fullWidth required>
                      <InputLabel>Select Currency </InputLabel>
                      <br />
                      <Select
                        name="currencyName"
                        value={currencyName}
                        variant="outlined"
                        onChange={this.handleChange}
                      >
                        {currencies.map((clt) => (
                          <MenuItem key={clt.typeOfCurrencyId} value={clt.typeOfCurrencyId}>
                            {clt.currencyName}
                          </MenuItem>
                        ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <br />
                    <TextField
                      id="currencyCode"
                      label="Currency Code"
                      variant="outlined"
                      name="currencyCode"
                      value={currencyCode}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <br />
                    <TextField
                      id="changeFactor"
                      label=" Change Factor "
                      variant="outlined"
                      name="changeFactor"
                      type="number"
                      value={changeFactor}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Year</InputLabel>
                      <Select
                        name="year"
                        value={year}
                        onChange={this.handleChange}
                      >
                        {
                          this.years.map((clt) => (
                            <MenuItem key={clt} value={clt}>
                              {clt}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Month</InputLabel>
                      <Select
                        name="month"
                        value={month}
                        onChange={this.handleChange}
                      >
                        {
                          months.map((clt) => (
                            <MenuItem key={clt.value} value={clt.value}>
                              {clt.label}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Cancel
              </Button>
              {thelogedUser.userRoles[0].actionsNames.financialModule_currencyManagement_modify ? (
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
        </div>
      );
    }
}

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser')
});
const CurrencyBlockMapped = connect(
  mapStateToProps,
  null
)(CurrencyBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <CurrencyBlockMapped changeTheme={changeTheme} classes={classes} />;
};
