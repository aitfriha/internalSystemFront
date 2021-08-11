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
import SuppliersContractService from '../../../Services/SuppliersContractService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import CurrencyService from '../../../Services/CurrencyService';
import ClientService from '../../../Services/ClientService';
import ContractService from '../../../Services/ContractService';
import PurchaseOrderService from '../../../Services/PurchaseOrderService';

const useStyles = makeStyles();

class SuppliersContractBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      supplierContractId: '',
      name: '',
      codeContract: '',
      codeSupplier: '',
      changeFactor: 1,
      currencies: [],
      clients: [],
      clientId: '',
      contracts: [],
      contractsClient: [],
      contractId: '',
      purchaseOrders: [],
      purchaseOrdersClient: [],
      purchaseOrderId: '',
      currencyId: '',
      contractTradeVolume: 0,
      contractTradeVolumeEuro: 0,
      document: '',
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
          label: 'Contract Name',
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
          label: 'Code Contract',
          name: 'codeContract',
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
          label: 'Client',
          name: 'client.name',
          options: {
            filter: true,
            customBodyRender: (name) => (
              <React.Fragment>
                {
                  name || '---'
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
          name: 'financialContract.contractTitle',
          options: {
            filter: true,
            customBodyRender: (contractTitle) => (
              <React.Fragment>
                {
                  contractTitle || '---'
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
          name: 'externalSupplier.companyName',
          options: {
            filter: true,
            customBodyRender: (companyName) => (
              <React.Fragment>
                {
                  companyName || '---'
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
          name: 'externalSupplier.code',
          options: {
            filter: true,
            customBodyRender: (code) => (
              <React.Fragment>
                {
                  code || '---'
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
          name: 'financialCompany.name',
          options: {
            filter: true,
            customBodyRender: (name) => (
              <React.Fragment>
                {
                  name || '---'
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
          name: 'financialCompany.code',
          options: {
            filter: true,
            customBodyRender: (code) => (
              <React.Fragment>
                {
                  code || '---'
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
          label: 'Contract Trade Volume',
          name: 'contractTradeVolume',
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
          label: 'Currency',
          name: 'currency.typeOfCurrency.currencyCode',
          options: {
            filter: true,
            customBodyRender: (currencyCode) => (
              <React.Fragment>
                {
                  currencyCode || ''
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
          label: 'contractTradeVolume (€) ',
          name: 'contractTradeVolumeEuro',
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
          label: 'Signed Contract Doc',
          name: 'document',
          options: {
            filter: true,
            customBodyRender: (document) => (
              <React.Fragment>
                {
                  document ? 'Yes' : 'No'
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
                {thelogedUser.userRoles[0].actionsNames.financialModule_suppliersContracts_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_suppliersContracts_delete ? (
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
    SuppliersContractService.getSuppliersContract().then(result => {
      this.setState({ datas: result.data });
    });
    FinancialCompanyService.getCompany().then(result => {
      this.setState({ companies: result.data });
    });
    ExternalSuppliersService.getExternalSuppliers().then(result => {
      this.setState({ externalSuppliers: result.data });
    });
    CurrencyService.getFilteredCurrency().then(result => {
      this.setState({ currencies: result.data });
    });
    ClientService.getClients().then(result => {
      this.setState({ clients: result.data.payload });
    });
    ContractService.getContract().then(result => {
      // eslint-disable-next-line array-callback-return
      this.setState({ contracts: result.data, contractsClient: result.data });
    });
    PurchaseOrderService.getPurchaseOrder().then(result => {
      this.setState({ purchaseOrders: result.data, purchaseOrdersClient: result.data });
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
      const id = this.state.datas[index].supplierContractId;
      SuppliersContractService.getSuppliersContractById(id).then(result => {
        console.log(result);
        this.setState({
          supplierContractId: id,
          name: result.data.name,
          codeContract: result.data.codeContract,
          codeSupplier: result.data.codeSupplier,
          changeFactor: result.data.changeFactor,
          currencyId: result.data.currency._id,
          contractTradeVolume: result.data.contractTradeVolume,
          contractTradeVolumeEuro: result.data.contractTradeVolumeEuro,
          document: result.data.document,
          externalSupplierId: result.data.type === 'external' ? result.data.externalSupplier._id : '',
          financialCompanyId: result.data.type === 'internal' ? result.data.financialCompany._id : '',
          type: result.data.type,
          typeClient: result.data.typeClient,
          clientId: result.data.client._id,
          contractId: result.data.typeClient === 'contract' ? result.data.financialContract._id : '',
          purchaseOrderId: result.data.typeClient === 'po' ? result.data.purchaseOrder._id : '',
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
      const id = this.state.datas[index].supplierContractId;
      console.log(id);
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      SuppliersContractService.deleteSuppliersContract(id).then(result => {
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
          this.setState({ document: ev.target.result });
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    handleChangeLogo = e => {
      this.readURI(e);
    };

    handleSave = () => {
      const {
        supplierContractId, name, codeContract, codeSupplier, document, externalSupplierId, financialCompanyId, type, typeClient,
        currencyId, contractTradeVolume, contractTradeVolumeEuro, changeFactor, clientId, purchaseOrderId, contractId
      } = this.state;
      const currency = { _id: currencyId };
      const client = { _id: clientId };
      let financialCompany = { _id: '' };
      let externalSupplier = { _id: '' };
      let purchaseOrder = { _id: '' };
      let financialContract = { _id: '' };
      if (financialCompanyId !== '') financialCompany = { _id: financialCompanyId };
      if (externalSupplierId !== '') externalSupplier = { _id: externalSupplierId };
      if (typeClient === 'contract') financialContract = { _id: contractId };
      if (typeClient === 'po') purchaseOrder = { _id: purchaseOrderId };
      const SuppliersContract = {
        supplierContractId, name, codeContract, codeSupplier, document, externalSupplier, financialCompany, type, typeClient, currency, contractTradeVolume, contractTradeVolumeEuro, changeFactor, client, purchaseOrder, financialContract
      };
      console.log(SuppliersContract);
      SuppliersContractService.updateSuppliersContract(SuppliersContract).then(result => {
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
        if (ev.target.value === 'external') this.setState({ haveExternal: true, haveInternal: false, financialCompanyId: '' });
        else this.setState({ haveInternal: true, haveExternal: false, externalSupplierId: '' });
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
          if (row.financialCompanyId === ev.target.value) this.setState({ codeSupplier: row.code, externalSupplierId: '' });
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
        name, codeSupplier, companies, externalSuppliers, type, document,
        currencyId, contractTradeVolume, contractTradeVolumeEuro, currencies,
        haveExternal, haveInternal, externalSupplierId, financialCompanyId,
        contractClient, poClient, typeClient, clients, clientId, contractsClient, contractId, purchaseOrdersClient, purchaseOrderId
      } = this.state;
      const {
        logedUser
      } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_suppliersContracts_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        downloadOptions: { filename: 'Suppliers contract.csv' },
        print: exportButton,
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add-Suppliers-Contract"
            tooltip="Add New Supplier Contract"
            fileName="Suppliers contract"
            hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_suppliersContracts_create}
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_suppliersContracts_export}
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Suppliers Contract List"
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
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    required
                    fullWidth
                    onChange={this.handleChange}
                  />
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
                        Document
                      </Button>
                    </FormLabel>
                  </FormControl>
                  <br />
                  <br />
                  {
                    document ? (
                      <Avatar alt="User Name" src={document} />
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
const PurchaseOrderMapped = connect(
  mapStateToProps,
  null
)(SuppliersContractBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <PurchaseOrderMapped changeTheme={changeTheme} classes={classes} />;
};
