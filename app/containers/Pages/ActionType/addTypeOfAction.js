import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { connect } from 'react-redux';
import history from '../../../utils/history';
import ActionTypeService from '../../Services/ActionTypeService';
import { ThemeContext } from '../../App/ThemeWrapper';
import notification from '../../../components/Notification/Notification';

class AddTypeOfAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeName: '',
      description: '',
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('redTheme');
  }

    handleSubmit = () => {
      const {
        typeName, description, percentage
      } = this.state;
      const ActionType = {
        typeName, description, percentage
      };
      ActionTypeService.saveActionType(ActionType).then(result => {
        notification('success', 'Added');
        history.push('/app/gestion-commercial/Action-Type');
      }, () => { notification('danger', 'duplicated'); });
    }

    handleGoBack = () => {
      history.push('/app/gestion-commercial/Action-Type');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const title = brand.name + ' - Add New Commercial Action Type';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        typeName, description, percentage
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
            title="New Commercial Action Type "
            desc="Please, Fill in the fields"
            icon="ios-add-circle"
          >
            <Grid container spacing={1}>
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton onClick={() => this.handleGoBack()}>
                  <KeyboardBackspaceIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={6}>
                <TextField
                  id="typeName"
                  label="Action Type Name"
                  variant="outlined"
                  name="typeName"
                  value={typeName}
                  required
                  fullWidth
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={description}
                  required
                  fullWidth
                  multiline
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  id="percentage"
                  label="Percentage"
                  variant="outlined"
                  name="percentage"
                  value={percentage}
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
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

const AddTypeOfActionMapped = connect()(AddTypeOfAction);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  return <AddTypeOfActionMapped changeTheme={changeTheme} />;
};
