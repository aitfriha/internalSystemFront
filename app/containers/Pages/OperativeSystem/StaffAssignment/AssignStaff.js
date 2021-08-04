import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Tooltip,
  Chip,
  Grid
} from '@material-ui/core';

import { isString } from 'lodash';
import notification from '../../../../components/Notification/Notification';

import { DateDialog } from './DateDialog';

import avatarApi from '../../../../api/images/avatars';
import Avatar from '@material-ui/core/Avatar';

let self = null;

const styles = {};


export class AssignStaff extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      eligibleList: [],
      assignedList: [],
      sendList: [],
      operationId: null,
      openDateDialog: false,
      dataDialog: {}
    };
  }


  componentDidMount() {
    const eligible = [];
    const assigned = [];
    const send = [];

    const { eligibleStaff, assignedStaff } = this.props.data;

    eligibleStaff.forEach(el => {
      eligible.push(el);
    });

    assignedStaff.forEach(el => {
      if (el.active) {
        assigned.push(el);
        send.push(el);
      }
    });

    // Update state
    this.setState({
      eligibleList: eligible,
      assignedList: assigned,
      sendList: send
    });
  }

  componentWillUnmount() {
    this.setState({
      eligibleList: [],
      assignedList: [],
      sendList: [],
      operationId: null,
      openDateDialog: false,
      dataDialog: {}
    });
  }

  onDragEnd(destination, source) {
    if (destination.destination !== null && destination.source !== null) {
      if (destination.destination.droppableId !== destination.source.droppableId) {
        const disableFuture = destination.destination.droppableId === 'assignedStaff';
        const minDate = disableFuture ? new Date('1990-01-01') : self.state.sendList[destination.source.index].startDate;
        const maxDate = new Date();

        const showDialog = destination.destination.droppableId === 'assignedStaff' ? true : self.state.sendList[destination.source.index].id !== 'new';
        if (showDialog) {
          self.setState({
            openDateDialog: true,
            dataDialog: {
              destination,
              source,
              title: destination.destination.droppableId === 'assignedStaff' ? 'Select a start date' : 'Select an end date',
              datePickerLabel: destination.destination.droppableId === 'assignedStaff' ? 'Start date' : 'End date',
              disableFuture,
              minDate,
              maxDate
            }
          });
        } else {
          const data = {
            destination,
            source,
            date: null
          };
          self.handleSaveDateDialog(data);
        }
      }
    }
  }

  handleSave() {
    const {
      updateOperationAssignment, getStaffAssignedByOperation, handleClose, data
    } = self.props;
    const promise = new Promise((resolve) => {
      updateOperationAssignment(self.state.sendList);
      self.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      handleClose();
      if (isString(result)) {
        const params = {
          operationId: data.operation.commercialOperationId
        };
        getStaffAssignedByOperation(params);
        notification('success', result);
      } else {
        notification('danger', result);
      }
    });
  }

  handleCloseDateDialog = () => {
    this.setState({
      openDateDialog: false,
      dataDialog: {}
    });
  }

  handleSaveDateDialog = (data) => {
    this.setState({
      openDateDialog: false,
      dataDialog: {}
    });

    const { destination } = data;
    const { source } = data;

    if (destination.destination === null || destination.source === null) {
      return;
    }
    if (destination.destination.droppableId == destination.source.droppableId) {
      return;
    }
    const eligible = this.state.eligibleList;
    const assigned = this.state.assignedList;
    const send = this.state.sendList;
    if (destination.destination.droppableId === 'assignedStaff') {
      const selectedEmployee = eligible[destination.source.index];
      const newObj = {
        id: 'new',
        employeeId: selectedEmployee.staffId,
        personalNumber: selectedEmployee.personalNumber,
        name: selectedEmployee.firstName,
        fatherFamilyName: selectedEmployee.fatherFamilyName,
        motherFamilyName: selectedEmployee.motherFamilyName,
        avatar: selectedEmployee.avatar,
        company: selectedEmployee.company,
        companyEmail: selectedEmployee.companyEmail,
        operationId: this.props.data.operation.commercialOperationId,
        operationCode: this.props.data.operation.code,
        operationName: this.props.data.operation.name,
        startDate: data.date,
        endDate: null,
        active: true,
      };
      assigned.push(newObj);
      send.push(newObj);
    } else {
      const selectedIndex = assigned.findIndex(obj => obj.id === destination.draggableId);
      if (selectedIndex > -1) {
        const selectedObject = assigned[selectedIndex];
        const originalIndex = eligible.findIndex(obj => obj.id === selectedObject.employeeId);
        if (originalIndex > -1) {
          const originalObject = eligible[originalIndex];
          eligible.splice(originalIndex, 1);
          eligible.splice(destination.destination.index - 1, 0, originalObject);
        }
        const indexToUpdate = send.findIndex(obj => obj.id === destination.draggableId);
        if (indexToUpdate > -1) {
          const sendElement = send[indexToUpdate];
          if (String(sendElement.id) !== 'new') {
            sendElement.endDate = data.date;
            sendElement.active = false;
            send[indexToUpdate] = sendElement;
          } else {
            send.splice(destination.source.index, 1);
          }
        }
        assigned.splice(destination.source.index, 1);
      }
    }
    this.setState({
      eligibleList: eligible,
      assignedList: assigned,
      sendList: send
    });
  }

  render() {
    const { eligibleList, assignedList, sendList } = this.state;

    const {
      errors, staffAssignmentResponse, isLoading, handleClose, data
    } = this.props;

    (!isLoading && staffAssignmentResponse) && this.editingPromiseResolve(staffAssignmentResponse);
    (!isLoading && !staffAssignmentResponse) && this.editingPromiseResolve(errors);
    this.state.eligibleList.map((item, index) => (
        console.log(item)
    ))
    return (
      <Dialog
        open={this.props.open}
        keepMounted
        disableBackdropClick
        disableEscapeKeyDown
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{
            minWidth: 600,
            maxWidth: 600,
            minHeight: 5,
            maxHeight: 5
          }}
        >
          <Typography style={{
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 3,
            color: '#000000'
          }}
          >
Assign staff to selected operation
          </Typography>
        </DialogTitle>
        <DialogContent style={{
          marginTop: '15px'
        }}
        >
          <div id="information" style={{ marginTop: '5px' }}>
            <Chip label="Information" style={{ marginBottom: '5px' }} color="secondary" />
            <Grid item>
              <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                Cliente:
              </Typography>
              <Typography component="span" color="textSecondary">
                {data.customer.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                Operation:
              </Typography>
              <Typography component="span" color="textSecondary">
                {data.operation.name}
              </Typography>
            </Grid>
          </div>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Chip label="Staff" color="secondary" style={{ marginTop: '10px' }} />
            <Droppable droppableId="staff" direction="horizontal">
              {provided => (
                <div
                  {...provided.droppableProps}
                  style={{
                    height: '140px',
                    width: '100%',
                    marginTop: '5px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflowX: 'auto'
                  }}
                  ref={provided.innerRef}
                >
                  {this.state.eligibleList.map((item, index) => (
                    <Draggable key={index + '-' + item.staffId} draggableId={item.staffId} item={item} index={index}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          { this.state.assignedList.findIndex(obj => obj.employeeId === item.id) === -1
                            ? (
                              <div id={item.id} style={{ margin: 10 }}>
                                <Tooltip title={`${item.firstName} ${item.fatherFamilyName} ${item.motherFamilyName}`}>
                                  <img src={item.avatar} alt={`${item.firstName} ${item.fatherFamilyName} ${item.motherFamilyName}`} style={{ width: 40, borderRadius: '50%' }} />
                                  {/* <Avatar className={classes.avatar} alt={`${item.name} ${item.fatherFamilyName} ${item.motherFamilyName}`} src={item.avatar} /> */}
                                </Tooltip>
                              </div>
                            ) : null}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Divider variant="fullWidth" />

            <Chip label="Assigned Staff" style={{ marginTop: '10px' }} color="secondary" />
            <Droppable droppableId="assignedStaff" direction="horizontal">
              {dropProvided => (
                <div
                  {...dropProvided.droppableProps}
                  style={{
                    height: '120px',
                    width: '100%',
                    marginTop: '5px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflowX: 'auto'
                  }}
                  ref={dropProvided.innerRef}
                >
                  {this.state.assignedList.map((item, index) => (
                    <Draggable key={index + '-' + item.id} draggableId={item.id} item={item} index={index}>
                      {dragProvided => (
                        <div
                          {...dragProvided.dragHandleProps}
                          {...dragProvided.draggableProps}
                          ref={dragProvided.innerRef}
                        >
                          <div id={item.id} style={{ margin: 10 }}>
                            <Tooltip title={`${item.name} ${item.fatherFamilyName} ${item.motherFamilyName}`}>
                              <img src={item.avatar} alt={`${item.name} ${item.fatherFamilyName} ${item.motherFamilyName}`} style={{ width: 40, borderRadius: '50%' }} />
                              {/* <Avatar className={classes.avatar} alt={`${item.name} ${item.fatherFamilyName} ${item.motherFamilyName}`} src={item.avatar} /> */}
                            </Tooltip>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {this.state.openDateDialog
            ? (
              <DateDialog
                openDialog={this.state.openDateDialog}
                dataDialog={this.state.dataDialog}
                handleCloseDateDialog={this.handleCloseDateDialog}
                handleSaveDateDialog={this.handleSaveDateDialog}
              />
            )
            : null}
        </DialogContent>
        <DialogActions style={{ minWidth: 585, maxWidth: 585 }}>
          <Button variant="contained" size="small" onClick={handleClose} color="default">
            Cancel
            {/* {intl.formatMessage({ id: 'connection.row.body.no' })} */}
          </Button>
          <Button variant="contained" size="small" disabled={assignedList.length === 0} onClick={this.handleSave} color="primary">
            Save
            {/* } {intl.formatMessage({ id: 'connection.row.body.yes' })} */}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
