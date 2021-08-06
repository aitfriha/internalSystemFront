import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
  Dialog, DialogContent, DialogTitle
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import EditContract from './editContract';
import ContractService from '../../../Services/ContractService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import styles from './contract-jss';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';

const useStyles = makeStyles(styles);

class ContractBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      openPopUp: false,
      contract: {},
      datas: [],
      columns: [
        {
          label: ' ',
          name: 'isActive',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                <IconButton>
                  <RadioButtonUncheckedIcon style={{
                    backgroundColor: value === 'Yes' ? 'green' : (value === 'Zombie' ? 'gray' : 'red'),
                    color: value === 'Yes' ? 'green' : (value === 'Zombie' ? 'gray' : 'red'),
                    borderRadius: '100%'
                  }}
                  />
                </IconButton>
              </React.Fragment>
            )
          }
        },
        {
          label: 'Title',
          name: 'contractTitle',
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
            })
          }
        },
        {
          name: 'client.name',
          label: 'Client',
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
                { value }
              </React.Fragment>
            )
          }
        },
        {
          name: 'commercialOperation.name',
          label: 'Operation',
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
                { value }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Company',
          name: 'financialCompany.name',
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
                { value }
              </React.Fragment>
            )
          }
        },
        {
          label: 'State',
          name: 'contractStatus.statusName',
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
                { value }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Signed Date',
          name: 'signedDate',
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
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Start Date',
          name: 'startDate',
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
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'finalReelDate',
          label: 'End Date',
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
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'duration',
          label: 'Duration',
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
            })
          }
        },
        {
          name: 'conceptTotalAmount',
          label: 'Amount ',
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
            })
          }
        },
        {
          label: 'Currency',
          name: 'currency.typeOfCurrency.currencyCode',
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
                { value }
              </React.Fragment>
            )
          }
        },
        {
          name: 'conceptTotalAmountEuro',
          label: 'Amount (€)',
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
            })
          }
        },
        {
          name: 'penaltyValue',
          label: 'penalties',
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
            customBodyRender: (penaltyValue) => (
              <React.Fragment>
                { penaltyValue.length > 1 ? 'Yes' : 'No' }
              </React.Fragment>
            )
          }
        },
        {
          name: 'amountInsured',
          label: 'Insure',
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
            customBodyRender: (amountInsured) => (
              <React.Fragment>
                { amountInsured > 0 ? 'Yes' : 'No' }
              </React.Fragment>
            )
          }
        },
        {
          name: 'purchaseOrderNumber',
          label: 'Purchase Order',
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
            customBodyRender: (purchaseOrderNumber) => (
              <React.Fragment>
                { purchaseOrderNumber.length > 1 ? 'Yes' : 'No' }
              </React.Fragment>
            )
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
                {thelogedUser.userRoles[0].actionsNames.financialModule_contracts_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_contracts_delete ? (
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
    ContractService.getContract().then(result => {
      // eslint-disable-next-line array-callback-return
      result.data.map(row => {
        const date1 = new Date(row.finalReelDate);
        const date2 = new Date(row.startDate);
        const durationS = date1.getTime() - date2.getTime();
        const durationM = Math.round(((durationS / 86400000) / 30) + 0.4);
        row.duration = durationM;
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length > 1) row.isActive = 'Yes';
        if (row.purchaseOrderNumber.length <= 1) row.isActive = 'No';
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length === 0) row.isActive = 'Zombie';
      });
      this.setState({ datas: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

  handleDetails = (tableMeta) => {
    const { getAllStateByCountry, getAllCityByState } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].financialContractId;
    ContractService.getContractById(id).then(result => {
      const contract = result.data;
      getAllStateByCountry(contract.address.city.stateCountry.country.countryId);
      getAllCityByState(contract.address.city.stateCountry._id);
      this.setState({ openPopUp: true, contract });
    });
  }

  handleDelete = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].financialContractId;
    ContractService.deleteContract(id).then(result => {
      // eslint-disable-next-line array-callback-return
      result.data.map(row => {
        const date1 = new Date(row.finalReelDate);
        const date2 = new Date(row.startDate);
        const durationS = date1.getTime() - date2.getTime();
        const durationM = Math.round(((durationS / 86400000) / 30) + 0.4);
        row.duration = durationM;
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length > 1) row.isActive = 'Yes';
        if (row.purchaseOrderNumber.length <= 1) row.isActive = 'No';
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length === 0) row.isActive = 'Zombie';
      });
      this.setState({ datas: result.data });
    });
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  myCallback = (dataFromChild) => {
    ContractService.getContract().then(result => {
      // eslint-disable-next-line array-callback-return
      result.data.map(row => {
        const date1 = new Date(row.finalReelDate);
        const date2 = new Date(row.startDate);
        const durationS = date1.getTime() - date2.getTime();
        const durationM = Math.round(((durationS / 86400000) / 30) + 0.4);
        row.duration = durationM;
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length > 1) row.isActive = 'Yes';
        if (row.purchaseOrderNumber.length <= 1) row.isActive = 'No';
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length === 0) row.isActive = 'Zombie';
      });
      this.setState({ datas: result.data, openPopUp: dataFromChild });
      console.log(this.state);
    });
  };

  render() {
    const {
      datas, columns, openPopUp, contract
    } = this.state;
    const {
      allStateCountrys, allCitys, logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.financialModule_contracts_export) {
      exportButton = true;
    }
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      download: exportButton,
      print: exportButton,
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={datas}
          url="/app/gestion-financial/Add-Contract"
          tooltip="add new Contract"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_contracts_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_contracts_export}
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="Client Contracts List"
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
            <EditContract Info={contract} allStateCountrys={allStateCountrys} allCitys={allCitys} callbackFromParent={this.myCallback} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // country
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
  logedUser: localStorage.getItem('logedUser'),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllStateByCountry,
    getAllCityByState
  },
  dispatch
);
const ContractBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(ContractBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ContractBlockMapped changeTheme={changeTheme} classes={classes} />;
};
