import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { isString } from 'lodash';
import TextField from '@material-ui/core/TextField';
import notification from '../../../components/Notification/Notification';
import {
  addCommercialOperationStatus, deleteCommercialOperationStatus,
  getAllCommercialOperationStatus, updateCommercialOperationStatus
} from '../../../redux/commercialOperationStatus/actions';
import { ThemeContext } from '../../App/ThemeWrapper';

class StatusOfCommercialOperation extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      columns: [
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Name' + '*',
          field: 'name',
          /* cellStyle: { width: 100, maxWidth: 100 },
          headerStyle: { width: 130, maxWidth: 130 } */
        },
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Code' + '*',
          field: 'code',
          editComponent: props => (
            <TextField
              value={props.value}
              inputProps={{ maxLength: 10 }}
              onChange={(event) => { props.onChange(event.target.value); }}
            />
          )
        },
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Percentage in % ' + '*',
          field: 'percentage',

          editComponent: props => (
            <TextField
              value={props.value}
              type="number"
              inputProps={{ min: 0, max: 100 }}
              onChange={(event) => { props.onChange(event.target.value); }}
            />
          )
          /* cellStyle: { width: 155, maxWidth: 155 },
          headerStyle: { width: 180, maxWidth: 180 } */
        },
        {
          title: 'Description',
          field: 'description',
          /* cellStyle: { width: 155, maxWidth: 155 },
          headerStyle: { width: 100, maxWidth: 180 } */
        }
      ]
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCommercialOperationStatus, changeTheme } = this.props;
    changeTheme('redTheme');
    getAllCommercialOperationStatus();
  }

  onChange = (ev) => {
    this.setState({ code: ev });
  };

  render() {
    const title = brand.name + ' - Status Of Commercial Operation';
    const description = brand.desc;
    const {
      columns
    } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      errors, isLoading, commercialOperationStatusResponse, addCommercialOperationStatus, getAllCommercialOperationStatus, allCommercialOperationStatuss, updateCommercialOperationStatus, deleteCommercialOperationStatus, logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    let exporte = true;
    if (thelogedUser.userRoles[0].actionsNames.commercial_StateOfCommercialOperation_export == false) {
      exporte = false;
    }
    (!isLoading && commercialOperationStatusResponse) && this.editingPromiseResolve(commercialOperationStatusResponse);
    (!isLoading && !commercialOperationStatusResponse) && this.editingPromiseResolve(errors);
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Status Of Commercial Operation" desc="" noMargin>
          {/* <StatusOfCommercialOperationBlock onSelected={this.handleChangeSelectedStatus} status={status} /> */}
          <MaterialTable
            title=""
            columns={columns}
            data={allCommercialOperationStatuss && allCommercialOperationStatuss}
            options={{
              exportFileName: 'status of Commercial operation',
              filtering: true,
              // draggable: true,
              exportButton: exporte,
              pageSize: 10,
              // grouping: true,
              actionsCellStyle: {
              //  paddingLeft: 30,
                // width: 120,
                //   maxWidth: 120,
              },
              actionsColumnIndex: -1
            }}

            editable={{
              onRowAdd: thelogedUser.userRoles[0].actionsNames.commercial_StateOfCommercialOperation_create ? (newData => new Promise((resolve) => {
                // add measurement unit action
                addCommercialOperationStatus(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialOperationStatus();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              })) : null,
              onRowUpdate: thelogedUser.userRoles[0].actionsNames.commercial_StateOfCommercialOperation_modify ? ((newData) => new Promise((resolve) => {
                // update CommercialOperationStatus unit action
                updateCommercialOperationStatus(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialOperationStatus();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              })) : null,
              onRowDelete: thelogedUser.userRoles[0].actionsNames.commercial_StateOfCommercialOperation_delete ? (oldData => new Promise((resolve) => {
                // delete CommercialOperationStatus action
                deleteCommercialOperationStatus(oldData.commercialOperationStatusId);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialOperationStatus();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              })) : null,
            }}
          />
        </PapperBlock>
      </div>
    );
  }
}
StatusOfCommercialOperation.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  getAllCommercialOperationStatus: PropTypes.func.isRequired,
  allCommercialOperationStatuss: PropTypes.array.isRequired,
  commercialOperationStatusResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  addCommercialOperationStatus: PropTypes.func.isRequired,
  updateCommercialOperationStatus: PropTypes.func.isRequired,
  deleteCommercialOperationStatus: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  allCommercialOperationStatuss: state.getIn(['commercialOperationStatus']).allCommercialOperationStatuss,
  commercialOperationStatusResponse: state.getIn(['commercialOperationStatus']).commercialOperationStatusResponse,
  isLoading: state.getIn(['commercialOperationStatus']).isLoading,
  errors: state.getIn(['commercialOperationStatus']).errors,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCommercialOperationStatus,
  addCommercialOperationStatus,
  updateCommercialOperationStatus,
  deleteCommercialOperationStatus
}, dispatch);

const StatusOfCommercialOperationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusOfCommercialOperation);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  return <StatusOfCommercialOperationMapped changeTheme={changeTheme} />;
};
