import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import PrintIcon from '@material-ui/icons/Print';
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
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { toUpper } from 'lodash/string';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/Add';
import { ThemeContext } from '../../../App/ThemeWrapper';
import PurchaseOrderService from '../../../Services/PurchaseOrderService';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import styles from '../Company/companies-jss';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import CurrencyService from '../../../Services/CurrencyService';
import IvaService from '../../../Services/IvaService';
import PrintPurchaseOrder2 from './printPurchaseOrder2';
import ClientService from '../../../Services/ClientService';
import ContractService from '../../../Services/ContractService';
import PrintButton from './PrintButton';

const useStyles = makeStyles(styles);

class PurchaseOrderBlock extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      purchaseOrder: {},
      purchaseOrder2: {},
      purchaseOrderId: '',
      purchaseNumber: '',
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
      clients: [],
      clientId: '',
      contracts: [],
      contractsClient: [],
      contractId: '',
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
      openPopUp: false,
      openPrint: false,
      openPrint2: false,
      print: false,
      print2: false,
      typeClient: '',
      poClient: false,
      contractClient: false,
      datas: [],
      columns: [
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
          label: 'Client Type',
          name: 'typeClient',
          options: {
            filter: true,
            customBodyRender: (typeClient) => (
              <React.Fragment>
                {
                  typeClient === 'contract' ? 'CONTRACT' : 'PURCHASE ORDER'
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
          name: 'companyEmit.name',
          label: 'Company Data Emit ',
          options: {
            filter: true,
            customBodyRender: (name) => (
              <React.Fragment>
                {
                  name
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
          name: 'purchaseNumber',
          label: 'Nº Purchase Order',
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
          name: 'companyNIF',
          label: 'Tax Number',
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
          name: 'companyLogo',
          label: 'Logo',
          options: {
            filter: false,
            customBodyRender: (value) => {
              const { classes } = this.props;
              return (
                <React.Fragment>
                  <Avatar alt="Logo " src={value} className={classes.medium} />
                </React.Fragment>
              );
            },
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
          name: 'receptionSupplierType',
          label: 'Supplier Type',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? toUpper(value) : '---'
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
          name: 'internalSupplierReception.name',
          label: 'Internal Reception Supplier',
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
          name: 'internalSupplierReception',
          label: 'Supplier Logo',
          options: {
            filter: false,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? (<Avatar alt="Logo " src={value.logo} />) : '---'
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
          name: 'externalSupplierReception.companyName',
          label: 'External Reception Supplier',
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
          name: 'supplierResponsible',
          label: 'Supplier Responsible',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value || '---'
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
          name: 'supplierNIF',
          label: 'Supplier NIF',
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
          name: 'paymentMethod',
          label: 'Payment Method',
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
          name: 'totalAmountLocal',
          label: 'Total Amount (L)',
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
          name: 'totalAmountEuro',
          label: 'Total Amount (€)',
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
          label: 'I.V.A Retentions %',
          name: 'ivaRetentions',
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
          label: 'Total Amount Retentions %',
          name: 'totalAmountRetentions',
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
          label: 'Total Iva + Retentions %',
          name: 'totalIvaRetention',
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
                {thelogedUser.userRoles[0].actionsNames.financialModule_purchaseOrderAcceptance_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="primary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_purchaseOrderAcceptance_export ? (
                  <IconButton onClick={() => this.handlePrint2(tableMeta)}>
                    <PrintIcon color="primary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_purchaseOrderAcceptance_delete ? (
                  <IconButton onClick={() => this.handleDelete(tableMeta)}>
                    <DeleteIcon color="secondary" />
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
    PurchaseOrderService.getPurchaseOrder().then(result => {
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
    // eslint-disable-next-line no-shadow,react/prop-types
    const { changeTheme } = this.props;
    changeTheme('greyTheme');
  }

  handlePrint2 = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].purchaseOrderId;
    PurchaseOrderService.getPurchaseOrderById(id).then(result => {
      console.log(result.data);
      this.setState({
        purchaseOrder2: result.data,
        openPrint2: true
      });
    });
  }

  handleDetails = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].purchaseOrderId;
    PurchaseOrderService.getPurchaseOrderById(id).then(result => {
      const purchaseOrder = result.data;
      console.log(purchaseOrder);
      this.setState({
        purchaseOrderId: id,
        purchaseNumber: purchaseOrder.purchaseNumber,
        companyDataEmit: purchaseOrder.companyEmit._id,
        companyLogo: purchaseOrder.companyLogo,
        internLogo: purchaseOrder.internLogo,
        companyNIF: purchaseOrder.companyNIF,
        companyAddress: purchaseOrder.companyAddress,
        receptionSupplierExternal: purchaseOrder.externalSupplierReception ? purchaseOrder.externalSupplierReception._id : '',
        receptionSupplierInternal: purchaseOrder.internalSupplierReception ? purchaseOrder.internalSupplierReception._id : '',
        receptionSupplierType: purchaseOrder.receptionSupplierType,
        supplierNIF: purchaseOrder.supplierNIF,
        supplierResponsible: purchaseOrder.supplierResponsible,
        supplierAddress: purchaseOrder.supplierAddress,
        ivaState: purchaseOrder.iva._id,
        ivaCountry: purchaseOrder.iva.stateCountry.country.countryName,
        ivaCountryId: purchaseOrder.iva.stateCountry.country.countryId,
        iva: purchaseOrder.iva,
        nbrConcepts: purchaseOrder.nbrConcepts,
        termsListe: purchaseOrder.termsListe,
        itemNames: purchaseOrder.itemNames,
        description: purchaseOrder.description,
        unityValue: purchaseOrder.unityValue,
        unity: purchaseOrder.unity,
        valor: purchaseOrder.valor,
        unityNumber: purchaseOrder.unityNumber,
        givingDate: purchaseOrder.givingDate,
        paymentDate: purchaseOrder.paymentDate,
        billingDate: purchaseOrder.billingDate,
        termTitle: purchaseOrder.termTitle,
        termDescription: purchaseOrder.termDescription,
        totalEuro: purchaseOrder.totalEuro,
        totalLocal: purchaseOrder.totalLocal,
        valueIVAEuro: purchaseOrder.valueIVAEuro,
        valueIVALocal: purchaseOrder.valueIVALocal,
        totalAmountEuro: purchaseOrder.totalAmountEuro,
        totalAmountLocal: purchaseOrder.totalAmountLocal,
        factor: purchaseOrder.factor,
        ivaRetentions: purchaseOrder.ivaRetentions,
        totalAmountRetentions: purchaseOrder.totalAmountRetentions,
        totalIvaRetention: purchaseOrder.totalIvaRetention,
        paymentMethod: purchaseOrder.paymentMethod,
        localCurrency: purchaseOrder.currency._id,
        typeClient: purchaseOrder.typeClient,
        clientId: purchaseOrder.client._id,
        contractId: purchaseOrder.typeClient === 'contract' ? purchaseOrder.financialContract._id : '',
        haveExternal: purchaseOrder.type === 'external',
        haveInternal: purchaseOrder.type === 'internal',
        poClient: purchaseOrder.typeClient === 'po',
        contractClient: purchaseOrder.typeClient === 'contract',
        openPopUp: true
      });
      IvaService.getIvaStates(purchaseOrder.iva.stateCountry.country.countryName).then(results => {
        console.log(results.data);
        this.setState({ ivaStates: results.data });
      });
    });
  }

  handleDelete = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].purchaseOrderId;
    PurchaseOrderService.deletePurchaseOrder(id).then(result => {
      this.setState({ datas: result.data });
    });
  };

  handleSave = () => {
    const {
      purchaseOrderId, companyDataEmit, companyLogo, companyNIF, companyAddress, purchaseNumber,
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
    const iva = { _id: ivaState };
    const client = { _id: clientId };
    let financialContract = { _id: '' };
    if (typeClient === 'contract') financialContract = { _id: contractId };
    const PurchaseOrder = {
      purchaseOrderId,
      purchaseNumber,
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
    PurchaseOrderService.updatePurchaseOrder(PurchaseOrder).then(result => {
      this.setState({ datas: result.data, openPopUp: false });
    });
  };

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
          ivaState: id, valueIVALocal: (iva * local) / 100, valueIVAEuro: ((iva * local) / 100) * factor, totalAmountLocal: local + ((iva * local) / 100), totalAmountEuro: (local + ((iva * local) / 100)) * factor
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
        val.map(row => { total += Number(row); });
        this.setState({ unityNumber: tab, valor: val, totalLocal: Number(total) });
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

    handleClose = () => {
      this.setState({ openPopUp: false, openPrint: false });
    };

    handleClose2 = () => {
      this.setState({ openPrint2: false });
    };

    render() {
      console.log(this.state);
      const { classes } = this.props;
      const {
        datas, columns, openPopUp,
        companyDataEmit, companyLogo, companyNIF, companyAddress, receptionSupplierType,
        receptionSupplierExternal, receptionSupplierInternal, supplierNIF, supplierResponsible, supplierAddress,
        externalSuppliers, companies, currencies, ivasCountries, internLogo,
        nbrConcepts, unityValue, description, itemNames, unity, valor, unityNumber, givingDate, paymentDate, billingDate,
        termsListe, termDescription, termTitle, purchaseOrder2, openPrint2,
        paymentMethod, ivaStates, ivaRetentions, totalAmountRetentions, totalIvaRetention,
        localCurrency, totalLocal, totalEuro, ivaCountry, ivaState, valueIVALocal, valueIVAEuro, totalAmountLocal, totalAmountEuro,
        contractClient, poClient, typeClient, clients, clientId, contractsClient, contractId
      } = this.state;
      const {
        logedUser
      } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_purchaseOrderAcceptance_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        print: exportButton,
        downloadOptions: { filename: 'Purchase order management.csv' },
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add Purchase-Order"
            tooltip="Add New Purchase Order"
            fileName="Purchase order management"
            hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_purchaseOrderAcceptance_create}
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_purchaseOrderAcceptance_export}
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Purchase Order List"
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
            fullWidth=""
            maxWidth=""
          >
            <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
            <DialogContent dividers>
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
                    <InputLabel>Company Data Emit</InputLabel>
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
                      <Avatar alt="Company Logo" src={companyLogo} className={classes.small} />
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
                            <Avatar alt="Company Logo" src={internLogo} className={classes.medium} />
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
                          InputLabelProps={{
                            shrink: true,
                          }}
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
                          InputLabelProps={{
                            shrink: true,
                          }}
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
          <Dialog
            open={openPrint2}
            keepMounted
            scroll="body"
            onClose={this.handleClose2}
            aria-labelledby="alert-slide-title"
            aria-describedby="alert-slide-description"
            fullWidth=""
            maxWidth=""
          >
            <DialogTitle id="alert-dialog-title"> Print Purchase Order</DialogTitle>
            <DialogContent dividers>
              {/* eslint-disable-next-line no-return-assign */}
              <div ref={el => (this.componentRef = el)} id="newTest" style={{ display: 'block' }}>
                <PrintPurchaseOrder2 Purchase={purchaseOrder2} />
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose2}>
                Cancel
              </Button>
              <PrintButton id="newTest" label="Print Purchase Order" purchase={purchaseOrder2} />
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
PurchaseOrderBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser'),
});

const ExternalSuppliersBlockMapped = connect(
  mapStateToProps,
)(PurchaseOrderBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ExternalSuppliersBlockMapped changeTheme={changeTheme} classes={classes} />;
};
