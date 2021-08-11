import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  Grid, TextField
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Tooltip from '@material-ui/core/Tooltip';
import { ThemeContext } from '../../../App/ThemeWrapper';
import history from '../../../../utils/history';
import ContractStatusService from '../../../Services/ContractStatusService';

const useStyles = makeStyles();

class AddStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: 0,
      statusName: '',
      datas: [],
      description: ''
    };
  }

  componentDidMount() {
    ContractStatusService.getContractStatus().then(result => {
      this.setState({ datas: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    handleSubmit = () => {
      const {
        statusCode, statusName, description, datas
      } = this.state;
      let exist = false;
      const ContractStatus = {
        statusCode, statusName, description
      };
      datas.map(row => {
        if (row.statusCode === 10) exist = true;
      });
      if (statusCode !== '10' || !exist) {
        ContractStatusService.saveContractStatus(ContractStatus).then(result => {
          console.log(result);
          history.push('/app/gestion-financial/Contract-Status');
        });
      }
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Contract-Status');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const title = brand.name + ' - Add Status';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        statusCode,
        statusName,
        description
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
            title="New Contract Status"
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
              spacing={10}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="Status Code"
                  type="number"
                  variant="outlined"
                  name="statusCode"
                  value={statusCode}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Status Name"
                  variant="outlined"
                  name="statusName"
                  value={statusName}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Description "
                  multiline
                  variant="outlined"
                  name="description"
                  value={description}
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <br />
              </Grid>
            </Grid>
            <div align="center">
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
AddStatus.propTypes = {
  classes: PropTypes.object.isRequired
};
const StatusBlockMapped = connect()(AddStatus);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <StatusBlockMapped changeTheme={changeTheme} classes={classes} />;
};
