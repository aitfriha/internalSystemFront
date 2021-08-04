import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ThemeContext } from '../../../App/ThemeWrapper';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import styles from './companies-jss';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class CompaniesBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      openPopUpDelete: false,
      companyToDeleteId: '',
      financialCompanyId: '',
      cityId: '',
      name: '',
      code: '',
      taxNumber: '',
      email: '',
      phone1: '',
      phone2: '',
      logo: '',
      address: [],
      postCode: '',
      fullAddress: '',
      openPopUp: false,
      currentCity: '',
      addressId: '',
      datas: [],
      city: {},
      keyCountry: {},
      keyState: {},
      keyCity: {},
      columns: [
        {
          name: 'logo',
          label: 'Logo',
          options: {
            filter: true,
            customBodyRender: (value) => {
              const { classes } = this.props;
              return (
                <React.Fragment>
                  <Avatar alt="User Name" src={value} className={classes.medium} />
                </React.Fragment>
              );
            }
          }
        },
        {
          name: 'name',
          label: 'Name',
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
          label: 'Phone 1',
          name: 'phone1',
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
          label: 'Phone 2',
          name: 'phone2',
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
          name: 'address',
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
            customBodyRender: (address) => (
              <React.Fragment>
                {
                  address ? address.fullAddress : ''
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Country',
          name: 'address',
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
            customBodyRender: (address) => (
              <React.Fragment>
                {
                  address ? address.city.stateCountry.country.countryName : ' '
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'address',
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
            customBodyRender: (address) => (
              <React.Fragment>
                {
                  address ? address.city.cityName : ' '
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'address',
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
            customBodyRender: (address) => (
              <React.Fragment>
                {
                  address ? address.city.stateCountry.stateName : ' '
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
                {thelogedUser.userRoles[0].actionsNames.financialModule_companies_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_companies_delete ? (
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
    FinancialCompanyService.getCompany().then(result => {
      this.setState({ datas: result.data });
    });
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCountry } = this.props;
    getAllCountry();
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
    const id = this.state.datas[index].financialCompanyId;
    FinancialCompanyService.getCompanyById(id).then(result => {
      const company = result.data;
      this.setState({
        financialCompanyId: company._id,
        name: company.name,
        code: company.code,
        taxNumber: company.taxNumber,
        email: company.email,
        phone1: company.phone1,
        phone2: company.phone2,
        logo: company.logo,
        address: company.address,
        currentCity: company.address.city._id,
        addressId: company.address.addressId,
        postCode: company.address.postCode,
        fullAddress: company.address.fullAddress,
        openPopUp: true
      });
      if (company.address) {
        getAllStateByCountry(company.address.city.stateCountry.country.countryId);
        getAllCityByState(company.address.city.stateCountry._id);
        if (company.address.city.stateCountry.country) {
          for (const key in allCountrys) {
            if (allCountrys[key].countryName === company.address.city.stateCountry.country.countryName) {
              this.setState({ keyCountry: allCountrys[key] });
              break;
            }
          }
        }
        if (company.address.city.stateCountry) {
          for (const key in allStateCountrys) {
            if (allStateCountrys[key].stateCountryId === company.address.city.stateCountry._id) {
              this.setState({ keyState: allStateCountrys[key] });
              break;
            }
          }
        }
        if (company.address.city) {
          for (const key in allCitys) {
            if (allCitys[key].cityName === company.address.city.cityName) {
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
    this.setState({ openPopUpDelete: true });
    this.setState({ companyToDeleteId: this.state.datas[index].financialCompanyId });
  };

  handleSave = () => {
    const {
      financialCompanyId, name, code, taxNumber, email, phone1, phone2, logo, currentCity, postCode, fullAddress, addressId
    } = this.state;
    const city = { _id: currentCity };
    const address = {
      addressId, postCode, city, fullAddress
    };
    const FinancialCompany = {
      financialCompanyId, name, code, taxNumber, email, phone1, phone2, logo, address
    };
    FinancialCompanyService.updateCompany(FinancialCompany).then(result => {
      if (result.status === 200) {
        notification('success', 'company updated');
      }
      this.setState({ datas: result.data, openPopUp: false });
    })
      .catch(err => notification('danger', err.response.data.errors.message));
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  handleCloseDelete = () => {
    this.setState({ openPopUpDelete: false });
  };

  deleteConfirmeCompany= () => {
    const { companyToDeleteId } = this.state;
    this.setState({ openPopUpDelete: false });
    FinancialCompanyService.deleteCompany(companyToDeleteId).then(result => {
      if (result.status === 200) {
        notification('success', 'company deleted');
      } else {
        notification('danger', 'company not deleted');
      }
      this.setState({ datas: result.data });
    });
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

  // eslint-disable-next-line react/sort-comp
  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        this.setState({ logo: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChangeLogo = e => {
    this.readURI(e);
  };

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      allCountrys, allStateCountrys, allCitys, logedUser
    } = this.props;
    const {
      datas, columns, openPopUp,
      name, code, taxNumber, email, phone1, phone2, logo,
      postCode, fullAddress, keyCountry, keyState, keyCity, openPopUpDelete
    } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.financialModule_companies_export) {
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
          url="/app/gestion-financial/Company/Add-Company"
          tooltip="add new Company"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_companies_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_companies_export}
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The Companies List"
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
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={4}>
                <Chip label="General Information" avatar={<Avatar>G</Avatar>} color="primary" />
                <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      name="name"
                      value={name}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Code"
                      variant="outlined"
                      name="code"
                      value={code}
                      required
                      fullWidth
                      onChange={this.handleChange}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Tax Number (NIF)"
                      variant="outlined"
                      name="taxNumber"
                      value={taxNumber}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      name="email"
                      value={email}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="General Phone 1"
                      variant="outlined"
                      name="phone1"
                      value={phone1}
                      required
                      fullWidth
                      onChange={this.handleChange}
                      inputProps={{ pattern: '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$', maxLength: 13 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="General Phone 2"
                      variant="outlined"
                      name="phone2"
                      value={phone2}
                      required
                      fullWidth
                      onChange={this.handleChange}
                      inputProps={{ pattern: '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$', maxLength: 13 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                      Photo
                        </Button>
                      </FormLabel>
                    </FormControl>
                    {
                      logo ? (
                        <Avatar alt="User Name" src={logo} />
                      ) : (<div />)
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Chip label="Company Address" avatar={<Avatar>S</Avatar>} color="primary" />
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
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            {thelogedUser.userRoles[0].actionsNames.financialModule_companies_modify ? (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
              update
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
        <Dialog
          open={openPopUpDelete}
          keepMounted
          scroll="body"
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth=""
          maxWidth=""
        >
          <DialogTitle id="alert-dialog-slide-title"> Delete company </DialogTitle>
          <DialogContent dividers>
            Are you sure you want to delete this company ?
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleCloseDelete}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.deleteConfirmeCompany}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
CompaniesBlock.propTypes = {
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

const CompaniesBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompaniesBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <CompaniesBlockMapped changeTheme={changeTheme} classes={classes} />;
};
