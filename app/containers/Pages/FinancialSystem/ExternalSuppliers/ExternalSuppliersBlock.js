import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../../App/ThemeWrapper';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import styles from '../Company/companies-jss';

const useStyles = makeStyles(styles);

class ExternalSuppliersBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      externalSupplierId: '',
      cityId: '',
      code: '',
      companyName: '',
      firstName: '',
      fatherFamilyName: '',
      motherFamilyName: '',
      email: '',
      currentCity: '',
      postCode: '',
      fullAddress: '',
      taxNumber: '',
      url: '',
      openPopUp: false,
      addressId: '',
      datas: [],
      city: {},
      keyCountry: {},
      keyState: {},
      keyCity: {},
      columns: [
        {
          name: 'code',
          label: 'Code',
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
          name: 'companyName',
          label: 'Company Name',
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
          name: 'firstName',
          label: 'Responsible First Name',
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
          name: 'fatherFamilyName',
          label: 'Father Family Name',
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
          name: 'motherFamilyName',
          label: 'Mother Family Name',
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
          name: 'email',
          label: 'Email',
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
          name: 'taxNumber',
          label: 'Tax Number (NIF)',
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
          label: 'Company URL',
          name: 'url',
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
          label: 'Address',
          name: 'address.fullAddress',
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
            customBodyRender: (fullAddress) => (
              <React.Fragment>
                {
                  fullAddress || ''
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Country',
          name: 'address.city.stateCountry.country.countryName',
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
            customBodyRender: (countryName) => (
              <React.Fragment>
                {
                  countryName || ' '
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'address.city.stateCountry.stateName',
          label: 'State',
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
            customBodyRender: (stateName) => (
              <React.Fragment>
                {
                  stateName || ' '
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'address.city.cityName',
          label: 'City',
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
            customBodyRender: (cityName) => (
              <React.Fragment>
                {
                  cityName || ''
                }
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
                {thelogedUser.userRoles[0].actionsNames.financialModule_externalSuppliers_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_externalSuppliers_delete ? (
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
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCountry } = this.props;
    getAllCountry();
    ExternalSuppliersService.getExternalSuppliers().then(result => {
      console.log(result);
      this.setState({ datas: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

  // eslint-disable-next-line react/sort-comp
  handleDetails = (tableMeta) => {
    const {
      getAllStateByCountry, getAllCityByState, allCountrys, allStateCountrys, allCitys
    } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].externalSupplierId;
    ExternalSuppliersService.getExternalSuppliersById(id).then(result => {
      const externalSupplier = result.data;
      this.setState({
        externalSupplierId: id,
        companyName: externalSupplier.companyName,
        code: externalSupplier.code,
        taxNumber: externalSupplier.taxNumber,
        email: externalSupplier.email,
        firstName: externalSupplier.firstName,
        fatherFamilyName: externalSupplier.fatherFamilyName,
        motherFamilyName: externalSupplier.motherFamilyName,
        url: externalSupplier.url,
        address: externalSupplier.address,
        currentCity: externalSupplier.address.city._id,
        addressId: externalSupplier.address.addressId,
        postCode: externalSupplier.address.postCode,
        fullAddress: externalSupplier.address.fullAddress,
        openPopUp: true
      });
      if (externalSupplier.address) {
        getAllStateByCountry(externalSupplier.address.city.stateCountry.country.countryId);
        getAllCityByState(externalSupplier.address.city.stateCountry._id);
        if (externalSupplier.address.city.stateCountry.country) {
          for (const key in allCountrys) {
            if (allCountrys[key].countryName === externalSupplier.address.city.stateCountry.country.countryName) {
              this.setState({ keyCountry: allCountrys[key] });
              break;
            }
          }
        }
        if (externalSupplier.address.city.stateCountry) {
          for (const key in allStateCountrys) {
            if (allStateCountrys[key].stateCountryId === externalSupplier.address.city.stateCountry._id) {
              this.setState({ keyState: allStateCountrys[key] });
              break;
            }
          }
        }
        if (externalSupplier.address.city) {
          for (const key in allCitys) {
            if (allCitys[key].cityName === externalSupplier.address.city.cityName) {
              this.setState({ keyCity: allCitys[key], cityId: allCitys[key].cityId });
              break;
            }
          }
        }
      }
    });
  }

  handleDelete = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].externalSupplierId;
    ExternalSuppliersService.deleteExternalSuppliers(id).then(result => {
      this.setState({ datas: result.data });
    });
  };

  handleSave = () => {
    const {
      externalSupplierId, code, companyName, firstName, fatherFamilyName, motherFamilyName, email, currentCity, postCode, fullAddress, taxNumber, url, addressId
    } = this.state;
    const city = { _id: currentCity };
    const address = {
      addressId, postCode, city, fullAddress
    };
    const ExternalSupplier = {
      externalSupplierId, companyName, code, firstName, fatherFamilyName, motherFamilyName, url, taxNumber, email, address
    };
    ExternalSuppliersService.updateExternalSuppliers(ExternalSupplier).then(result => {
      this.setState({ datas: result.data, openPopUp: false });
    });
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  handleChangeCountry = (ev, value) => {
    const { getAllStateByCountry } = this.props;
    getAllStateByCountry(value.countryId);
    this.setState({ keyCountry: value });
  };

  handleChangeState = (ev, value) => {
    const { getAllCityByState } = this.props;
    getAllCityByState(value.stateCountryId);
    this.setState({ keyState: value });
  };

  handleChangeCity = (ev, value) => {
    this.setState({ cityId: value.cityId, keyCity: value, currentCity: value.cityId });
  };

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      allCountrys, allStateCountrys, allCitys, classes, logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_export) {
      exportButton = true;
    }
    const {
      datas, columns, openPopUp,
      code, companyName, firstName, fatherFamilyName, motherFamilyName, email,
      postCode, fullAddress, taxNumber, url, keyCountry, keyState, keyCity
    } = this.state;
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
          url="/app/gestion-financial/Add-External Suppliers"
          tooltip="Add New External Supplier"
          fileName="External suppliers"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_export}
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The External Supplier List"
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
              spacing={10}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={4}>
                <Chip label="General Information" avatar={<Avatar>G</Avatar>} color="primary" />
                <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
                <TextField
                  label="External Supplier Code"
                  variant="outlined"
                  name="code"
                  value={code}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  label="Company Name"
                  variant="outlined"
                  name="companyName"
                  value={companyName}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  label="Responsible's First Name"
                  variant="outlined"
                  name="firstName"
                  value={firstName}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  label="Father Family Name"
                  variant="outlined"
                  name="fatherFamilyName"
                  value={fatherFamilyName}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  label="Mother Family Name"
                  variant="outlined"
                  name="motherFamilyName"
                  value={motherFamilyName}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Tax Number (NIF)"
                  variant="outlined"
                  name="taxNumber"
                  value={taxNumber}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  label="Company URL"
                  variant="outlined"
                  name="url"
                  value={url}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Chip label="Supplier Address" avatar={<Avatar>S</Avatar>} color="primary" />
                <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
                <Autocomplete
                  id="combo-box-demo"
                  options={allCountrys}
                  getOptionLabel={option => option.countryName}
                  value={allCountrys.find(v => v.countryName === keyCountry.countryName) || ''}
                  onChange={this.handleChangeCountry}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the country"
                      variant="outlined"
                    />
                  )}
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={allStateCountrys}
                  getOptionLabel={option => option.stateName}
                  value={allStateCountrys.find(v => v.stateName === keyState.stateName) || ''}
                  onChange={this.handleChangeState}
                  style={{ marginTop: 15 }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the state"
                      variant="outlined"
                    />
                  )}
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={allCitys}
                  getOptionLabel={option => option.cityName}
                  value={allCitys.find(v => v.cityName === keyCity.cityName) || ''}
                  onChange={this.handleChangeCity}
                  style={{ marginTop: 15 }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the city"
                      variant="outlined"
                    />
                  )}
                />
                <br />
                <TextField
                  id="fullAddress"
                  label="Name of address"
                  variant="outlined"
                  name="fullAddress"
                  value={fullAddress}
                  fullWidth
                  required
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Post Code"
                  variant="outlined"
                  fullWidth
                  value={postCode}
                  required
                  name="postCode"
                  className={classes.textField}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
                Cancel
            </Button>
            {thelogedUser.userRoles[0].actionsNames.financialModule_externalSuppliers_modify ? (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                save
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
ExternalSuppliersBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  add: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  back: PropTypes.func.isRequired
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
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCountry,
  getAllStateByCountry,
  getAllCityByState,
}, dispatch);

const ExternalSuppliersBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalSuppliersBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ExternalSuppliersBlockMapped changeTheme={changeTheme} classes={classes} />;
};
