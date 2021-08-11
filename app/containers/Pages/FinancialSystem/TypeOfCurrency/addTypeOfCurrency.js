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
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../../../utils/history';
import TypeOfCurrencylService from '../../../Services/TypeOfCurrencylService';

import { ThemeContext } from '../../../App/ThemeWrapper';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles();

class AddTypeOfCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyCode: '',
      currencyName: '',
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    handleSubmit = () => {
      let {
        currencyName, currencyCode
      } = this.state;
      currencyName = currencyName.toUpperCase();
      currencyCode = currencyCode.toUpperCase();
      const TypeOfCurrency = {
        currencyName, currencyCode
      };
      const code = currencyCode.toString();
      if (code.length < 4) {
        TypeOfCurrencylService.saveTypeOfCurrency(TypeOfCurrency).then(result => {
          if (result.status === 200) {
            notification('success', 'Type of currency Added');
          } else {
            notification('danger', 'Type of currency not Added');
          }
          history.push('/app/gestion-financial/Currency-Type');
        })
          .catch(err => notification('danger', err.response.data.errors.message));
      }
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Currency-Type');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const title = brand.name + ' - Add New Currency';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        currencyName, currencyCode
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
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={4}>
                <TextField
                  id="currencyName"
                  label="Currency Name"
                  variant="outlined"
                  name="currencyName"
                  value={currencyName}
                  required
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="currencyCode"
                  label="Currency Code"
                  variant="outlined"
                  name="currencyCode"
                  value={currencyCode}
                  required
                  fullWidth
                  onChange={this.handleChange}
                />
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

const AddCurrencyMapped = connect()(AddTypeOfCurrency);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddCurrencyMapped changeTheme={changeTheme} classes={classes} />;
};
