import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, TextField } from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../../../utils/history';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles();

class AddExternalSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCountry } = this.props;
    getAllCountry();
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
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

    handleSubmit = () => {
      const {
        code, companyName, firstName, fatherFamilyName, motherFamilyName, email, currentCity, postCode, fullAddress, taxNumber, url
      } = this.state;
      const city = { _id: currentCity };
      const cityId = currentCity
      const address = {
        postCode, city, fullAddress
      };
      const ExternalSupplier = {
        companyName, code, firstName, fatherFamilyName, motherFamilyName, url, taxNumber, email, address, cityId, fullAddress
      };
      ExternalSuppliersService.saveExternalSuppliers(ExternalSupplier).then(result => {
        if (result.status === 200) {
          notification('success', 'External suppliers Added');
        }
        history.push('/app/gestion-financial/External-Suppliers');
      })
        .catch(err => notification('danger', err.response.data.errors));
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/External-Suppliers');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      console.log(this.state);
      const title = brand.name + ' - Add New External Supplier';
      const { desc } = brand;
      const {
        // eslint-disable-next-line react/prop-types
        allCountrys, allStateCountrys, allCitys, classes
      } = this.props;
      // eslint-disable-next-line react/prop-types
      const {
        code, companyName, firstName, fatherFamilyName, motherFamilyName, email,
        postCode, fullAddress, taxNumber, url
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
            title="Add External Supplier "
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
                  inputProps={{ maxLength: 10 }}
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
                  label="Responsible First Name"
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
                  inputProps={{ maxLength: 10 }}
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
                  onChange={this.handleChangeCountry}
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
                  name="postCode"
                  className={classes.textField}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
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
AddExternalSupplier.propTypes = {
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
  getAllCityByState
}, dispatch);

const AddExternalSupplierMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExternalSupplier);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddExternalSupplierMapped changeTheme={changeTheme} classes={classes} />;
};
