import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../../../utils/history';
import PurchaseOrderService from '../../../Services/PurchaseOrderService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import CurrencyService from '../../../Services/CurrencyService';
import IvaService from '../../../Services/IvaService';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import ClientService from '../../../Services/ClientService';
import ContractService from '../../../Services/ContractService';

const useStyles = makeStyles();

class AddPurchaseOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDataEmit: '',
      companyLogo: '',
      internLogo: '',
      companyNIF: '',
      companyAddress: '',
      receptionSupplierExternal: '',
      receptionSupplierInternal: '',
      receptionSupplierType: '',
      supplierNIF: '',
      supplierResponsible: '',
      supplierAddress: '',
      supplierContractCode: '',
      externalSuppliers: [],
      companies: [],
      currencies: [],
      ivasCountries: [],
      ivaStates: [],
      ivaState: '',
      clients: [],
      clientId: '',
      contracts: [],
      contractsClient: [],
      contractId: '',
      nbrConcepts: ['1'],
      termsListe: ['1'],
      itemNames: [],
      description: [],
      unityValue: [],
      unity: [],
      valor: [0],
      unityNumber: [],
      givingDate: [],
      paymentDate: [],
      billingDate: [],
      termTitle: [],
      termDescription: [],
      totalEuro: 0,
      totalLocal: 0,
      valueIVAEuro: 0,
      valueIVALocal: 0,
      totalAmountEuro: 0,
      totalAmountLocal: 0,
      factor: 0,
      ivaRetentions: '',
      totalAmountRetentions: '',
      totalIvaRetention: '',
      paymentMethod: '',
      localCurrency: '',
      typeClient: '',
      poClient: false,
      contractClient: false,
    };
  }

  componentDidMount() {
    FinancialCompanyService.getCompany().then(result => {
      this.setState({ companies: result.data });
    });
    ExternalSuppliersService.getExternalSuppliers().then(result => {
      this.setState({ externalSuppliers: result.data });
    });
    CurrencyService.getFilteredCurrency().then(result => {
      this.setState({ currencies: result.data });
    });
    IvaService.getIvaCountries().then(result => {
      console.log(result.data);
      this.setState({ ivasCountries: result.data });
    });
    ClientService.getClients().then(result => {
      this.setState({ clients: result.data.payload });
    });
    ContractService.getContract().then(result => {
      // eslint-disable-next-line array-callback-return
      this.setState({ contracts: result.data, contractsClient: result.data });
      console.log(this.state);
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    handleSubmit = () => {
      const {
        companyDataEmit, companyLogo, companyNIF, companyAddress,
        receptionSupplierType, receptionSupplierExternal, receptionSupplierInternal, supplierNIF, supplierResponsible, supplierAddress, internLogo,
        nbrConcepts, unityValue, description, itemNames, unity, valor, unityNumber, givingDate, paymentDate, billingDate,
        termsListe, termDescription, termTitle, factor,
        paymentMethod, ivaRetentions, totalAmountRetentions, totalIvaRetention,
        localCurrency, totalLocal, totalEuro, ivaState, valueIVALocal, valueIVAEuro, totalAmountLocal, totalAmountEuro,
        typeClient, clientId, contractId
      } = this.state;
      const companyEmit = { _id: companyDataEmit };
      const externalSupplierReception = { _id: receptionSupplierExternal };
      const internalSupplierReception = { _id: receptionSupplierInternal };
      const currency = { _id: localCurrency };
      const client = { _id: clientId };
      const iva = { _id: ivaState };
      let financialContract = { _id: '' };
      if (typeClient === 'contract') financialContract = { _id: contractId };
      const PurchaseOrder = {
        client,
        typeClient,
        financialContract,
        iva,
        currency,
        factor,
        companyEmit,
        companyLogo,
        companyNIF,
        companyAddress,
        receptionSupplierType,
        externalSupplierReception,
        internalSupplierReception,
        internLogo,
        supplierNIF,
        supplierResponsible,
        supplierAddress,
        termDescription,
        termTitle,
        termsListe,
        totalEuro,
        totalLocal,
        valueIVAEuro,
        valueIVALocal,
        totalAmountEuro,
        totalAmountLocal,
        nbrConcepts,
        itemNames,
        description,
        unity,
        unityNumber,
        unityValue,
        valor,
        paymentDate,
        givingDate,
        billingDate,
        ivaRetentions,
        totalAmountRetentions,
        totalIvaRetention,
        paymentMethod,
      };
      PurchaseOrderService.savePurchaseOrder(PurchaseOrder).then(result => {
        console.log(result);
        history.push('/app/gestion-financial/Purchase-Order Management');
      });
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Purchase-Order Management');
    }

    handleChange = (ev) => {
      if (ev.target.name === 'companyDataEmit') {
        // eslint-disable-next-line array-callback-return,react/destructuring-assignment
        this.state.companies.map(row => {
          if (row.financialCompanyId === ev.target.value) {
            this.setState({
              companyLogo: row.logo,
              companyNIF: row.taxNumber,
              companyAddress: row.address.fullAddress.concat(' ' + row.address.city.cityName).concat(' ' + row.address.city.stateCountry.country.countryName)
            });
          }
        });
      }
      if (ev.target.name === 'receptionSupplierExternal') {
        // eslint-disable-next-line array-callback-return,react/destructuring-assignment
        this.state.externalSuppliers.map(row => {
          if (row.externalSupplierId === ev.target.value) {
            this.setState({
              receptionSupplierInternal: '',
              supplierResponsible: row.firstName.concat(' ' + row.fatherFamilyName.concat(' ' + row.motherFamilyName)),
              supplierNIF: row.taxNumber,
              internLogo: '',
              supplierAddress: row.address.fullAddress.concat(' ' + row.address.city.cityName).concat(' ' + row.address.city.stateCountry.country.countryName)
            });
          }
        });
      }
      if (ev.target.name === 'receptionSupplierInternal') {
        // eslint-disable-next-line array-callback-return,react/destructuring-assignment
        this.state.companies.map(row => {
          if (row.financialCompanyId === ev.target.value) {
            this.setState({
              receptionSupplierExternal: '',
              supplierResponsible: '',
              internLogo: row.logo,
              supplierNIF: row.taxNumber,
              supplierAddress: row.address.fullAddress.concat(' ' + row.address.city.cityName).concat(' ' + row.address.city.stateCountry.country.countryName)
            });
          }
        });
      }
      if (ev.target.name === 'ivaState') {
        const id = ev.target.value;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const local = this.state.totalLocal; const { factor } = this.state;
        let iva = 0;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.ivaStates.map(row => {
          if (row.ivaId === id) iva = row.value;
        });
        this.setState({
          valueIVALocal: (iva * local) / 100, valueIVAEuro: ((iva * local) / 100) * factor, totalAmountLocal: local + ((iva * local) / 100), totalAmountEuro: (local + ((iva * local) / 100)) * factor
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
      if (ev.target.name === 'ivaCountry') {
        const country = ev.target.value;
        console.log(country);
        IvaService.getIvaStates(country).then(result => {
          console.log(result.data);
          this.setState({ ivaStates: result.data });
        });
      }
      if (ev.target.name === 'typeClient') {
        if (ev.target.value === 'contract') this.setState({ contractClient: true, poClient: false });
        else this.setState({ poClient: true, contractClient: false });
      }
      if (ev.target.name === 'clientId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab2 = this.state.contracts;
        const tabClient = tab2.filter((row) => (row.client._id === ev.target.value));
        this.setState({ contractsClient: tabClient });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

  handleConcept = (event, row) => {
    let total = 0;
    if (event.target.name === 'description') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.description;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ description: tab });
    }
    if (event.target.name === 'itemNames') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.itemNames;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ itemNames: tab });
    }
    if (event.target.name === 'unity') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.unity;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ unity: tab });
    }
    if (event.target.name === 'unityNumber') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.unityNumber; const value = this.state.unityValue; const val = this.state.valor;
      tab[0] = 0;
      tab[row] = event.target.value;
      val[row] = event.target.value * value[row];
      // eslint-disable-next-line array-callback-return,no-shadow
      val.map(row => { total += row; });
      this.setState({ unityNumber: tab, valor: val, totalLocal: total });
    }
    if (event.target.name === 'givingDate') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.givingDate;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ givingDate: tab });
    }
    if (event.target.name === 'paymentDate') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.paymentDate;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ paymentDate: tab });
    }
    if (event.target.name === 'billingDate') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.billingDate;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ billingDate: tab });
    }
    if (event.target.name === 'unityValue') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.unityValue;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ unityValue: tab });
    }
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
        const newDocs2 = this.state.description.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs3 = this.state.unityValue.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs4 = this.state.itemNames.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs5 = this.state.unity.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs6 = this.state.unityNumber.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs7 = this.state.givingDate.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs8 = this.state.paymentDate.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs9 = this.state.billingDate.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs10 = this.state.valor.filter((e, i) => i !== (row));
        this.setState({
          nbrConcepts: newDocs,
          description: newDocs2,
          unityValue: newDocs3,
          itemNames: newDocs4,
          unity: newDocs5,
          unityNumber: newDocs6,
          givingDate: newDocs7,
          paymentDate: newDocs8,
          billingDate: newDocs9,
          valor: newDocs10
        });
      }
    }

    handleTerms = (event, row) => {
      if (event.target.name === 'termTitle') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.termTitle;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ termTitle: tab });
      }
      if (event.target.name === 'termDescription') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.termDescription;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ termDescription: tab });
      }
    }

    handleAddTerms = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newElement = this.state.termsListe.length + 1;
      // eslint-disable-next-line react/destructuring-assignment
      this.state.termsListe.push(newElement);
      this.setState({ openDoc: true });
    }

    handleDeleteTerms = (row) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.termsListe.length > 1) {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs = this.state.termsListe.filter(rows => rows !== row);
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs2 = this.state.termTitle.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs3 = this.state.termDescription.filter((e, i) => i !== (row));
        this.setState({
          termsListe: newDocs, termTitle: newDocs2, termDescription: newDocs3
        });
      }
    }

    render() {
      console.log(this.state);
      // eslint-disable-next-line react/prop-types
      const { classes } = this.props;
      const title = brand.name + ' - Add New Purchase Order';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        companyDataEmit, companyLogo, companyNIF, companyAddress, receptionSupplierType,
        receptionSupplierExternal, receptionSupplierInternal, supplierNIF, supplierResponsible, supplierAddress,
        externalSuppliers, companies, currencies, ivasCountries, internLogo,
        nbrConcepts, unityValue, description, itemNames, unity, valor, unityNumber, givingDate, paymentDate, billingDate,
        termsListe, termDescription, termTitle,
        paymentMethod, ivaStates, ivaRetentions, totalAmountRetentions, totalIvaRetention,
        localCurrency, totalLocal, totalEuro, ivaCountry, ivaState, valueIVALocal, valueIVAEuro, totalAmountLocal, totalAmountEuro,
        contractClient, poClient, typeClient, clients, clientId, contractsClient, contractId
      } = this.state;
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
          <PapperBlock
            title="Add Purchase Order "
            desc="Please, Fill in the fields"
            icon="ios-add-circle"
          >
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
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
              ►   Client Informations
            </Typography>
            <br />
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={7} sm={7}>
                <FormControl component="fieldset">
                  <FormLabel component="legend"> ● Client Type</FormLabel>
                  <RadioGroup row aria-label="position" name="typeClient" value={typeClient} onChange={this.handleChange}>
                    <FormControlLabel
                      value="contract"
                      control={<Radio color="primary" />}
                      label="Contract Client"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="po"
                      control={<Radio color="primary" />}
                      label="Purchase Order Client"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                {contractClient ? (
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                    justify="center"
                  >
                    <Grid item xs={12} md={5}>
                      <FormControl fullWidth required>
                        <InputLabel>Select the client</InputLabel>
                        <Select
                          name="clientId"
                          value={clientId}
                          onChange={this.handleChange}
                        >
                          {
                            clients.map((clt) => (
                              <MenuItem key={clt.clientId} value={clt.clientId}>
                                {clt.name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Select the Contract</InputLabel>
                        <Select
                          name="contractId"
                          value={contractId}
                          onChange={this.handleChange}
                        >
                          {
                            contractsClient.map((clt) => (
                              <MenuItem key={clt.financialContractId} value={clt.financialContractId}>
                                {clt.contractTitle}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ) : (<div />)}
                {poClient ? (
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                    justify="center"
                  >
                    <Grid item xs={12} md={7}>
                      <FormControl fullWidth required>
                        <InputLabel>Select the client</InputLabel>
                        <Select
                          name="clientId"
                          value={clientId}
                          onChange={this.handleChange}
                        >
                          {
                            clients.map((clt) => (
                              <MenuItem key={clt.clientId} value={clt.clientId}>
                                {clt.name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ) : (<div />)}
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
              ►   General Purchase Order Informations
            </Typography>
            <br />
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel> Company Data Emit</InputLabel>
                  <Select
                    name="companyDataEmit"
                    value={companyDataEmit}
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
              <Grid item xs={12} md={2} sm={3}>
                <TextField
                  id="companyNIF"
                  label="Company NIF"
                  name="companyNIF"
                  value={companyNIF}
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="companyAddress"
                  label="Address"
                  name="companyAddress"
                  value={companyAddress}
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={1} sm={3}>
                {
                  companyLogo ? (
                    <Avatar alt="Company Logo" src={companyLogo} className={classes.large} />
                  ) : (<div />)
                }
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Reception Supplier Type</FormLabel>
                  <RadioGroup row aria-label="position" name="receptionSupplierType" value={receptionSupplierType} onChange={this.handleChange}>
                    <FormControlLabel
                      value="external"
                      control={<Radio color="primary" />}
                      label="External"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="internal"
                      control={<Radio color="primary" />}
                      label="Internal"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {
                receptionSupplierType === 'external' ? (
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3} sm={3}>
                      <FormControl fullWidth required>
                        <InputLabel> Reception Supplier Data </InputLabel>
                        <Select
                          name="receptionSupplierExternal"
                          value={receptionSupplierExternal}
                          onChange={this.handleChange}
                        >
                          {
                            externalSuppliers.map((clt) => (
                              <MenuItem key={clt.externalSupplierId} value={clt.externalSupplierId}>
                                {clt.companyName}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} sm={3}>
                      <TextField
                        id="supplierNIF"
                        label="Supplier NIF"
                        name="supplierNIF"
                        value={supplierNIF}
                        onChange={this.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={3}>
                      <TextField
                        id="supplierAddress"
                        label="Address"
                        name="supplierAddress"
                        value={supplierAddress}
                        onChange={this.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={3}>
                      <TextField
                        id="supplierResponsible"
                        label="Supplier's Responsible"
                        name="supplierResponsible"
                        value={supplierResponsible}
                        onChange={this.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : (<div />)
              }
              {
                receptionSupplierType === 'internal' ? (
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3} sm={3}>
                      <FormControl fullWidth required>
                        <InputLabel> Reception Supplier Data </InputLabel>
                        <Select
                          name="receptionSupplierInternal"
                          value={receptionSupplierInternal}
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
                    <Grid item xs={12} md={2} sm={3}>
                      <TextField
                        id="supplierNIF"
                        label="Supplier NIF"
                        name="supplierNIF"
                        value={supplierNIF}
                        onChange={this.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={3}>
                      <TextField
                        id="supplierAddress"
                        label="Address"
                        name="supplierAddress"
                        value={supplierAddress}
                        onChange={this.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={3}>
                      {
                        internLogo ? (
                          <Avatar alt="Company Logo" src={internLogo} className={classes.large} />
                        ) : (<div />)
                      }
                    </Grid>
                  </Grid>
                ) : (<div />)
              }
            </Grid>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
              ►   Concepts
            </Typography>
            <br />
            {nbrConcepts.map((row) => (
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={1} align="center">
                  <Typography variant="subtitle2" component="h3" color="grey">
                    <br />
                      Item
                    {' '}
                    { row }
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="itemNames"
                    label="Concept Name"
                    name="itemNames"
                    value={itemNames[row]}
                    multiline
                    rows={1}
                    onChange={event => this.handleConcept(event, row)}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="description"
                    label="Description"
                    name="description"
                    value={description[row]}
                    multiline
                    rows={1}
                    onChange={event => this.handleConcept(event, row)}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="unityValue"
                    label="Unity Value"
                    name="unityValue"
                    value={unityValue[row]}
                    type="number"
                    onChange={event => this.handleConcept(event, row)}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    id="unity"
                    label="Unity"
                    name="unity"
                    value={unity[row]}
                    onChange={event => this.handleConcept(event, row)}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    id="unityNumber"
                    label="N° of Unity"
                    name="unityNumber"
                    value={unityNumber[row]}
                    onChange={event => this.handleConcept(event, row)}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="valor"
                    label="Value"
                    name="valor"
                    value={valor[row]}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} md={3}>
                  <TextField
                    id="givingDate"
                    label="Giving Date"
                    name="givingDate"
                    value={givingDate[row]}
                    type="date"
                    onChange={event => this.handleConcept(event, row)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="billingDate"
                    label="Billing Date"
                    name="billingDate"
                    value={billingDate[row]}
                    type="date"
                    onChange={event => this.handleConcept(event, row)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="paymentDate"
                    label="Payment  Date"
                    name="paymentDate"
                    value={paymentDate[row]}
                    type="date"
                    onChange={event => this.handleConcept(event, row)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid xs={1}>
                  <br />
                  <IconButton size="small" color="primary" onClick={() => this.handleOpenConcept()}>
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
              ►   Economic Value
            </Typography>
            <br />
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
                  ● Total Amount Net
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={0} />
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" component="h2" color="primary">
                  ● I.V.A Taxes
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={0} />
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" component="h2" color="primary">
                  ● Total Amount
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
              ►   I.V.A Retentions
            </Typography>
            <br />
            <Grid
              container
              spacing={6}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={12} md={3}>
                <TextField
                  id="ivaRetentions"
                  label="I.V.A Retentions %"
                  name="ivaRetentions"
                  value={ivaRetentions}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="totalAmountRetentions"
                  label="Total Amount Retentions %"
                  name="totalAmountRetentions"
                  value={totalAmountRetentions}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="totalIvaRetention"
                  label="Total Retentions + I.V.A %"
                  name="totalIvaRetention"
                  value={totalIvaRetention}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid />
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                justify="space-around"
              >
                <Grid item xs={4}>
                  <TextField
                    id="paymentMethod"
                    label="Method of Payment"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
              ►   Terms And Conditions
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} />
              {
                termsListe.map((row) => (
                  <Grid container spacing={2}>
                    <Grid item xs={2} />
                    <Grid item xs={3}>
                      <TextField
                        label="Term Title"
                        name="termTitle"
                        value={termTitle[row]}
                        onChange={event => this.handleTerms(event, row)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Term Description"
                        name="termDescription"
                        value={termDescription[row]}
                        onChange={event => this.handleTerms(event, row)}
                        fullWidth
                        multiline
                        required
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <br />
                      <IconButton size="small" color="primary" onClick={() => this.handleAddTerms()}>
                        <AddIcon />
                      </IconButton>
                      <IconButton size="small" color="primary" onClick={() => this.handleDeleteTerms(row)}>
                        <DeleteIcon />
                      </IconButton>
                      <br />
                      <br />
                    </Grid>
                  </Grid>
                ))
              }
            </Grid>
            <br />
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid
                item
                xs={12}
                md={6}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  size="small"
                  color="inherit"
                  onClick={this.handleGoBack}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={this.handleSubmit}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </PapperBlock>
        </div>
      );
    }
}

const AddPurchaseOrderMapped = connect(
)(AddPurchaseOrder);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddPurchaseOrderMapped changeTheme={changeTheme} classes={classes} />;
};
