import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TableCell } from '@material-ui/core';
import { isString } from 'lodash';
import styles from './sectors-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import notification from '../../../components/Notification/Notification';

class SectorsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'firstSectorName',
          label: 'Primary Sector',
          options: {
            filter: true
          }
        },
        {
          label: 'Secondary Sector',
          name: 'secondSectorName',
          options: {
            filter: true
          }
        },
        {
          label: 'Third Sector',
          name: 'thirdSectorName',
          options: {
            filter: true
          }
        },
        {
          label: 'Client',
          name: 'client',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                {/*  <TableCell align="right">{value.name}</TableCell> */}
              </React.Fragment>
            )
          }
        },
        {
          label: ' ',
          name: ' ',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                <IconButton onClick={() => this.delete(data.rowData[0], data.rowData[1], data.rowData[2])}>
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => this.delete(data.rowData[0], data.rowData[1], data.rowData[2])}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  delete = (a, b, c) => {
    console.log('eeeeeeeeeeeeeeeeeeee');
    const { deleteSectorCompany } = this.props;
    if (b === undefined) { b = null; }
    if (c === undefined) { c = null; }
    const promise = new Promise((resolve) => {
      deleteSectorCompany(a, b, c);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
        getAllSectorCompany();
        getAllPrimarySectorCompany();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const { sectorsConfig } = this.props;
    const { columns } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={sectorsConfig}
          url="/app/gestion-commercial/sectors/create-sector"
          tooltip="add new Sector"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The Sectors List x"
          data={sectorsConfig}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
SectorsBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  sectorsConfig: PropTypes.array.isRequired,
  deleteSectorCompany: PropTypes.func.isRequired
};

export default withStyles(styles)(SectorsBlock);
