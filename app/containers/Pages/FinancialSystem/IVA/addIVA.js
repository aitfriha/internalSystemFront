import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  Grid, TextField, Typography
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeContext } from '../../../App/ThemeWrapper';
import history from '../../../../utils/history';
import IvaService from '../../../Services/IvaService';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles();

class AddIVA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ivaCode: '',
      state: '',
      value: '',
      startingDate: null,
      endingDate: null,
      electronicInvoice: false
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
    this.setState({ state: value.stateCountryId });
  };

    handleSubmit = () => {
      const {
        ivaCode, value, state, startingDate, endingDate, electronicInvoice
      } = this.state;
      const stateCountry = { _id: state };
      const stateCountryId = state;
      const Iva = {
        ivaCode, value, startingDate, endingDate, electronicInvoice, stateCountry, stateCountryId
      };
      IvaService.saveIva(Iva).then(result => {
        if (result.status === 200) {
          notification('success', 'iva Added');
        }
        history.push('/app/gestion-financial/IVA');
      })
        .catch(err => notification('danger', err.response.data.errors));
    }


    handleGoBack = () => {
      history.push('/app/gestion-financial/IVA');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

  handleChangeDate = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  handleChangeIVA = (ev) => {
    this.setState({ [ev.target.name]: parseInt(ev.target.value, 10) });
  };

    handleCheck = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.electronicInvoice;
      this.setState({ electronicInvoice: ok });
    }

    render() {
      const {
        // eslint-disable-next-line react/prop-types
        allCountrys, allStateCountrys
      } = this.props;
      console.log(this.state);
      const title = brand.name + ' - Add I.V.A';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        value, startingDate, endingDate, electronicInvoice, ivaCode
      } = this.state;
      const { classes } = this.props;
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
            title="New I.V.A Taxe"
            desc="Please, Fill in the all field"
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
              spacing={3}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={12} sm={12}>
                <Typography variant="subtitle2" component="h2" color="primary">
                I.V.A Information
                </Typography>
              </Grid>
              <Grid item xs={12} md={2} sm={2}>
                <br />
                <TextField
                  id="ivaCode"
                  label="I.V.A Code"
                  variant="outlined"
                  name="ivaCode"
                  value={ivaCode}
                  inputProps={{ maxLength: 10 }}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
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
              <Grid item xs={12} md={4} sm={4}>
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
              <Grid item xs={12} md={2} sm={2}>
                <br />
                <TextField
                  id="value"
                  label="I.V.A Value %"
                  variant="outlined"
                  name="value"
                  step="5"
                  type="number"
                  value={value}
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                  fullWidth
                  onChange={this.handleChangeIVA}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  id="electronicInvoice"
                  name="electronicInvoice"
                  value={electronicInvoice}
                  control={<Checkbox color="primary" onChange={this.handleCheck} />}
                  label="Electronic Invoice"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <br />
                <Typography variant="subtitle2" component="h2" color="primary">
                I.V.A Dates
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    inputProps={{ readOnly: true }}
                    format="dd/MM/yyyy"
                    margin="normal"
                    inputVariant="outlined"
                    id="date-picker-inline"
                    name="startingDate"
                    label="Starting Date"
                    value={startingDate}
                    onChange={value => this.handleChangeDate(value, 'startingDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    fullWidth
                    required
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              {/*   <Grid item xs={12} md={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    inputProps={{ readOnly: true }}
                    format="dd/MM/yyyy"
                    margin="normal"
                    inputVariant="outlined"
                    id="date-picker-inline"
                    name="endingDate"
                    label="Ending Date "
                    value={endingDate}
                    onChange={value => this.handleChangeDate(value, 'endingDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>

              </Grid> */}
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
AddIVA.propTypes = {
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
const AddIVAMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIVA);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddIVAMapped changeTheme={changeTheme} classes={classes} />;
};
