import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import EconomicStaffService from '../../../Services/EconomicStaffService';
import EconomicStaffYearService from '../../../Services/EconomicStaffYearService';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import { ThemeContext } from '../../../App/ThemeWrapper';
import EditEconomicStaff from './editEconomicStaff';
import ConsultStaff from './consultStaff';
import CurrencyService from '../../../Services/CurrencyService';
import EconomicStaffMonthService from '../../../Services/EconomicStaffMonthService';
import EconomicStaffExtraService from '../../../Services/EconomicStaffExtraService';

const useStyles = makeStyles();

class EconomicStaffBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      economicStaff: {},
      staffId: '',
      companyId: '',
      changeFactor: '',
      company: '',
      employeeNumber: '',
      name: '',
      fatherName: '',
      motherName: '',
      highDate: '',
      lowDate: '',
      grosSalary: 0,
      netSalary: 0,
      contributionSalary: 0,
      companyCost: 0,
      grosSalaryEuro: 0,
      netSalaryEuro: 0,
      contributionSalaryEuro: 0,
      companyCostEuro: 0,
      openPopUp: false,
      openStaff: false,
      openYear: false,
      openMonth: false,
      openExtra: false,
      openCompanyCost: false,
      openCompanyCostMonth: false,
      yearPayment: '',
      monthPayment: '',
      grosSalaryYear: 0,
      netSalaryYear: 0,
      contributionSalaryYear: 0,
      companyCostYear: 0,
      grosSalaryEuroYear: 0,
      netSalaryEuroYear: 0,
      contributionSalaryEuroYear: 0,
      companyCostEuroYear: 0,
      grosSalaryMonth: 0,
      netSalaryMonth: 0,
      contributionSalaryMonth: 0,
      companyCostMonth: 0,
      grosSalaryEuroMonth: 0,
      netSalaryEuroMonth: 0,
      contributionSalaryEuroMonth: 0,
      companyCostEuroMonth: 0,
      extraordinaryDate: '',
      extraordinaryExpenses: 0,
      extraordinaryExpensesEuro: 0,
      extraordinaryObjectives: 0,
      extraordinaryObjectivesEuro: 0,
      datas: [],
      currencies: [],
      currencyId: '',
      currencyCode: '',
      columns: [
        {
          label: ' ',
          name: 'lowDate',
          options: {
            customBodyRender: (lowDate) => (
              <React.Fragment>
                <IconButton>
                  <RadioButtonUncheckedIcon style={{
                    backgroundColor: lowDate ? 'red' : 'green',
                    color: lowDate ? 'red' : 'green',
                    borderRadius: '100%'
                  }}
                  />
                </IconButton>
              </React.Fragment>
            )
          }
        },
        {
          name: 'staff.firstName',
          label: 'First Name',
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
            customBodyRender: (firstName) => (
              <React.Fragment>
                {
                  firstName || ''
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'fatherName',
          label: 'Father Name',
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
          name: 'motherName',
          label: 'Mother Name',
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
          name: 'highDate',
          label: 'High Date',
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
          name: 'lowDate',
          label: 'Low Date',
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
          name: 'currency.typeOfCurrency.currencyCode',
          label: 'Currency',
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
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'grosSalary',
          label: 'Gross Salary',
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
          name: 'grosSalaryEuro',
          label: 'Gross Salary (€)',
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
          name: 'netSalary',
          label: 'Net Salary',
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
          name: 'netSalaryEuro',
          label: 'Net Salary (€)',
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
          name: 'contributionSalary',
          label: 'Contribution Salary',
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
          name: 'contributionSalaryEuro',
          label: 'Contribution Salary (€)',
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
          name: 'companyCost',
          label: 'Company Cost',
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
          name: 'companyCostEuro',
          label: 'Company Cost (€)',
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
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 250
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 251
              }
            }),
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                <IconButton size="small" onClick={() => this.handleMonth(tableMeta)}>
                  <Button size="small" variant="contained" style={{ color: blue[700], fontSize: 12 }}>
                    Month
                  </Button>
                </IconButton>
                <IconButton size="small" onClick={() => this.handleYear(tableMeta)}>
                  <Button size="small" variant="contained" style={{ color: yellow[700], fontSize: 12 }}>
                    Year
                  </Button>
                </IconButton>
                <IconButton size="small" onClick={() => this.handleExtra(tableMeta)}>
                  <Button size="small" variant="contained" style={{ color: green[700], fontSize: 12 }}>
                    Extra
                  </Button>
                </IconButton>
                <IconButton size="small" onClick={() => this.handleStaffs(tableMeta)}>
                  <Button size="small" variant="contained" style={{ color: red[700], fontSize: 12 }}>
                    Staff
                  </Button>
                </IconButton>
                {thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicManagement_access ? (
                  <IconButton size="small" onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicManagement_delete ? (
                  <IconButton size="small" onClick={() => this.handleDelete(tableMeta)}>
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

    // eslint-disable-next-line react/sort-comp
    handleYear = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({
          openYear: true,
          grosSalaryYear: economicStaff.grosSalary,
          netSalaryYear: economicStaff.netSalary,
          contributionSalaryYear: economicStaff.contributionSalary,
          grosSalaryEuroYear: economicStaff.grosSalaryEuro,
          netSalaryEuroYear: economicStaff.netSalaryEuro,
          contributionSalaryEuroYear: economicStaff.contributionSalaryEuro,
          currencyId: economicStaff.currency._id,
          currencyCode: economicStaff.currency.typeOfCurrency.currencyCode,
          changeFactor: economicStaff.changeFactor,
          economicStaff
        });
      });
    }

    handleMonth = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({
          openMonth: true,
          grosSalaryMonth: economicStaff.grosSalary,
          netSalaryMonth: economicStaff.netSalary,
          contributionSalaryMonth: economicStaff.contributionSalary,
          grosSalaryEuroMonth: economicStaff.grosSalaryEuro,
          netSalaryEuroMonth: economicStaff.netSalaryEuro,
          contributionSalaryEuroMonth: economicStaff.contributionSalaryEuro,
          currencyId: economicStaff.currency._id,
          currencyCode: economicStaff.currency.typeOfCurrency.currencyCode,
          changeFactor: economicStaff.changeFactor,
          economicStaff
        });
      });
    }

    handleStaffs = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({ openStaff: true, economicStaff });
      });
    }

    handleExtra = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({
          openExtra: true, currencyId: economicStaff.currency._id, currencyCode: economicStaff.currency.typeOfCurrency.currencyCode, changeFactor: economicStaff.changeFactor, economicStaff
        });
      });
    }

    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({ openPopUp: true, economicStaff });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.deleteEconomicStaff(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleCloseYear = () => {
      this.setState({ openYear: false, openCompanyCost: false });
    };

    handleSaveYear = () => {
      const {
        yearPayment, economicStaff, currencyId, changeFactor,
        grosSalaryYear, netSalaryYear, contributionSalaryYear, companyCostYear, grosSalaryEuroYear, netSalaryEuroYear, contributionSalaryEuroYear, companyCostEuroYear
      } = this.state;
      const currency = { _id: currencyId };
      const EconomicStaffYear = {
        yearPayment,
        economicStaff,
        currency,
        changeFactor,
        grosSalaryYear,
        netSalaryYear,
        contributionSalaryYear,
        companyCostYear,
        grosSalaryEuroYear,
        netSalaryEuroYear,
        contributionSalaryEuroYear,
        companyCostEuroYear
      };
      EconomicStaffYearService.saveEconomicStaffYear(EconomicStaffYear).then(result => {
        this.setState({ openYear: false, openCompanyCost: false });
      });
    };

    handleCalculCompanyCost = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const gros = this.state.grosSalaryYear; const net = this.state.netSalaryYear; const contribution = this.state.contributionSalaryYear; const changefactor = this.state.changeFactor;
      const companycostyear = Number(gros) + Number(net) + Number(contribution);
      this.setState({ companyCostYear: companycostyear, companyCostEuroYear: companycostyear * changefactor, openCompanyCost: true });
    };

    handleCloseMonth = () => {
      this.setState({ openMonth: false, openCompanyCostMonth: false });
    };

    handleSaveMonth = () => {
      const {
        monthPayment, economicStaff, currencyId, changeFactor,
        grosSalaryMonth, netSalaryMonth, contributionSalaryMonth, companyCostMonth, grosSalaryEuroMonth, netSalaryEuroMonth, contributionSalaryEuroMonth, companyCostEuroMonth
      } = this.state;
      const currency = { _id: currencyId };
      const EconomicStaffMonth = {
        monthPayment,
        economicStaff,
        currency,
        changeFactor,
        grosSalaryMonth,
        netSalaryMonth,
        contributionSalaryMonth,
        companyCostMonth,
        grosSalaryEuroMonth,
        netSalaryEuroMonth,
        contributionSalaryEuroMonth,
        companyCostEuroMonth
      };
      console.log(EconomicStaffMonth);
      EconomicStaffMonthService.saveEconomicStaffMonth(EconomicStaffMonth).then(result => {
        console.log(result);
        this.setState({ openMonth: false });
      });
    };

    handleCalculCompanyCostMonth = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const gros = this.state.grosSalaryMonth; const net = this.state.netSalaryMonth; const contribution = this.state.contributionSalaryMonth; const changefactor = this.state.changeFactor;
      const companycostMonth = Number(gros) + Number(net) + Number(contribution);
      this.setState({ companyCostMonth: companycostMonth, companyCostEuroMonth: companycostMonth * changefactor, openCompanyCostMonth: true });
    };

    handleCloseExtra = () => {
      this.setState({ openExtra: false });
    };

    handleSaveExtra = () => {
      const {
        extraordinaryDate, economicStaff, currencyId, changeFactor,
        extraordinaryExpenses, extraordinaryExpensesEuro, extraordinaryObjectives, extraordinaryObjectivesEuro
      } = this.state;
      const currency = { _id: currencyId };
      const EconomicStaffExtra = {
        extraordinaryDate,
        economicStaff,
        currency,
        changeFactor,
        extraordinaryExpenses,
        extraordinaryExpensesEuro,
        extraordinaryObjectives,
        extraordinaryObjectivesEuro,
      };
      console.log(EconomicStaffExtra);
      EconomicStaffExtraService.saveEconomicStaffExtra(EconomicStaffExtra).then(result => {
        console.log(result);
        this.setState({ openExtra: false, openCompanyCostMonth: false });
      });
    };

    componentDidMount() {
      CurrencyService.getFilteredCurrency().then(result => {
        this.setState({ currencies: result.data });
      });
      EconomicStaffService.getEconomicStaff().then(result => {
        this.setState({ datas: result.data });
      });
      const {
        // eslint-disable-next-line react/prop-types
        changeTheme
      } = this.props;
      changeTheme('greyTheme');
    }

    handleChange = (ev) => {
      // eslint-disable-next-line react/destructuring-assignment
      let { changeFactor } = this.state;
      if (ev.target.name === 'currencyId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const {
          grosSalaryYear, netSalaryYear, contributionSalaryYear, companyCostYear,
          grosSalaryMonth, netSalaryMonth, contributionSalaryMonth, companyCostMonth,
          extraordinaryExpenses, extraordinaryObjectives
        } = this.state;
        let currencyCode;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.currencies.map(currency => {
          if (currency.currencyId === ev.target.value) {
            // eslint-disable-next-line prefer-destructuring
            changeFactor = currency.changeFactor; currencyCode = currency.typeOfCurrency.currencyCode;
          }
        });
        this.setState({
          grosSalaryEuroYear: grosSalaryYear * changeFactor,
          netSalaryEuroYear: netSalaryYear * changeFactor,
          contributionSalaryEuroYear: contributionSalaryYear * changeFactor,
          companyCostEuroYear: companyCostYear * changeFactor,
          grosSalaryEuroMonth: grosSalaryMonth * changeFactor,
          netSalaryEuroMonth: netSalaryMonth * changeFactor,
          contributionSalaryEuroMonth: contributionSalaryMonth * changeFactor,
          companyCostEuroMonth: companyCostMonth * changeFactor,
          extraordinaryExpensesEuro: extraordinaryExpenses * changeFactor,
          extraordinaryObjectivesEuro: extraordinaryObjectives * changeFactor,
          changeFactor,
          currencyCode
        });
      }
      if (ev.target.name === 'grosSalaryYear') {
        this.setState({ grosSalaryEuroYear: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'netSalaryYear') {
        this.setState({ netSalaryEuroYear: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'contributionSalaryYear') {
        this.setState({ contributionSalaryEuroYear: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'grosSalaryMonth') {
        this.setState({ grosSalaryEuroMonth: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'netSalaryMonth') {
        this.setState({ netSalaryEuroMonth: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'contributionSalaryMonth') {
        this.setState({ contributionSalaryEuroMonth: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'extraordinaryExpenses') {
        this.setState({ extraordinaryExpensesEuro: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'extraordinaryObjectives') {
        this.setState({ extraordinaryObjectivesEuro: ev.target.value * changeFactor });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    myCallback = (dataFromChild) => {
      EconomicStaffService.getEconomicStaff().then(result => {
        this.setState({ datas: result.data, openPopUp: dataFromChild });
      });
    };

    myCallback2 = (dataFromChild) => {
      EconomicStaffService.getEconomicStaff().then(result => {
        this.setState({ datas: result.data, openStaff: dataFromChild });
      });
    };

    render() {
      const {
        datas, columns, openPopUp, economicStaff, openStaff, openExtra, openMonth, openYear, openCompanyCost, openCompanyCostMonth,
        yearPayment, grosSalaryYear, netSalaryYear, contributionSalaryYear, companyCostYear,
        grosSalaryEuroYear, netSalaryEuroYear, contributionSalaryEuroYear, companyCostEuroYear,
        monthPayment, grosSalaryMonth, netSalaryMonth, contributionSalaryMonth, companyCostMonth,
        grosSalaryEuroMonth, netSalaryEuroMonth, contributionSalaryEuroMonth, companyCostEuroMonth,
        extraordinaryDate, extraordinaryExpenses, extraordinaryObjectives, extraordinaryExpensesEuro, extraordinaryObjectivesEuro,
        currencies, currencyId, currencyCode
      } = this.state;
      console.log(datas);
      const {
        logedUser
      } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicManagement_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        downloadOptions: { filename: 'Staff economic management.csv' },
        print: exportButton,
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add Economic Staff"
            tooltip="Add New Economic Staff"
            fileName="Staff economic management"
            hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicManagement_create}
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicManagement_export}
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title=" Economic Staff List"
            data={datas}
            columns={columns}
            options={options}
          />
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="body"
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
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={0} />
                <Grid item xs={11}>
                  <EditEconomicStaff Infos={economicStaff} callsbackFromParent={this.myCallback} />
                </Grid>
                <Grid item xs={0} />
              </Grid>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openYear}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> Year Payment </DialogTitle>
            <DialogContent dividers>
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                  fullWidth=""
                  maxWidth=""
                >
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="yearPayment"
                      label="Year Payment Date"
                      name="yearPayment"
                      value={yearPayment}
                      type="date"
                      onChange={this.handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Currency</InputLabel>
                      <Select
                        name="currencyId"
                        value={currencyId}
                        onChange={this.handleChange}
                      >
                        {
                          currencies.map((clt) => (
                            <MenuItem key={clt.currencyId} value={clt.currencyId}>
                              {clt.typeOfCurrency.currencyName}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      id="currencyCode"
                      label="Currency Code"
                      name="currencyCode"
                      value={currencyCode}
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={5}>
                    <TextField
                      id="grosSalaryYear"
                      label="Gross Salary (Year)"
                      name="grosSalaryYear"
                      value={grosSalaryYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="grosSalaryEuroYear"
                      label="Gross Salary (€)"
                      name="grosSalaryEuroYear"
                      value={grosSalaryEuroYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={1} />
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="netSalaryYear"
                      label="Net Salary (Year)"
                      name="netSalaryYear"
                      value={netSalaryYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="netSalaryEuroYear"
                      label="Net Salary (€)"
                      name="netSalaryEuroYear"
                      value={netSalaryEuroYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={1} />
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="contributionSalaryYear"
                      label="Contribution Salary (Year)"
                      name="contributionSalaryYear"
                      value={contributionSalaryYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="contributionSalaryEuroYear"
                      label="Contribution Salary (€)"
                      name="contributionSalaryEuroYear"
                      value={contributionSalaryEuroYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} />
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleCalculCompanyCost}
                    >
                      Company Cost
                    </Button>
                  </Grid>
                  {openCompanyCost === false ? (
                    <div />
                  ) : (
                    <Grid
                      container
                      spacing={2}
                      alignItems="flex-start"
                      direction="row"
                      justify="center"
                    >
                      <Grid item xs={12} md={0} />
                      <Grid item xs={10} md={5}>
                        <TextField
                          id="companyCostYear"
                          label="Company Cost (Year)"
                          name="companyCostYear"
                          value={companyCostYear}
                          type="number"
                          onChange={this.handleChange}
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={10} md={5}>
                        <TextField
                          id="companyCostEuroYear"
                          label="Company Cost (€)"
                          name="companyCostEuroYear"
                          value={companyCostEuroYear}
                          type="number"
                          onChange={this.handleChange}
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleCloseYear}> Cancel </Button>
              <Button variant="contained" color="primary" onClick={this.handleSaveYear}> save </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openMonth}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> Month Payment </DialogTitle>
            <DialogContent dividers>
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                  fullWidth=""
                  maxWidth=""
                >
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="monthPayment"
                      label="Month Payment Date"
                      name="monthPayment"
                      value={monthPayment}
                      type="date"
                      onChange={this.handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Currency</InputLabel>
                      <Select
                        name="currencyId"
                        value={currencyId}
                        onChange={this.handleChange}
                      >
                        {
                          currencies.map((clt) => (
                            <MenuItem key={clt.currencyId} value={clt.currencyId}>
                              {clt.typeOfCurrency.currencyName}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      id="currencyCode"
                      label="Currency Code"
                      name="currencyCode"
                      value={currencyCode}
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={5}>
                    <TextField
                      id="grosSalaryMonth"
                      label="Gross Salary (Month)"
                      name="grosSalaryMonth"
                      value={grosSalaryMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="grosSalaryEuroMonth"
                      label="Gross Salary (€)"
                      name="grosSalaryEuroMonth"
                      value={grosSalaryEuroMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={1} />
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="netSalaryMonth"
                      label="Net Salary (Month)"
                      name="netSalaryMonth"
                      value={netSalaryMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="netSalaryEuroMonth"
                      label="Net Salary (€)"
                      name="netSalaryEuroMonth"
                      value={netSalaryEuroMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={1} />
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="contributionSalaryMonth"
                      label="Contribution Salary (Month)"
                      name="contributionSalaryMonth"
                      value={contributionSalaryMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="contributionSalaryEuroMonth"
                      label="Contribution Salary (€)"
                      name="contributionSalaryEuroMonth"
                      value={contributionSalaryEuroMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} />
                  <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={this.handleCalculCompanyCostMonth}> Company Cost </Button>
                  </Grid>
                  {openCompanyCostMonth === false ? (
                    <div />
                  ) : (
                    <Grid
                      container
                      spacing={2}
                      alignItems="flex-start"
                      direction="row"
                      justify="center"
                    >
                      <Grid item xs={12} md={0} />
                      <Grid item xs={10} md={5}>
                        <TextField
                          id="companyCostMonth"
                          label="Company Cost (Month)"
                          name="companyCostMonth"
                          value={companyCostMonth}
                          type="number"
                          onChange={this.handleChange}
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={10} md={5}>
                        <TextField
                          id="companyCostEuroMonth"
                          label="Company Cost (€)"
                          name="companyCostEuroMonth"
                          value={companyCostEuroMonth}
                          type="number"
                          onChange={this.handleChange}
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleCloseMonth}> Cancel </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSaveMonth}
              >
                save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openExtra}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> Extraordinary Payment </DialogTitle>
            <DialogContent dividers>
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                  fullWidth=""
                  maxWidth=""
                >
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="extraordinaryDate"
                      label="Extraordinary Payment Date"
                      name="extraordinaryDate"
                      value={extraordinaryDate}
                      type="date"
                      fullWidth
                      onChange={this.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Currency</InputLabel>
                      <Select
                        name="currencyId"
                        value={currencyId}
                        onChange={this.handleChange}
                      >
                        {
                          currencies.map((clt) => (
                            <MenuItem key={clt.currencyId} value={clt.currencyId}>
                              {clt.typeOfCurrency.currencyName}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      id="currencyCode"
                      label="Currency Code"
                      name="currencyCode"
                      value={currencyCode}
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={5}>
                    <TextField
                      id="extraordinaryExpenses"
                      label="Extraordinary Expenses"
                      name="extraordinaryExpenses"
                      value={extraordinaryExpenses}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="extraordinaryExpensesEuro"
                      label="Extraordinary Expenses (€)"
                      name="extraordinaryExpensesEuro"
                      value={extraordinaryExpensesEuro}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={1} />
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="extraordinaryObjectives"
                      label="Extraordinary Objectives"
                      name="extraordinaryObjectives"
                      value={extraordinaryObjectives}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="extraordinaryObjectivesEuro"
                      label="Extraordinary Objectives (€)"
                      name="extraordinaryObjectivesEuro"
                      value={extraordinaryObjectivesEuro}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleCloseExtra}> Cancel </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSaveExtra}
              >
                save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openStaff}
            keepMounted
            scroll="body"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> Staff Payment Consult </DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={0} />
                <Grid item xs={11}>
                  <ConsultStaff Infos2={economicStaff} callsbackFromParent2={this.myCallback2} />
                </Grid>
                <Grid item xs={0} />
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
}

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser'),
});
const RetentionBlockMapped = connect(
  mapStateToProps,
  null
)(EconomicStaffBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <RetentionBlockMapped changeTheme={changeTheme} classes={classes} />;
};
