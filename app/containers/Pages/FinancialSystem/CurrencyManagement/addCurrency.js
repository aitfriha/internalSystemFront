import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  FormControl,
  Grid, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../../../utils/history';
import CurrencyService from '../../../Services/CurrencyService';
import TypeOfCurrencylService from '../../../Services/TypeOfCurrencylService';

import { ThemeContext } from '../../../App/ThemeWrapper';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles();

class AddCurrency extends React.Component {
  constructor(props) {
    super(props);
    const year = (new Date()).getFullYear();
    this.years = Array.from(new Array(20), (val, index) => index + year);
    this.state = {
      currencies: [],
      currencyCode: '',
      currencyName: '',
      year: '',
      month: '',
      changeFactor: '',
    };
  }

  componentDidMount() {
    TypeOfCurrencylService.getTypeOfCurrency().then(result => {
      this.setState({ currencies: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    handleSubmit = () => {
      const {
        year, month, changeFactor, currencyName
      } = this.state;
      const typeOfCurrency = { _id: currencyName };
      const currencyCode = currencyName;
      const Currency = {
        year, month, changeFactor, typeOfCurrency, currencyCode
      };
      CurrencyService.saveCurrency(Currency).then(result => {
        if (result.status === 200) {
          notification('success', 'Currency Added');
        }
        history.push('/app/gestion-financial/Currency-Management');
      })
        .catch(err => notification('danger', err.response.data.errors));
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Currency-Management');
    }

    handleChange = (ev) => {
      const { currencies } = this.state;
      if (ev.target.name === 'currencyName') {
        // eslint-disable-next-line array-callback-return
        currencies.map(row => {
          if (row.typeOfCurrencyId === ev.target.value) this.setState({ currencyCode: row.currencyCode });
        });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const months = [
        {
          value: 1,
          label: 'January ',
        },
        {
          value: 2,
          label: 'February ',
        },
        {
          value: 3,
          label: 'March ',
        },
        {
          value: 4,
          label: 'April ',
        },
        {
          value: 5,
          label: 'May ',
        },
        {
          value: 6,
          label: 'June ',
        },
        {
          value: 7,
          label: 'July ',
        },
        {
          value: 8,
          label: 'August ',
        },

        {
          value: 9,
          label: 'September ',
        },
        {
          value: 10,
          label: 'October ',
        },
        {
          value: 11,
          label: 'November ',
        },
        {
          value: 12,
          label: 'December ',
        }];
      const title = brand.name + ' - Add New Currency';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        currencyName, currencyCode, year, month, changeFactor, currencies
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
            title="New Currency "
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
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Select Currency </InputLabel>
                  <br />
                  <Select
                    name="currencyName"
                    value={currencyName}
                    variant="outlined"
                    onChange={this.handleChange}
                  >
                    {
                      currencies.map((clt) => (
                        <MenuItem key={clt.typeOfCurrencyId} value={clt.typeOfCurrencyId}>
                          {clt.currencyName}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <br />
                <TextField
                  id="currencyCode"
                  label="Currency Code"
                  variant="outlined"
                  name="currencyCode"
                  value={currencyCode}
                  required
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <br />
                <TextField
                  id="changeFactor"
                  label=" Change Factor "
                  variant="outlined"
                  name="changeFactor"
                  type="number"
                  value={changeFactor}
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={10} md={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Year</InputLabel>
                  <Select
                    name="year"
                    value={year}
                    onChange={this.handleChange}
                  >
                    {
                      this.years.map((clt) => (
                        <MenuItem key={clt} value={clt}>
                          {clt}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={10} md={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Month</InputLabel>
                  <Select
                    name="month"
                    value={month}
                    onChange={this.handleChange}
                  >
                    {
                      months.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
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

const AddCurrencyMapped = connect()(AddCurrency);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddCurrencyMapped changeTheme={changeTheme} classes={classes} />;
};
