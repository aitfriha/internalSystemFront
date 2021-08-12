import React from 'react';
import {
  Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EconomicStaffService from '../../../Services/EconomicStaffService';
import CurrencyService from '../../../Services/CurrencyService';

class EditEconomicStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      economicStaffId: '',
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
      grosSalary: '',
      netSalary: '',
      contributionSalary: '',
      companyCost: '',
      grosSalaryEuro: '',
      netSalaryEuro: '',
      contributionSalaryEuro: '',
      companyCostEuro: '',
      open: false,
      currencies: [],
      currencyId: '',
      currencyCode: ''
    };
  }

    // eslint-disable-next-line react/sort-comp
    editingPromiseResolve = () => {};

    componentDidMount() {
      CurrencyService.getFilteredCurrency().then(result => {
        this.setState({ currencies: result.data });
      });
    }

    componentWillReceiveProps(props) {
      // eslint-disable-next-line react/prop-types
      const economicStaff = props.Infos;
      console.log(economicStaff);
      if (economicStaff._id) {
        this.setState({
          economicStaffId: economicStaff._id,
          staffId: economicStaff.staff.staffId,
          companyId: economicStaff.financialCompany._id,
          changeFactor: economicStaff.changeFactor,
          company: economicStaff.financialCompany.name,
          employeeNumber: economicStaff.employeeNumber,
          name: economicStaff.staff.firstName,
          fatherName: economicStaff.fatherName,
          motherName: economicStaff.motherName,
          highDate: economicStaff.highDate,
          lowDate: economicStaff.lowDate,
          grosSalary: economicStaff.grosSalary,
          netSalary: economicStaff.netSalary,
          contributionSalary: economicStaff.contributionSalary,
          companyCost: economicStaff.companyCost,
          grosSalaryEuro: economicStaff.grosSalaryEuro,
          netSalaryEuro: economicStaff.netSalaryEuro,
          contributionSalaryEuro: economicStaff.contributionSalaryEuro,
          companyCostEuro: economicStaff.companyCostEuro,
          currencyId: economicStaff.currency._id,
          currencyCode: economicStaff.currency.typeOfCurrency.currencyCode
        });
      }
    }

    handleSubmit = () => {
      const {
        economicStaffId, staffId, highDate, lowDate, changeFactor, employeeNumber, name, fatherName, motherName, companyId, currencyId,
        grosSalary, netSalary, contributionSalary, companyCost, grosSalaryEuro, netSalaryEuro, contributionSalaryEuro, companyCostEuro,
      } = this.state;
      const staff = { staffId };
      const financialCompany = { _id: companyId };
      const currency = { _id: currencyId };
      const EconomicStaff = {
        economicStaffId,
        staff,
        currency,
        financialCompany,
        changeFactor,
        employeeNumber,
        name,
        fatherName,
        motherName,
        highDate,
        lowDate,
        grosSalary,
        netSalary,
        contributionSalary,
        companyCost,
        grosSalaryEuro,
        netSalaryEuro,
        contributionSalaryEuro,
        companyCostEuro
      };
      console.log(EconomicStaff);
      EconomicStaffService.saveEconomicStaff(EconomicStaff).then(result => {
        console.log(result);
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        this.props.callsbackFromParent(false);
      });
    }

    handleChange = (ev) => {
      // eslint-disable-next-line react/destructuring-assignment
      let { changeFactor } = this.state;
      if (ev.target.name === 'currencyId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const {
          netSalary, contributionSalary, grosSalary, companyCost
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
          companyCostEuro: companyCost * changeFactor, grosSalaryEuro: grosSalary * changeFactor, netSalaryEuro: netSalary * changeFactor, contributionSalaryEuro: contributionSalary * changeFactor, changeFactor, currencyCode
        });
      }
      if (ev.target.name === 'netSalary') {
        this.setState({ netSalaryEuro: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'contributionSalary') {
        this.setState({ contributionSalaryEuro: ev.target.value * changeFactor });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleGoBack = () => {
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      this.props.callsbackFromParent(false);
    }

    render() {
      console.log(this.state);
      const {
        name, fatherName, motherName, highDate, lowDate, company, employeeNumber,
        grosSalary, netSalary, contributionSalary, companyCost,
        grosSalaryEuro, netSalaryEuro, contributionSalaryEuro, companyCostEuro,
        currencies, currencyId, currencyCode
      } = this.state;

      return (
        <div>
          <Typography variant="subtitle2" component="h2" color="primary">
                        General Staff Informations
          </Typography>
          <br />
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={12} md={3}>
              <TextField
                id="name"
                label="Employee  "
                name="name"
                value={name}
                onChange={this.handleChange}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="fatherName"
                label="Father Name  "
                name="fatherName"
                value={fatherName}
                onChange={this.handleChange}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="motherName"
                label="Mother Name"
                name="motherName"
                value={motherName}
                onChange={this.handleChange}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="employeeNumber"
                label="Employee Number"
                name="employeeNumber"
                value={employeeNumber}
                type="number"
                onChange={this.handleChange}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="company"
                label="Company"
                name="company"
                value={company}
                onChange={this.handleChange}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="highDate"
                label="High Date"
                name="highDate"
                value={highDate}
                onChange={this.handleChange}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="lowDate"
                label="Low Date"
                name="lowDate"
                value={lowDate}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
                        Economic Management
          </Typography>
          <br />
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={12} md={3} />
            <Grid item xs={6} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Select Currency</InputLabel>
                <Select
                  name="currencyId"
                  value={currencyId}
                  required
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
            <Grid item xs={12} md={3} />
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={5}>
              <TextField
                id="grosSalary"
                label="Gross Salary"
                name="grosSalary"
                value={grosSalary}
                type="number"
                onChange={this.handleChange}
                fullWidth
                disabled="true"
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="grosSalaryEuro"
                label="Gross Salary (€)"
                name="grosSalaryEuro"
                value={grosSalaryEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                disabled="true"
              />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={1} />
            <Grid item xs={10} md={5}>
              <TextField
                id="netSalary"
                label="Net Salary"
                name="netSalary"
                value={netSalary}
                type="number"
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="netSalaryEuro"
                label="Net Salary (€)"
                name="netSalaryEuro"
                value={netSalaryEuro}
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
                id="contributionSalary"
                label="Contribution Salary"
                name="contributionSalary"
                value={contributionSalary}
                type="number"
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="contributionSalaryEuro"
                label="Contribution Salary (€)"
                name="contributionSalaryEuro"
                value={contributionSalaryEuro}
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
                id="companyCost"
                label="Company Cost"
                name="companyCost"
                value={companyCost}
                type="number"
                onChange={this.handleChange}
                fullWidth
                disabled="true"
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="companyCostEuro"
                label="Company Cost (€)"
                name="companyCostEuro"
                value={companyCostEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                disabled="true"
              />
            </Grid>
          </Grid>
          <div align="center">
            <br />
            <br />
            <Button size="small" color="inherit" onClick={this.handleGoBack}>Cancel</Button>
            <Button variant="contained" color="primary" type="button" onClick={this.handleSubmit}>
                            Save
            </Button>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  staff: state.getIn(['staffs']).selectedStaff,
  allStaff: state.getIn(['staffs']).allStaff,
  staffResponse: state.getIn(['staffs']).staffResponse,
  isLoadingStaff: state.getIn(['staffs']).isLoading,
  errorStaff: state.getIn(['staffs']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEconomicStaff);
