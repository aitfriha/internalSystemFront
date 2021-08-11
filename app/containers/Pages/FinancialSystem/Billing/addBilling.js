import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../../../utils/history';
import CurrencyService from '../../../Services/CurrencyService';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import CommercialOperationService from '../../../Services/CommercialOperationService';
import ClientService from '../../../Services/ClientService';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import IvaService from '../../../Services/IvaService';
import ContractService from '../../../Services/ContractService';
import BillService from '../../../Services/BillService';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles();

class AddBilling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      invoiceDate: '',
      contractor: '',
      clientId: '',
      clients: [],
      companies: [],
      operations: [],
      commercialOperations: [],
      currencies: [],
      ivaStates: [],
      contracts: [],
      clientContracts: [],
      ivas: [],
      ivasCountries: [],
      financialContractId: '',
      clientContractSigned: '',
      commercialOperationId: '',
      purchaseOrderNumber: '',
      factor: 0,
      totalEuro: 0,
      totalLocal: 0,
      ivaCountry: '',
      ivaState: '',
      valueIVALocal: 0,
      valueIVAEuro: 0,
      totalAmountEuro: 0,
      totalAmountLocal: 0,
      localCurrency: '',
      nbrConcepts: ['1'],
      items: [],
      desc: [],
      descTotalUSD: [],
      reelPaymentDay: '',
      paymentDone: false
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCountry } = this.props;
    getAllCountry();
    // services calls
    CurrencyService.getFilteredCurrency().then(result => {
      this.setState({ currencies: result.data });
    });
    FinancialCompanyService.getCompany().then(result => {
      this.setState({ companies: result.data });
    });
    CommercialOperationService.getCommercialOperation().then(result => {
      this.setState({ operations: result.data.payload });
    });
    ClientService.getClients().then(result => {
      this.setState({ clients: result.data.payload });
    });
    IvaService.getIva().then(result => {
      this.setState({ ivas: result.data });
    });
    IvaService.getIvaCountries().then(result => {
      console.log(result.data);
      this.setState({ ivasCountries: result.data });
    });
    ContractService.getContract().then(result => {
      this.setState({ contracts: result.data });
    });
  }

  handleChangeCountry = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllStateByCountry } = this.props;
    getAllStateByCountry(value.countryId);
  };

  handleChangeState = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCityByState } = this.props;
    getAllCityByState(value.stateCountryId);
  };

  handleChangeCity = (ev, value) => {
    this.setState({ currentCity: value.cityId });
  };

    handleChange = (ev) => {
      if (ev.target.name === 'clientId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const commercialOperations = this.state.operations.filter(row => row.client._id === ev.target.value); const clientContracts = this.state.contracts.filter(row => row.client._id === ev.target.value);
        this.setState({ commercialOperations, clientContracts });
      }
      if (ev.target.name === 'reelPaymentDay') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        this.setState({ paymentDone: true });
      }
      if (ev.target.name === 'ivaState') {
        const id = ev.target.value;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const local = this.state.totalLocal; const { factor } = this.state;
        let iva = 0;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.ivas.map(row => {
          if (row.ivaId === id) iva = row.value;
        });
        this.setState({
          valueIVALocal: (iva * local) / 100, valueIVAEuro: ((iva * local) / 100) * factor, totalAmountLocal: local - ((iva * local) / 100), totalAmountEuro: (local - ((iva * local) / 100)) * factor
        });
      }
      if (ev.target.name === 'ivaCountry') {
        const country = ev.target.value;
        console.log(country);
        IvaService.getIvaStates(country).then(result => {
          console.log(result.data);
          this.setState({ ivaStates: result.data });
        });
      }
      if (ev.target.name === 'localCurrency') {
        const id = ev.target.value;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const local = this.state.totalLocal;
        let factor = 0;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.currencies.map(row => {
          if (row.currencyId === id) factor = row.changeFactor;
        });
        this.setState({ totalEuro: factor * local, factor });
      }
      if (ev.target.name === 'purchaseOrderNumber') {
        let id;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.contracts.map(rows => {
          // eslint-disable-next-line array-callback-return
          rows.purchaseOrderNumber.map((row) => {
            if (row === ev.target.value) id = rows.financialContractId;
          });
        });
        this.setState({ financialContractId: id });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleConcept = (event, row) => {
      let totalUSD = 0;
      if (event.target.name === 'desc') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.desc;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ desc: tab });
      }
      if (event.target.name === 'descTotalUSD') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.descTotalUSD; tab[0] = 0;
        tab[row] = event.target.value;
        // eslint-disable-next-line array-callback-return,no-shadow
        tab.map(row => { totalUSD += Number(row); });
        this.setState({ descTotalUSD: tab, totalLocal: totalUSD });
      }
    }

    handleCreate = () => {
      const {
        code, invoiceDate, contractor, financialContractId, reelPaymentDay, nbrConcepts, contracts,
        clientId, commercialOperationId, clientContractSigned, purchaseOrderNumber, paymentDone,
        totalEuro, totalLocal, ivaState, valueIVALocal, valueIVAEuro, totalAmountEuro, totalAmountLocal, localCurrency, desc, descTotalUSD
      } = this.state;
      const id = clientId;
      const client = { _id: id };
      const commercialOperation = { _id: commercialOperationId };
      const financialCompany = { _id: contractor };
      const currency = { _id: localCurrency };
      const iva = { _id: ivaState };
      const financialContract = { _id: financialContractId };
      const clientSigned = { _id: clientContractSigned };
      const delaiDay = 20;
      let paymentsBDDay = 0;
      // eslint-disable-next-line array-callback-return
      contracts.map(contract => {
        if (contract.financialContractId === financialContractId) paymentsBDDay = contract.paymentsBDDays;
      });
      const paymentDate = new Date(invoiceDate);
      paymentDate.setDate(paymentDate.getDate() + paymentsBDDay);
      const reelPaymentDate = new Date(reelPaymentDay);
      const difference = reelPaymentDate.getTime() - paymentDate.getTime();
      const reelPaymentDays = Math.ceil(difference / (1000 * 3600 * 24));
      const delayDate = new Date(paymentDate);
      delayDate.setDate(delayDate.getDate() + delaiDay);
      const registerDate = new Date();
      const Bill = {
        client,
        clientSigned,
        commercialOperation,
        financialCompany,
        currency,
        iva,
        financialContract,
        code,
        invoiceDate,
        purchaseOrderNumber,
        paymentsBDDay,
        paymentDate,
        reelPaymentDay,
        reelPaymentDays,
        registerDate,
        paymentDone,
        delayDate,
        totalEuro,
        totalLocal,
        valueIVALocal,
        valueIVAEuro,
        totalAmountEuro,
        totalAmountLocal,
        nbrConcepts,
        desc,
        descTotalUSD
      };
      console.log(Bill);
      BillService.saveBill(Bill).then(result => {
        console.log(result.data);
        history.push('/app/gestion-financial/Billing');
      });
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Billing');
    }

    handleOpenConcept = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newElement = this.state.nbrConcepts.length + 1;
      // eslint-disable-next-line react/destructuring-assignment
      this.state.nbrConcepts.push(newElement);
      this.setState({ openDoc: true });
    }

    handleDeleteConcept = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
      if (this.state.nbrConcepts.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs = this.state.nbrConcepts.filter(rows => rows !== row);
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs2 = this.state.desc.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs3 = this.state.descTotalUSD.filter((e, i) => i !== (row));
        this.setState({ nbrConcepts: newDocs, desc: newDocs2, descTotalUSD: newDocs3 });
      }
    }

    render() {
      console.log(this.state);
      const codeBill = [
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        }];
      const {
        code, invoiceDate, contractor, clients, companies, commercialOperations, currencies, ivasCountries, ivaStates, clientContracts,
        clientId, commercialOperationId, clientContractSigned, purchaseOrderNumber, nbrConcepts, paymentDone, reelPaymentDay,
        totalEuro, totalLocal, ivaCountry, ivaState, valueIVALocal, valueIVAEuro, totalAmountEuro, totalAmountLocal, localCurrency, desc, descTotalUSD
      } = this.state;
      const title = brand.name + ' - Add New Bill';
      const description = brand.desc;
      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Helmet>
          <PapperBlock title="Billing" desc="Create new bill" icon="ios-add-circle-outline">
            <Grid container spacing={1}>
              <Grid item xs={11} />
              <Grid item xs={1}>
                <Tooltip title="Back to List">
                  <IconButton onClick={() => this.handleGoBack()}>
                    <KeyboardBackspaceIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Typography variant="subtitle2" component="h2" color="primary">
                       General Bill Informations
            </Typography>
            <br />
            <div>
              <div align="center">
                <Grid item xs={12} sm={8} md={8} alignItems="flex-start" align="center" />
              </div>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
                justify="space-around"
              >
                <Grid item xs={12} md={3} sm={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Code</InputLabel>
                    <Select
                      name="code"
                      value={code}
                      onChange={this.handleChange}
                    >
                      {
                        codeBill.map((clt) => (
                          <MenuItem key={clt.value} value={clt.value}>
                            {clt.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} sm={3}>
                  <TextField
                    id="invoiceDate"
                    label="Invoice Date"
                    name="invoiceDate"
                    value={invoiceDate}
                    type="date"
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Contractor</InputLabel>
                    <Select
                      name="contractor"
                      value={contractor}
                      onChange={this.handleChange}
                    >
                      {
                        companies.map((clt) => (
                          <MenuItem key={clt.financialCompanyId} value={clt.financialCompanyId}>
                            {clt.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
                        Client Informations
            </Typography>
            <br />
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={12} md={5} sm={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Client </InputLabel>
                  <Select
                    name="clientId"
                    value={clientId}
                    onChange={this.handleChange}
                  >
                    {
                      clients.map((type) => (
                        <MenuItem key={type.clientId} value={type.clientId}>
                          {type.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sm={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Commercial Operation</InputLabel>
                  <Select
                    name="commercialOperationId"
                    value={commercialOperationId}
                    onChange={this.handleChange}
                  >
                    {
                      commercialOperations.map((type) => (
                        <MenuItem key={type.commercialOperationId} value={type.commercialOperationId}>
                          {type.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sm={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Contract Signed Client</InputLabel>
                  <Select
                    name="clientContractSigned"
                    value={clientContractSigned}
                    onChange={this.handleChange}
                  >
                    {
                      clients.map((type) => (
                        <MenuItem key={type.clientId} value={type.clientId}>
                          {type.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sm={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Purchase Order Number</InputLabel>
                  <Select
                    name="purchaseOrderNumber"
                    value={purchaseOrderNumber}
                    onChange={this.handleChange}
                  >
                    {
                      clientContracts.map((type) => (
                        type.purchaseOrderNumber.filter(rowi => rowi !== '0').map((row) => (
                          <MenuItem key={type.financialContractId} value={row}>
                            {row}
                          </MenuItem>
                        ))
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
                        Concepts Of The Invoice
            </Typography>
            <br />
            {nbrConcepts.map((row) => (
              <Grid
                container
                spacing={4}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={0} />
                <Grid item xs={1} align="center">
                  <Typography variant="subtitle2" component="h3" color="grey">
                    <br />
                    Item
                    {' '}
                    { row }
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="desc"
                    label="Description"
                    name="desc"
                    value={desc[row]}
                    multiline
                    rows={1}
                    onChange={event => this.handleConcept(event, row)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="descTotalUSD"
                    label="Amount in Currency"
                    name="descTotalUSD"
                    value={descTotalUSD[row]}
                    type="number"
                    onChange={event => this.handleConcept(event, row)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={1}>
                  <br />
                  <IconButton size="medium" color="primary" onClick={() => this.handleOpenConcept()}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => this.handleDeleteConcept(row)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
                        Economic Value Of The Bill
            </Typography>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item md={0} />
              <Grid item xs={12} md={6}>
                <br />
                <Typography variant="subtitle2" component="h2" color="primary">
                        Total Amount Net
                </Typography>
              </Grid>
              <Grid item md={3} />
              <Grid item xs={12} md={4} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Select Local Currency </InputLabel>
                  <Select
                    name="localCurrency"
                    value={localCurrency}
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
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                  id="totalLocal"
                  label="Total in Local Currency"
                  name="totalLocal"
                  value={totalLocal}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                  id="totalEuro"
                  label="Total in EURO"
                  name="totalEuro"
                  value={totalEuro}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={0} />
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" component="h2" color="primary">
                    I.V.A Taxes
                </Typography>
              </Grid>
              <Grid item md={3} />
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select I.V.A Country</InputLabel>
                  <Select
                    name="ivaCountry"
                    value={ivaCountry}
                    onChange={this.handleChange}
                  >
                    {
                      ivasCountries.map((clt) => (
                        <MenuItem key={clt} value={clt}>
                          {clt}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select State</InputLabel>
                  <Select
                    name="ivaState"
                    value={ivaState}
                    onChange={this.handleChange}
                  >
                    {
                      ivaStates.map((clt) => (
                        <MenuItem key={clt.ivaId} value={clt.ivaId}>
                          {clt.stateCountry.stateName}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="totalIVALocal"
                  label="I.V.A Value in Local Currency"
                  name="totalIVALocal"
                  value={valueIVALocal}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="totalIVAEuro"
                  label="I.V.A Value in EURO"
                  name="totalIVAEuro"
                  value={valueIVAEuro}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={0} />
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" component="h2" color="primary">
                        Total Amount
                </Typography>
              </Grid>
              <Grid item md={3} />
              <Grid item xs={12} md={5} sm={5}>
                <TextField
                  id="totalAmountLocal"
                  label="Total Amount in Local Currency"
                  name="totalAmountLocal"
                  value={totalAmountLocal}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5} sm={5}>
                <TextField
                  id="totalAmountEuro"
                  label="Total Amount in EURO"
                  name="totalAmountEuro"
                  value={totalAmountEuro}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
                Payment Management
            </Typography>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={4}>
                <TextField
                  id="reelPaymentDay"
                  label="Reel Payment Date"
                  name="reelPaymentDay"
                  value={reelPaymentDay}
                  type="date"
                  onChange={this.handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <br />
                <FormControlLabel
                  id="paymentDone"
                  name="paymentDone"
                  value={paymentDone}
                  control={<Checkbox color="primary" checked={paymentDone} />}
                  label="payment Done"
                  labelPlacement="end"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <div align="center">
              <Button size="small" color="inherit" onClick={this.handleGoBack}>Cancel</Button>
              <Button variant="contained" color="primary" type="button" onClick={this.handleCreate}>
                            Save
              </Button>
            </div>
          </PapperBlock>
        </div>
      );
    }
}
const mapStateToProps = state => ({
  allCountrys: state.getIn(['countries']).allCountrys,
  countryResponse: state.getIn(['countries']).countryResponse,
  isLoading: state.getIn(['countries']).isLoading,
  errors: state.getIn(['countries']).errors,
  // state
  allStateCountrys: state.getIn(['stateCountries']).allStateCountrys,
  stateCountryResponse: state.getIn(['stateCountries']).stateCountryResponse,
  isLoadingState: state.getIn(['stateCountries']).isLoading,
  errorsState: state.getIn(['stateCountries']).errors,
  // city
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoadingCity: state.getIn(['cities']).isLoading,
  errorsCity: state.getIn(['cities']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCountry,
  getAllStateByCountry,
  getAllCityByState
}, dispatch);

const AddBillingMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBilling);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddBillingMapped changeTheme={changeTheme} classes={classes} />;
};
