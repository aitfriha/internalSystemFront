import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  FormControl,
  Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { connect } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../../../utils/history';
import { ThemeContext } from '../../../App/ThemeWrapper';
import SuppliersPaymentService from '../../../Services/SuppliersPaymentService';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import ClientService from '../../../Services/ClientService';
import ContractService from '../../../Services/ContractService';
import PurchaseOrderService from '../../../Services/PurchaseOrderService';
import CurrencyService from '../../../Services/CurrencyService';

const useStyles = makeStyles();

class AddSuppliersPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSupplier: '',
      clients: [],
      clientId: '',
      contracts: [],
      contractsClient: [],
      currencies: [],
      currencyId: '',
      changeFactor: 0,
      contractTradeVolume: 0,
      contractTradeVolumeEuro: 0,
      contractId: '',
      purchaseOrders: [],
      purchaseOrdersClient: [],
      purchaseOrderId: '',
      supplierBill: '',
      paymentDate: '',
      reelPaymentDate: '',
      companies: [],
      externalSuppliers: [],
      externalSupplierId: '',
      financialCompanyId: '',
      type: 'external',
      typeClient: 'contract',
      poClient: false,
      contractClient: true,
      haveExternal: true,
      haveInternal: false
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
    FinancialCompanyService.getCompany().then(result => {
      console.log(result);
      this.setState({ companies: result.data });
    });
    ExternalSuppliersService.getExternalSuppliers().then(result => {
      console.log(result);
      this.setState({ externalSuppliers: result.data });
    });
    ClientService.getClients().then(result => {
      this.setState({ clients: result.data.payload });
    });
    ContractService.getContract().then(result => {
      // eslint-disable-next-line array-callback-return
      this.setState({ contracts: result.data, contractsClient: result.data });
      console.log(this.state);
    });
    PurchaseOrderService.getPurchaseOrder().then(result => {
      console.log(result);
      this.setState({ purchaseOrders: result.data, purchaseOrdersClient: result.data });
    });
    CurrencyService.getFilteredCurrency().then(result => {
      this.setState({ currencies: result.data });
    });
  }


  // eslint-disable-next-line react/sort-comp
  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        this.setState({ supplierBill: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

    handleChangeLogo = e => {
      this.readURI(e);
    };

    handleSubmit = () => {
      const {
        codeSupplier, supplierBill, externalSupplierId, financialCompanyId, type, typeClient,
        clientId, purchaseOrderId, contractId, reelPaymentDate, paymentDate,
        currencyId, contractTradeVolume, contractTradeVolumeEuro, changeFactor
      } = this.state;
      const client = { _id: clientId };
      const currency = { _id: currencyId };
      let financialCompany = { _id: '' };
      let externalSupplier = { _id: '' };
      let purchaseOrder = { _id: '' };
      let financialContract = { _id: '' };
      if (financialCompanyId !== '') financialCompany = { _id: financialCompanyId };
      if (externalSupplierId !== '') externalSupplier = { _id: externalSupplierId };
      if (typeClient === 'contract') financialContract = { _id: contractId };
      if (typeClient === 'po') purchaseOrder = { _id: purchaseOrderId };
      const SupplierPayment = {
        codeSupplier,
        supplierBill,
        externalSupplier,
        financialCompany,
        currency,
        type,
        typeClient,
        changeFactor,
        contractTradeVolume,
        contractTradeVolumeEuro,
        paymentDate,
        reelPaymentDate,
        client,
        purchaseOrder,
        financialContract
      };
      console.log(SupplierPayment);
      SuppliersPaymentService.saveSuppliersPayment(SupplierPayment).then(result => {
        console.log(result);
        history.push('/app/gestion-financial/Suppliers Payment');
      });
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Suppliers Payment');
    }

    handleChange = (ev) => {
      const {
        changeFactor, contractTradeVolume, currencies
      } = this.state;
      if (ev.target.name === 'currencyId') {
        const tradeValue = contractTradeVolume;
        currencies.map(currency => {
          if (currency.currencyId === ev.target.value) {
            this.setState({ contractTradeVolumeEuro: tradeValue * currency.changeFactor, changeFactor: currency.changeFactor });
          }
          return null;
        });
      }
      if (ev.target.name === 'contractTradeVolume') {
        this.setState({ contractTradeVolumeEuro: ev.target.value * changeFactor, changeFactor });
      }
      if (ev.target.name === 'type') {
        if (ev.target.value === 'external') this.setState({ haveExternal: true, haveInternal: false });
        else this.setState({ haveInternal: true, haveExternal: false });
      }
      if (ev.target.name === 'externalSupplierId') {
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.externalSuppliers.map(row => {
          if (row.externalSupplierId === ev.target.value) this.setState({ codeSupplier: row.code, financialCompanyId: '' });
        });
      }
      if (ev.target.name === 'financialCompanyId') {
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.companies.map(row => {
          if (row.financialCompanyId === ev.target.value) this.setState({ codeSupplier: row.code, codeContract: row.code, externalSupplierId: '' });
        });
      }
      if (ev.target.name === 'typeClient') {
        if (ev.target.value === 'contract') this.setState({ contractClient: true, poClient: false });
        else this.setState({ poClient: true, contractClient: false });
      }
      if (ev.target.name === 'clientId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab1 = this.state.purchaseOrders; const tab2 = this.state.contracts;
        const tabClient = tab2.filter((row) => (row.client._id === ev.target.value));
        const tabPurchaseOrder = tab1.filter((row) => (row.client._id === ev.target.value));
        this.setState({ purchaseOrdersClient: tabPurchaseOrder, contractsClient: tabClient });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const title = brand.name + ' - Add New Supplier Payment';
      const { desc } = brand;
      const {
        codeSupplier, companies, externalSuppliers, type, supplierBill, reelPaymentDate, paymentDate,
        haveExternal, haveInternal, externalSupplierId, financialCompanyId,
        currencyId, contractTradeVolume, contractTradeVolumeEuro, currencies,
        contractClient, poClient, typeClient, clients, clientId, contractsClient, contractId, purchaseOrdersClient, purchaseOrderId
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
            title="Supplier Payment"
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
            <Typography variant="subtitle2" component="h2" color="primary" align="center" />
            <br />
            <Grid
              container
              spacing={6}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend"> ● Supplier Type</FormLabel>
                  <RadioGroup row aria-label="position" name="type" value={type} onChange={this.handleChange}>
                    <FormControlLabel
                      value="external"
                      control={<Radio color="primary" />}
                      label="External"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="internal"
                      control={<Radio color="primary" />}
                      label="Internal"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                {haveExternal ? (
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                    justify="center"
                  >
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Select External Supplier</InputLabel>
                        <Select
                          name="externalSupplierId"
                          value={externalSupplierId}
                          variant="outlined"
                          fullWidth
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
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="codeSupplier"
                        label="Supplier Code"
                        variant="outlined"
                        name="codeSupplier"
                        value={codeSupplier}
                        required
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>
                ) : (<div />)}
                {haveInternal ? (
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                    justify="center"
                  >
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Select Internal Company</InputLabel>
                        <Select
                          name="financialCompanyId"
                          value={financialCompanyId}
                          variant="outlined"
                          onChange={this.handleChange}
                          fullWidth
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
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="codeSupplier"
                        label="Supplier Code"
                        variant="outlined"
                        name="codeSupplier"
                        value={codeSupplier}
                        required
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>
                ) : (<div />)}
                <br />
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                        <InputLabel>Select the Purchase Order</InputLabel>
                        <Select
                          name="purchaseOrderId"
                          value={purchaseOrderId}
                          onChange={this.handleChange}
                        >
                          {
                            purchaseOrdersClient.map((clt) => (
                              <MenuItem key={clt.purchaseOrderId} value={clt.purchaseOrderId}>
                                {clt.purchaseNumber}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ) : (<div />)}
                <br />
                <br />
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="Contract Trade Volume"
                      label="Contract Trade Volume"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      name="contractTradeVolume"
                      value={contractTradeVolume}
                      onChange={this.handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
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
                  <Grid item xs={12} md={3}>
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
                </Grid>
                <br />
                <br />
                <Grid
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="paymentDate"
                      label="Payment Date"
                      variant="outlined"
                      name="paymentDate"
                      value={paymentDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.handleChange}
                      type="date"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="reelPaymentDate"
                      label="Reel Payment Date"
                      variant="outlined"
                      name="reelPaymentDate"
                      value={reelPaymentDate}
                      onChange={this.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <br />
                <br />
                <FormControl>
                  <input
                    style={{ display: 'none' }}
                    id="outlined-button-file-2"
                    type="file"
                    onChange={this.handleChangeLogo.bind(this)}
                  />
                  <FormLabel htmlFor="outlined-button-file-2">
                    <Button
                      fullWidth
                      variant="outlined"
                      component="span"
                      startIcon={<Image color="primary" />}
                    >
                      Supplier Bill
                    </Button>
                  </FormLabel>
                </FormControl>
                <br />
                <br />
                {
                  supplierBill ? (
                    <Avatar alt="User Name" src={supplierBill} />
                  ) : (<div />)
                }
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
          </PapperBlock>
        </div>
      );
    }
}


const AddSuppliersContractMapped = connect(
)(AddSuppliersPayment);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddSuppliersContractMapped changeTheme={changeTheme} classes={classes} />;
};
