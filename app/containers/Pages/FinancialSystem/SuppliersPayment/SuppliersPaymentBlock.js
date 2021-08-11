import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Image } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import SuppliersPaymentService from '../../../Services/SuppliersPaymentService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import ClientService from '../../../Services/ClientService';
import ContractService from '../../../Services/ContractService';
import PurchaseOrderService from '../../../Services/PurchaseOrderService';
import CurrencyService from '../../../Services/CurrencyService';

const useStyles = makeStyles();

class SuppliersPaymentBlock extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      codeContract: '',
      codeSupplier: '',
      clients: [],
      clientId: '',
      contracts: [],
      contractsClient: [],
      contractId: '',
      purchaseOrders: [],
      purchaseOrdersClient: [],
      purchaseOrderId: '',
      currencies: [],
      currencyId: '',
      changeFactor: 0,
      contractTradeVolume: 0,
      contractTradeVolumeEuro: 0,
      supplierBill: '',
      paymentDate: '',
      ReelPaymentDate: '',
      companies: [],
      externalSuppliers: [],
      externalSupplierId: '',
      financialCompanyId: '',
      type: '',
      typeClient: '',
      poClient: false,
      contractClient: false,
      haveExternal: false,
      haveInternal: false,
      datas: [],
      openPopUp: false,
      row: [],
      columns: [
        {
          label: 'Client',
          name: 'client',
          options: {
            filter: true,
            customBodyRender: (client) => (
              <React.Fragment>
                {
                  client ? client.name : '---'
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
          label: 'Contract Client',
          name: 'financialContract',
          options: {
            filter: true,
            customBodyRender: (financialContract) => (
              <React.Fragment>
                {
                  financialContract ? financialContract.contractTitle : '---'
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
          label: 'Purchase Order Client',
          name: 'purchaseOrder',
          options: {
            filter: true,
            customBodyRender: (purchaseOrder) => (
              <React.Fragment>
                {
                  purchaseOrder ? purchaseOrder.purchaseNumber : '---'
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
          label: 'Supplier Type',
          name: 'type',
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
          label: 'Supplier Name',
          name: 'externalSupplier',
          options: {
            filter: true,
            customBodyRender: (externalSupplier) => (
              <React.Fragment>
                {
                  externalSupplier ? externalSupplier.companyName : '---'
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
          label: 'Supplier Code',
          name: 'externalSupplier',
          options: {
            filter: true,
            customBodyRender: (externalSupplier) => (
              <React.Fragment>
                {
                  externalSupplier ? externalSupplier.code : '---'
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
          label: 'Company Name',
          name: 'financialCompany',
          options: {
            filter: true,
            customBodyRender: (financialCompany) => (
              <React.Fragment>
                {
                  financialCompany ? financialCompany.name : '---'
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
          label: 'Company Code',
          name: 'financialCompany',
          options: {
            filter: true,
            customBodyRender: (financialCompany) => (
              <React.Fragment>
                {
                  financialCompany ? financialCompany.code : '---'
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
          label: 'Payment Date ',
          name: 'paymentDate',
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
                  value ? value.toString().slice(0, 10) : ''
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Reel Payment Date',
          name: 'reelPaymentDate',
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
                  value ? value.toString().slice(0, 10) : ''
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Supplier Bill Doc',
          name: 'supplierBill',
          options: {
            filter: true,
            customBodyRender: (supplierBill) => (
              <React.Fragment>
                {
                  supplierBill ? 'Yes' : 'No'
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
                {thelogedUser.userRoles[0].actionsNames.financialModule_suppliersPayments_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_suppliersPayments_delete ? (
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
    SuppliersPaymentService.getSuppliersPayment().then(result => {
      console.log(result);
      this.setState({ datas: result.data });
    });
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
      const id = this.state.datas[index].supplierPaymentId;
      SuppliersPaymentService.getSuppliersPaymentById(id).then(result => {
        console.log(result);
        this.setState({
          supplierPaymentId: id,
          codeSupplier: result.data.codeSupplier,
          supplierBill: result.data.supplierBill,
          currencyId: result.data.currency._id,
          changeFactor: result.data.changeFactor,
          contractTradeVolume: result.data.contractTradeVolume,
          contractTradeVolumeEuro: result.data.contractTradeVolumeEuro,
          paymentDate: result.data.paymentDate ? result.data.paymentDate.toString().slice(0, 10) : '---',
          reelPaymentDate: result.data.reelPaymentDate ? result.data.reelPaymentDate.toString().slice(0, 10) : '---',
          externalSupplierId: result.data.type === 'external' ? result.data.externalSupplier._id : '',
          financialCompanyId: result.data.type === 'internal' ? result.data.financialCompany._id : '',
          type: result.data.type,
          typeClient: result.data.typeClient,
          clientId: result.data.client._id,
          contractId: (result.data.typeClient === 'contract' && result.data.financialContract !== null) ? result.data.financialContract._id : '',
          purchaseOrderId: (result.data.typeClient === 'po' && result.data.purchaseOrder !== null ) ? result.data.purchaseOrder._id : '',
          haveExternal: result.data.type === 'external',
          haveInternal: result.data.type === 'internal',
          poClient: result.data.typeClient === 'po',
          contractClient: result.data.typeClient === 'contract',
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].supplierPaymentId;
      console.log(id);
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      SuppliersPaymentService.deleteSuppliersPayment(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

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

    handleSave = () => {
      const {
        supplierPaymentId, codeSupplier, supplierBill, externalSupplierId, financialCompanyId, type, typeClient,
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
      const SuppliersContract = {
        supplierPaymentId,
        codeSupplier,
        currency,
        supplierBill,
        externalSupplier,
        financialCompany,
        type,
        typeClient,
        changeFactor,
        contractTradeVolume,
        contractTradeVolumeEuro,
        client,
        purchaseOrder,
        financialContract,
        reelPaymentDate,
        paymentDate
      };
      console.log(SuppliersContract);
      SuppliersPaymentService.updateSuppliersPayment(SuppliersContract).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
    };

    handleChange = (ev) => {
      let changeFactor;
      if (ev.target.name === 'currencyId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tradeValue = this.state.contractTradeVolume;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.currencies.map(currency => {
          // eslint-disable-next-line prefer-destructuring
          if (currency.currencyId === ev.target.value) {
            // eslint-disable-next-line prefer-destructuring
            changeFactor = currency.changeFactor;
          }
        });
        this.setState({ contractTradeVolumeEuro: tradeValue * changeFactor, changeFactor });
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
      const {
        columns, openPopUp, datas,
        codeSupplier, companies, externalSuppliers, type, supplierBill, reelPaymentDate, paymentDate,
        haveExternal, haveInternal, externalSupplierId, financialCompanyId,
        currencyId, contractTradeVolume, contractTradeVolumeEuro, currencies,
        contractClient, poClient, typeClient, clients, clientId, contractsClient, contractId, purchaseOrdersClient, purchaseOrderId
      } = this.state;
      const {
        // eslint-disable-next-line react/prop-types
        logedUser
      } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_suppliersPayments_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        downloadOptions: { filename: 'Suppliers payment.csv' },
        print: exportButton,
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add Suppliers-Payment"
            tooltip="Add New Supplier Payment"
            fileName="Suppliers payment"
            hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_suppliersPayments_create}
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_suppliersPayments_export}
          />
        )
      };
      return (
        <div>
          <MUIDataTable
            title="The Suppliers Payment List"
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
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                            save
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
const SuppliersPaymentMapped = connect(
  mapStateToProps,
  null
)(SuppliersPaymentBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <SuppliersPaymentMapped changeTheme={changeTheme} classes={classes} />;
};
