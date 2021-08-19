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
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../../../utils/history';
import CurrencyService from '../../../Services/CurrencyService';
import ContractStatusService from '../../../Services/ContractStatusService';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import CommercialOperationService from '../../../Services/CommercialOperationService';
import ClientService from '../../../Services/ClientService';
import FunctionalStructureService from '../../../Services/FunctionalStructureService';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import { addClientCommercial, getAllClient } from '../../../../redux/client/actions';
import ContractService from '../../../Services/ContractService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles();

class AddContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractTitle: '',
      client: '',
      clients: [],
      operation: '',
      operations: [],
      commercialOperations: [],
      company: '',
      state: '',
      status: [],
      companies: [],
      taxeIdentityNumber: '',
      currentCity: '',
      level1: '',
      level2: '',
      level3: '',
      levels: [],
      signedDate: '',
      startDate: '',
      endDate: '',
      finalReelDate: '',
      contractTradeVolume: 0,
      contractTradeVolumeEuro: 0,
      currencies: [],
      currencyId: '',
      currencyCode: '',
      changeFactor: 0,
      paymentsBDDays: '',
      nbrConcepts: ['1'],
      conceptType: [],
      conceptValue: [],
      conceptValueLocal: [],
      conceptValueEuro: [],
      conceptTotalAmount: 0,
      conceptTotalAmountEuro: 0,
      penalties: '',
      penaltyQuantity: [],
      penaltyValue: [],
      penaltyCost: [],
      penaltyPer: [],
      penaltyMaxValue: '',
      penaltyMaxType: '',
      penaltiesListe: ['1'],
      purchaseOrderDocumentation: '',
      purchaseOrders: ['1'],
      purchaseOrderNumber: [],
      purchaseOrderReceiveDate: '',
      insure: '',
      firstDayInsured: '',
      lastDayInsured: '',
      amountInsured: '',
      amountInsuredEuro: '',
      proposalDocumentation: '',
      proposalDocumentationDuo: [],
      proposalDocumentations: ['1'],
      insureDocumentation: [],
      insureDocumentations: ['1'],
      contractDocumentation: [],
      contractDocumentations: ['1'],
      contractDocDescreption: [],
      radio: '',
      open: false,
      open2: false,
      open3: false,
      open4: false,
      openDoc: true
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
    ContractStatusService.getContractStatus().then(result => {
      this.setState({ status: result.data });
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
    FunctionalStructureService.getLevels().then(result => {
      this.setState({ levels: result.data.payload });
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
      let changeFactor;
      if (ev.target.name === 'client') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const commercialOperations = this.state.operations.filter(row => row.client._id === ev.target.value);
        this.setState({ commercialOperations });
      }
      if (ev.target.name === 'currencyId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tradeValue = this.state.contractTradeVolume;
        let currencyCode;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.currencies.map(currency => {
          // eslint-disable-next-line prefer-destructuring
          if (currency.currencyId === ev.target.value) {
            // eslint-disable-next-line prefer-destructuring
            changeFactor = currency.changeFactor; currencyCode = currency.typeOfCurrency.currencyCode;
          }
        });
        this.setState({ contractTradeVolumeEuro: tradeValue * changeFactor, changeFactor, currencyCode });
      }
      if (ev.target.name === 'amountInsured') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const factor = this.state.changeFactor;
        this.setState({ amountInsuredEuro: ev.target.value * factor });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleConcept = (event, row) => {
      let totalEuro = 0;
      let total = 0;
      if (event.target.name === 'conceptType') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.conceptType;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ conceptType: tab });
      }
      if (event.target.name === 'conceptValue') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.conceptValue; const type = this.state.conceptType[row]; const tab2 = this.state.conceptValueEuro; const tab3 = this.state.conceptValueLocal; const amount = this.state.contractTradeVolume; const factor = this.state.changeFactor;
        tab[0] = 0; tab2[0] = 0; tab3[0] = 0;
        tab[row] = event.target.value;
        if (type === 1) {
          tab2[row] = ((amount * event.target.value) / 100) * factor;
          tab3[row] = (amount * event.target.value) / 100;
        }
        if (type === 2) {
          tab2[row] = event.target.value * factor;
          tab3[row] = event.target.value * 1;
        }
        // eslint-disable-next-line array-callback-return,no-shadow
        tab2.map(row => { totalEuro += row; });
        // eslint-disable-next-line array-callback-return,no-shadow
        tab3.map(row => { total += row; });
        this.setState({
          conceptValue: tab, conceptValueLocal: tab3, conceptValueEuro: tab2, conceptTotalAmountEuro: totalEuro, conceptTotalAmount: total
        });
      }
      if (event.target.name === 'purchaseOrderNumber') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.purchaseOrderNumber;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ purchaseOrderNumber: tab });
      }
      if (event.target.name === 'contractDocDescreption') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.contractDocDescreption;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ contractDocDescreption: tab });
      }
    }

  handlePenalty = (event, row) => {
    console.log(row);
    if (event.target.name === 'penaltyQuantity') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.penaltyQuantity;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ penaltyQuantity: tab });
    }
    if (event.target.name === 'penaltyValue') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.penaltyValue;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ penaltyValue: tab });
    }
    if (event.target.name === 'penaltyCost') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.penaltyCost;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ penaltyCost: tab });
    }
    if (event.target.name === 'penaltyPer') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.penaltyPer;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ penaltyPer: tab });
    }
  }

    handleCheck = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.open;
      this.setState({ open: ok });
    }

    handleCheck2 = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok2 = !this.state.open2;
      this.setState({ open2: ok2 });
    }

  handleCheck3 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const ok3 = !this.state.open3;
    this.setState({ open3: ok3 });
  }

  handleCheck4 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const ok4 = !this.state.open4;
    this.setState({ open4: ok4 });
  }

  handleOpenDoc3 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.contractDocumentations.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.contractDocumentations.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeleteDoc3 = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.contractDocumentations.length > 1) {
      console.log(row);
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.contractDocumentations.filter(rows => rows !== row);
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs2 = this.state.contractDocDescreption.filter((e, i) => i !== (row));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs3 = this.state.contractDocumentation.filter((e, i) => i !== (row - 1));
      this.setState({ contractDocumentations: newDocs, contractDocDescreption: newDocs2, contractDocumentation: newDocs3 });
    }
  }

  handleOpenDoc = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.insureDocumentations.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.insureDocumentations.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeleteDoc = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.insureDocumentations.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.insureDocumentations.filter(rows => rows !== row);
      this.setState({ insureDocumentations: newDocs });
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
      console.log(row);
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const totalLocal = this.state.conceptTotalAmount; const localValue = this.state.conceptValueLocal[row]; const totalEuro = this.state.conceptTotalAmountEuro; const localEuro = this.state.conceptValueEuro[row];
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.nbrConcepts.filter(rows => rows !== row);
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newtypes = this.state.conceptType.filter((e, i) => i !== (row));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newValues = this.state.conceptValue.filter((e, i) => i !== (row));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newEuroValues = this.state.conceptValueEuro.filter((e, i) => i !== (row));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newLocalValues = this.state.conceptValueLocal.filter((e, i) => i !== (row));
      this.setState({
        nbrConcepts: newDocs, conceptType: newtypes, conceptValue: newValues, conceptValueLocal: newLocalValues, conceptValueEuro: newEuroValues, conceptTotalAmount: totalLocal - localValue, conceptTotalAmountEuro: totalEuro - localEuro
      });
    }
  }

  handleAddPenalty = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.penaltiesListe.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.penaltiesListe.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeletePenalty = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.penaltiesListe.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.penaltiesListe.filter(rows => rows !== row);
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs2 = this.state.penaltyQuantity.filter((e, i) => i !== (row));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs3 = this.state.penaltyCost.filter((e, i) => i !== (row));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs4 = this.state.penaltyValue.filter((e, i) => i !== (row));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs5 = this.state.penaltyPer.filter((e, i) => i !== (row));
      this.setState({
        penaltiesListe: newDocs, penaltyQuantity: newDocs2, penaltyCost: newDocs3, penaltyValue: newDocs4, penaltyPer: newDocs5
      });
    }
  }

  handleOpenPurchase = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.purchaseOrders.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.purchaseOrders.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeletePurchase = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.purchaseOrders.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.purchaseOrders.filter((e, i) => i !== (row - 1));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs2 = this.state.purchaseOrderNumber.filter((e, i) => i !== (row));
      this.setState({ purchaseOrderNumber: newDocs2, purchaseOrders: newDocs });
    }
  }

    handleCreate = () => {
      const {
        contractDocDescreption, contractDocumentation, insureDocumentation, proposalDocumentation, proposalDocumentationDuo, purchaseOrderDocumentation,
        operation, company, state, taxeIdentityNumber, contractTitle,
        conceptType, conceptValue, conceptValueEuro, conceptValueLocal, conceptTotalAmount, conceptTotalAmountEuro,
        signedDate, startDate, endDate, finalReelDate, contractTradeVolume, contractTradeVolumeEuro,
        penaltyMaxType, currencyId, paymentsBDDays, penaltyQuantity, penaltyValue, currentCity,
        penaltyCost, penaltyPer, penaltyMaxValue, purchaseOrderNumber, purchaseOrderReceiveDate,
        firstDayInsured, lastDayInsured, amountInsured, amountInsuredEuro, level3,
        penaltiesListe, purchaseOrders, insureDocumentations, contractDocumentations, nbrConcepts
      } = this.state;
      // eslint-disable-next-line react/destructuring-assignment
      const id = this.state.client;
      const client = { _id: id };
      const commercialOperation = { _id: operation };
      const financialCompany = { _id: company };
      const contractStatus = { _id: state };
      const city = { _id: currentCity };
      const address = { city };
      const currency = { _id: currencyId };
      const functionalStructureLevel = { _id: level3 };
      const FinancialContract = {
        client,
        commercialOperation,
        financialCompany,
        contractStatus,
        contractTitle,
        contractDocumentation,
        contractDocDescreption,
        functionalStructureLevel,
        taxeIdentityNumber,
        address,
        signedDate,
        startDate,
        endDate,
        finalReelDate,
        contractTradeVolume,
        currency,
        contractTradeVolumeEuro,
        paymentsBDDays,
        conceptTotalAmount,
        conceptTotalAmountEuro,
        conceptType,
        conceptValue,
        conceptValueEuro,
        conceptValueLocal,
        firstDayInsured,
        lastDayInsured,
        amountInsured,
        amountInsuredEuro,
        insureDocumentation,
        purchaseOrderNumber,
        purchaseOrderReceiveDate,
        purchaseOrderDocumentation,
        proposalDocumentation,
        proposalDocumentationDuo,
        penaltyQuantity,
        penaltyValue,
        penaltyCost,
        penaltyPer,
        penaltyMaxValue,
        penaltyMaxType,
        penaltiesListe,
        purchaseOrders,
        insureDocumentations,
        contractDocumentations,
        nbrConcepts
      };
      if (parseFloat(contractTradeVolume) === conceptTotalAmount) {
        ContractService.saveContract(FinancialContract).then(result => {
          history.push('/app/gestion-financial/Contracts');
        });
      } else {
        notification('danger', 'Trade Volume must be equal to Concept Total Amount in currency');
      }
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Contracts');
    }

  handleChangeFile = e => {
    this.readURI(e);
  };

  handleChangeFile1 = e => {
    this.readURI1(e);
  };

  handleChangeFile2 = e => {
    this.readURI2(e);
  };

  handleChangeFile3 = e => {
    this.readURI3(e);
  };

  handleChangeFile4 = e => {
    this.readURI4(e);
  };

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const file = this.state.contractDocumentation;
        file.push(ev.target.result);
        this.setState({ contractDocumentation: file });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  readURI1(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const file = this.state.insureDocumentation;
        file.push(ev.target.result);
        this.setState({ insureDocumentation: file });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  readURI2(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        this.setState({ purchaseOrderDocumentation: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  readURI3(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        this.setState({ proposalDocumentation: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  readURI4(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const file = this.state.proposalDocumentationDuo;
        file.push(ev.target.result);
        this.setState({ proposalDocumentationDuo: file });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      allCountrys, allStateCountrys, allCitys
    } = this.props;
    const conceptTypes = [
      {
        value: 1,
        label: 'Percentage % ',
      },
      {
        value: 2,
        label: 'Amount',
      }];
    const MaxValue = [
      {
        value: '1',
        label: 'Of the Value Of Contract',
      },
      {
        value: '2',
        label: 'Of the Value Of Purchase Order',
      }];
    const Quantities = [
      {
        value: '1',
        label: 'Per cent %',
      },
      {
        value: '2',
        label: 'Per Economic Volume',
      }];
    const penaltiesCost = [
      {
        value: '1',
        label: 'Per All The Volume Of Contract',
      },
      {
        value: '2',
        label: 'Per One Activity',
      }];
    const penaltiesPer = [
      {
        value: '1',
        label: 'Per Hour',
      },
      {
        value: '2',
        label: 'Per Day',
      },
      {
        value: '3',
        label: 'Per Week',
      },
      {
        value: '4',
        label: 'Per Month',
      }];
    const {
      client, operation, company, state, taxeIdentityNumber, nbrConcepts, radio, status, currencies, contractTitle,
      conceptType, conceptValue, conceptValueEuro, conceptValueLocal, conceptTotalAmount, conceptTotalAmountEuro,
      signedDate, startDate, endDate, finalReelDate, contractTradeVolume, companies, commercialOperations, clients, contractTradeVolumeEuro,
      penaltyMaxType, currencyId, currencyCode, paymentsBDDays, penalties, penaltyQuantity, penaltyValue, levels, amountInsuredEuro,
      penaltyCost, penaltyPer, penaltyMaxValue, penaltiesListe, purchaseOrderNumber, purchaseOrderReceiveDate, purchaseOrders,
      insure, firstDayInsured, lastDayInsured, amountInsured, proposal, open, open3, open4, level1, level2, level3, openDoc, contractDocDescreption
    } = this.state;
    const title = brand.name + ' - Blank Page';
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
        <PapperBlock title="Client Contracts " desc="Create new client contract " icon="ios-add-circle">
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
                        Contract Information
          </Typography>
          <br />
          <div>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select the client</InputLabel>
                  <Select
                    name="client"
                    value={client}
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
              <Grid item xs={12} sm={3} md={3} alignItems="flex-start">
                <FormControl fullWidth required>
                  <InputLabel>Select Operation</InputLabel>
                  <Select
                    name="operation"
                    value={operation}
                    onChange={this.handleChange}
                  >
                    {
                      commercialOperations.map((clt) => (
                        <MenuItem key={clt.commercialOperationId} value={clt.commercialOperationId}>
                          {clt.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select Client Company Name</InputLabel>
                  <Select
                    name="company"
                    value={company}
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
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select State</InputLabel>
                  <Select
                    name="state"
                    value={state}
                    onChange={this.handleChange}
                  >
                    {
                      status.map((clt) => (
                        <MenuItem key={clt.contractStatusId} value={clt.contractStatusId}>
                          {clt.statusName}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={12} sm={12}>
                <TextField
                  id="contractTitle"
                  label="Contract Title"
                  name="contractTitle"
                  value={contractTitle}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
              {openDoc === false ? (
                <div />
              ) : (
                <FormControl fullWidth>
                  <br />
                  <input
                    style={{ display: 'none' }}
                    id="outlined-button-file"
                    type="file"
                    onClick={this.handleChangeFile.bind(this)}
                  />
                  <FormLabel htmlFor="outlined-button-file">
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    {this.state.contractDocumentations.map((row) => (
                      <Grid
                        container
                        spacing={3}
                        alignItems="flex-start"
                        direction="row"
                      >
                        <Grid item xs={3}>
                          <br />
                          <Button
                            fullWidth
                            variant="outlined"
                            component="span"
                            startIcon={<Image color="primary" />}
                          >
                                Documentation File aaaa
                          </Button>
                        </Grid>
                        <Grid xs={4}>
                          <TextField
                            id="contractDocDescreption"
                            label="Description"
                            name="contractDocDescreption"
                            value={contractDocDescreption[row]}
                            onChange={event => this.handleConcept(event, row)}
                            fullWidth
                          />
                        </Grid>
                        <Grid xs={1}>
                          <br />
                          <IconButton size="medium" color="primary" onClick={() => this.handleOpenDoc3()}>
                            <AddIcon />
                          </IconButton>
                          <IconButton size="small" color="primary" onClick={() => this.handleDeleteDoc3(row)}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </FormLabel>
                </FormControl>
              )}
              <br />
              <br />
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h2" color="primary">
                  Functional Structure Assigned
                </Typography>
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
                justify="space-around"
              >
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Level 1</InputLabel>
                    <Select
                      name="level1"
                      value={level1}
                      onChange={this.handleChange}
                    >
                      {
                        levels.map((clt) => (
                          <MenuItem key={clt.levelId} value={clt.levelId}>
                            {clt.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Level 2</InputLabel>
                    <Select
                      name="level2"
                      value={level2}
                      onChange={this.handleChange}
                    >
                      {
                        levels.map((clt) => (
                          <MenuItem key={clt.levelId} value={clt.levelId}>
                            {clt.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Level 3</InputLabel>
                    <Select
                      name="level3"
                      value={level3}
                      onChange={this.handleChange}
                    >
                      {
                        levels.map((clt) => (
                          <MenuItem key={clt.levelId} value={clt.levelId}>
                            {clt.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h2" color="primary">
                  Taxe Identity
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="taxeIdentityNumber"
                  label="Taxe Identity Number"
                  name="taxeIdentityNumber"
                  value={taxeIdentityNumber}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={allCountrys}
                  getOptionLabel={option => option.countryName}
                  onChange={this.handleChangeCountry}
                  style={{ marginTop: 15 }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the country"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={allStateCountrys}
                  getOptionLabel={option => option.stateName}
                  onChange={this.handleChangeState}
                  style={{ marginTop: 15 }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the state"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={allCitys}
                  getOptionLabel={option => option.cityName}
                  onChange={this.handleChangeCity}
                  style={{ marginTop: 15 }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the city"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
            </Grid>
            <br />
          </div>
          <Typography variant="subtitle2" component="h2" color="primary">
                        Dates Of Contract
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={12} sm={7} md={5}>
              <TextField
                id="signedDate"
                label="Signed Date"
                type="date"
                name="signedDate"
                value={signedDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={7} md={5}>
              <TextField
                id="startDate"
                label="Start Date"
                type="date"
                name="startDate"
                value={startDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={7} md={5}>
              <TextField
                id="endDate"
                label="End Date"
                type="date"
                name="endDate"
                value={endDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={7} md={5}>
              <TextField
                id="finalReelDate"
                label="Reel End Date"
                type="date"
                name="finalReelDate"
                value={finalReelDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
                        Economic Value Of The Contract
          </Typography>
          <br />
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={3}>
              <TextField
                id="Contract Trade Volume"
                label="Contract Trade Volume"
                type="number"
                name="contractTradeVolume"
                value={contractTradeVolume}
                onChange={this.handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
              <TextField
                id="contractTradeVolumeEuro"
                label="Trade Value (Euro)"
                type="number"
                name="contractTradeVolumeEuro"
                value={contractTradeVolumeEuro}
                onChange={this.handleChange}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="paymentsBDDays"
                label="Payments BD per Day"
                type="number"
                name="paymentsBDDays"
                value={paymentsBDDays}
                onChange={this.handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
            Method of Payment
          </Typography>
          <br />
          {nbrConcepts.map((row) => (
            <Grid
              container
              spacing={1}
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={1} align="center">
                <Typography variant="subtitle2" component="h3" color="grey">
                  <br />
                  Concept
                  {' '}
                  { row }
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth required>
                  <InputLabel>Select Type</InputLabel>
                  <Select
                    name="conceptType"
                    value={conceptType[row]}
                    onChange={event => this.handleConcept(event, row)}
                  >
                    {
                      conceptTypes.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="conceptValue"
                  label="Concept Value"
                  type="number"
                  name="conceptValue"
                  value={conceptValue[row]}
                  onChange={event => this.handleConcept(event, row)}
                  fullWidth
                  required
                />
              </Grid>
              {conceptType[row] === 2 ? (
                <Grid item xs={2} />
              ) : (
                <Grid item xs={2}>
                  <TextField
                    id="conceptValueLocal"
                    label="Concept Value in Currency"
                    name="conceptValueLocal"
                    value={conceptValueLocal[row]}
                    type="number"
                    onChange={this.handleChange}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={1}>
                <TextField
                  id="conceptCurrency"
                  label="Currency"
                  name="conceptCurrency"
                  value={currencyCode}
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="conceptValueEuro"
                  label="Concept Value in EURO"
                  name="conceptValueEuro"
                  value={conceptValueEuro[row]}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={12} sm={3} md={3} />
            <Grid item xs={12} sm={3} md={3} align="center">
              <TextField
                id="conceptTotalAmount"
                label="Concept Total Amount in currency"
                name="conceptTotalAmount"
                value={conceptTotalAmount}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} align="center">
              <TextField
                id="conceptTotalAmountEuro"
                label="Concept Total Amount in Euro"
                name="conceptTotalAmountEuro"
                value={conceptTotalAmountEuro}
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
          <Typography variant="subtitle2" component="h2" color="primary">
                Details
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={12} sm={7} md={3}>
              <FormControlLabel
                id="insure"
                name="insure"
                value={insure}
                control={<Checkbox color="primary" onChange={this.handleCheck} />}
                label="Insure"
                labelPlacement="start"
              />
              {open === false ? (
                <div />
              ) : (
                <div>
                  <TextField
                    id="firstDayInsured"
                    label="Insured First Day "
                    type="date"
                    name="firstDayInsured"
                    value={firstDayInsured}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                  <TextField
                    id="lastDayInsured"
                    label="Insured last Date"
                    type="date"
                    name="lastDayInsured"
                    value={lastDayInsured}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={7}>
                      <TextField
                        id="amountInsured"
                        label="Amount Insured "
                        type="number"
                        name="amountInsured"
                        value={amountInsured}
                        onChange={this.handleChange}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        id="conceptCurrency"
                        label="Currency"
                        name="conceptCurrency"
                        value={currencyCode}
                        onChange={this.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    id="amountInsuredEuro"
                    label="Amount Insured (Euro)"
                    type="number"
                    name="amountInsuredEuro"
                    value={amountInsuredEuro}
                    onChange={this.handleChange}
                    fullWidth
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <br />
                  <FormControl>
                    <input
                      style={{ display: 'none' }}
                      id="outlined-button-file-1"
                      type="file"
                      onClick={this.handleChangeFile1.bind(this)}
                    />
                    <FormLabel htmlFor="outlined-button-file-1">
                      {/* eslint-disable-next-line react/destructuring-assignment */}
                      {this.state.insureDocumentations.map((row) => (
                        <div>
                          <Grid container>
                            <Grid item xs={9}>
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                startIcon={<Image color="primary" />}
                              >
                                Documentation
                              </Button>
                            </Grid>
                            <Grid item x={3}>
                              <IconButton size="small" color="primary" onClick={() => this.handleOpenDoc()}>
                                <AddIcon />
                              </IconButton>
                              <IconButton size="small" color="primary" onClick={() => this.handleDeleteDoc(row)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                          <br />
                        </div>
                      ))}
                    </FormLabel>
                  </FormControl>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              {/*              <FormControlLabel
                id="purchaseOrder"
                name="purchaseOrder"
                value={purchaseOrder}
                control={<Checkbox color="primary" onChange={this.handleCheck2} />}
                label="Purchase Order"
                labelPlacement="start"
              /> */}
              <br />
              <Typography variant="subtitle2" component="h2" color="primary">
                Purchase Order *
              </Typography>
              <br />
              <div>
                {purchaseOrders.map((row) => (
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <TextField
                        id="purchaseOrderNumber"
                        label={'Purchase Order ' + row}
                        type="number"
                        name="purchaseOrderNumber"
                        value={purchaseOrderNumber[row]}
                        onChange={event => this.handleConcept(event, row)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <br />
                      <IconButton size="small" color="primary" onClick={() => this.handleOpenPurchase()}>
                        <AddIcon />
                      </IconButton>
                      <IconButton size="small" color="primary" onClick={() => this.handleDeletePurchase(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <TextField
                  id="purchaseOrderReceiveDate"
                  label="Purchase Order Receive Date"
                  type="date"
                  name="purchaseOrderReceiveDate"
                  value={purchaseOrderReceiveDate}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  required
                />
                <br />
                <FormControl>
                  <input
                    style={{ display: 'none' }}
                    id="outlined-button-file-2"
                    type="file"
                    onClick={this.handleChangeFile2.bind(this)}
                  />
                  <FormLabel htmlFor="outlined-button-file-2">
                    <div>
                      <br />
                      <br />
                      <Button
                        fullWidth
                        variant="outlined"
                        component="span"
                        startIcon={<Image color="primary" />}
                      >
                                Documentation File
                      </Button>
                    </div>
                  </FormLabel>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <FormControlLabel
                id="proposal"
                name="proposal"
                value={proposal}
                control={<Checkbox color="primary" onChange={this.handleCheck3} />}
                label="Proposal"
                labelPlacement="start"
              />
              {open3 === false ? (
                <div />
              ) : (
                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="radio" value={radio} onChange={this.handleChange}>
                    <FormControlLabel value="oneProposal" control={<Radio />} label="Technical & Economical" />
                    {radio === 'oneProposal' ? (
                      <FormControl>
                        <input
                          style={{ display: 'none' }}
                          id="outlined-button-file-3"
                          type="file"
                          onClick={this.handleChangeFile3.bind(this)}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormLabel htmlFor="outlined-button-file-3">
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                startIcon={<Image color="primary" />}
                              >
                                     Proposal File
                              </Button>
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </FormControl>
                    ) : (
                      <div />
                    )}
                    <FormControlLabel value="separatedProposal" control={<Radio />} label="Separated Proposals" />
                    {radio === 'separatedProposal' ? (
                      <FormControl>
                        <input
                          style={{ display: 'none' }}
                          id="outlined-button-file-4"
                          type="file"
                          onClick={this.handleChangeFile4.bind(this)}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormLabel htmlFor="outlined-button-file-4">
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                startIcon={<Image color="primary" />}
                              >
                                    Technical Proposal
                              </Button>
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12}>
                            <FormLabel htmlFor="outlined-button-file-4">
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                startIcon={<Image color="primary" />}
                              >
                                    Economical Proposal
                              </Button>
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </FormControl>
                    ) : (
                      <div />
                    )}
                  </RadioGroup>
                </FormControl>
              )}
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
            Others
          </Typography>
          <br />
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={12}>
              <FormControlLabel
                id="penalties"
                name="penalties"
                value={penalties}
                control={<Checkbox color="primary" onChange={this.handleCheck4} />}
                label="Penalties"
                labelPlacement="start"
              />
              {open4 === false ? (
                <div />
              ) : (
                <Grid container spacing={4}>
                  <Grid item xs={12} />
                  {
                    penaltiesListe.map((row) => (
                      <Grid container spacing={4}>
                        <Grid item xs={1} />
                        <Grid item xs={2}>
                          <FormControl fullWidth required>
                            <InputLabel>Select Quantity</InputLabel>
                            <Select
                              name="penaltyQuantity"
                              value={penaltyQuantity[row]}
                              onChange={event => this.handlePenalty(event, row)}
                            >
                              {
                                Quantities.map((clt) => (
                                  <MenuItem key={clt.value} value={clt.value}>
                                    {clt.label}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            label="Penalty Value"
                            type="number"
                            name="penaltyValue"
                            value={penaltyValue[row]}
                            onChange={event => this.handlePenalty(event, row)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <FormControl fullWidth required>
                            <InputLabel>Select Value</InputLabel>
                            <Select
                              name="penaltyCost"
                              value={penaltyCost[row]}
                              onChange={event => this.handlePenalty(event, row)}
                            >
                              {
                                penaltiesCost.map((clt) => (
                                  <MenuItem key={clt.value} value={clt.value}>
                                    {clt.label}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <FormControl fullWidth required>
                            <InputLabel>Select Unit</InputLabel>
                            <Select
                              name="penaltyPer"
                              value={penaltyPer[row]}
                              onChange={event => this.handlePenalty(event, row)}
                            >
                              {
                                penaltiesPer.map((clt) => (
                                  <MenuItem key={clt.value} value={clt.value}>
                                    {clt.label}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <br />
                          <IconButton size="small" color="primary" onClick={() => this.handleAddPenalty()}>
                            <AddIcon />
                          </IconButton>
                          <IconButton size="small" color="primary" onClick={() => this.handleDeletePenalty(row)}>
                            <DeleteIcon />
                          </IconButton>
                          <br />
                          <br />
                        </Grid>
                      </Grid>
                    ))
                  }
                  <Grid item xs={12} />
                  <Typography variant="subtitle2" component="h2" color="primary" align="center">
                        Maximum Value Of Penalty
                  </Typography>
                  <Grid item xs={4}>
                    <br />
                    <TextField
                      id="penaltyMaxValue"
                      label="Penalty Maximum Value (%)"
                      type="number"
                      name="penaltyMaxValue"
                      value={penaltyMaxValue}
                      onChange={this.handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <br />
                    <FormControl fullWidth required>
                      <InputLabel>Select Type </InputLabel>
                      <Select
                        name="penaltyMaxType"
                        value={penaltyMaxType}
                        onChange={this.handleChange}
                      >
                        {
                          MaxValue.map((clt) => (
                            <MenuItem key={clt.value} value={clt.value}>
                              {clt.label}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
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

AddContract.propTypes = {
  classes: PropTypes.object.isRequired
};
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
  getAllCityByState,
  addClientCommercial,
  getAllClient
}, dispatch);

const AddContractMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContract);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddContractMapped changeTheme={changeTheme} classes={classes} />;
};
