import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  Grid, TextField, Typography
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../../../utils/history';
import SuppliersTypeService from '../../../Services/SuppliersTypeService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import notification from '../../../../components/Notification/Notification';

const useStyles = makeStyles();

class AddSuppliersType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      operationAssociated: false,
      internalOrder: false,
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
      const {
        name, description, operationAssociated, internalOrder
      } = this.state;
      const SupplierType = {
        name, description, operationAssociated, internalOrder
      };
      SuppliersTypeService.saveSuppliersType(SupplierType).then(result => {
        if (result.status === 200) {
          notification('success', 'Supplier type Added');
        }
        history.push('/app/gestion-financial/Suppliers-Type');
      })
        .catch(err => notification('danger', err.response.data.errors));
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Suppliers-Type');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleCheck = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.operationAssociated;
      this.setState({ operationAssociated: ok });
    }

    handleCheck2 = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.internalOrder;
      this.setState({ internalOrder: ok });
    }

    render() {
      const title = brand.name + ' - Add New Supplier Type';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        name, description, operationAssociated, internalOrder
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
            title="Supplier Type "
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
            <br />
            <Typography variant="subtitle2" component="h2" color="primary" align="center" />
            <br />
            <Grid
              container
              spacing={6}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={10} md={6}>
                <TextField
                  id="outlined-name"
                  label="Supplier type name"
                  variant="outlined"
                  name="name"
                  value={name}
                  required
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={10} md={6}>
                <TextField
                  id="outlined-description"
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={description}
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={6}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={10} md={6}>
                <FormControlLabel
                  id="operationAssociated"
                  name="operationAssociated"
                  value={operationAssociated}
                  control={<Checkbox color="primary" onChange={this.handleCheck} />}
                  label="● Associated with Commercial Operation "
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  id="internalOrder"
                  name="internalOrder"
                  value={internalOrder}
                  control={<Checkbox color="primary" onChange={this.handleCheck2} />}
                  label="● Had an Internal Order"
                  labelPlacement="start"
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


const AddSuppliersTypeMapped = connect(
)(AddSuppliersType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddSuppliersTypeMapped changeTheme={changeTheme} classes={classes} />;
};
