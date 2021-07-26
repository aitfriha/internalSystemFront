import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  Button,
  Typography,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  FormLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  FormGroup,
  Checkbox,
  FormHelperText
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PublishIcon from '@material-ui/icons/Publish';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Transition from '../../../components/Transition/transition';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './selectionProcess-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllSelectionProcessInformation,
  updateSelectionProcessInformation,
  deleteSelectionProcessInformation
} from '../../../redux/selectionProcessInformation/actions';
import { getAllSelectionTypeEvaluation } from '../../../redux/selectionTypeEvaluation/actions';
import notification from '../../../components/Notification/Notification';
import CurrencyService from '../../Services/CurrencyService';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const useStyles = makeStyles(styles);

const inputEconomicProposalDoc = React.createRef();
const inputCurriculumDoc = React.createRef();
const inputAttitudeTestDoc = React.createRef();

class SelectionProcessInformation extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.editingPromiseResolve = () => {};
    this.editingPromiseResolveUpdate = () => {};
    this.state = {
      isEditDialogOpen: false,
      isDeleteDialogOpen: false,
      isOpenDocument: false,
      isOpenKnowledge: false,
      selectionProcessInformationSelected: null,
      doc: {},
      docName: '',
      pageNumber: 1,
      firstName: '',
      fatherFamilyName: '',
      motherFamilyName: '',
      profile: '',
      testDate: new Date(),
      energy: '',
      adaptability: '',
      integrity: '',
      interpersonalSensitivity: '',
      economicCandidateProposal: 0,
      economicCandidateProposalInEuro: 0.0,
      economicClaimsValue: 0,
      economicClaimsValueInEuro: 0.0,
      economicClaimsRange1: 0,
      economicClaimsRange1InEuro: 0,
      economicClaimsRange2: 0,
      economicClaimsRange2InEuro: 0,
      candidateProposalType: '',
      candidateSalaryType: '',
      economicClaimsType: '',
      economicCompanyProposal: 0,
      economicCompanyProposalInEuro: 0.0,
      objectives: 0,
      objectivesInEuro: 0.0,
      companyProposalType: '',
      companySalaryType: '',
      checkedKnowledges: [],
      experiences: [],
      economicProposalDoc: {},
      curriculumDoc: {},
      attitudeTestDoc: {},
      currencies: [],
      currency: '',
      allSelectionProcesses: [],
      filteredSelectionProcesses: [],
      filterCheckedKnowledges: [],
      filterExperiences: [],
      isFilterDialogOpen: false,
      columns: [
        {
          name: 'selectionProcessId',
          label: 'Selection Process Id',
          options: {
            display: false,
            filter: false,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          name: 'profile',
          label: 'Apply position',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          name: 'firstName',
          label: 'First Name',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          name: 'fatherFamilyName',
          label: 'Father Family Name',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          name: 'motherFamilyName',
          label: 'Mother Family Name',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Test Date',
          name: 'testDate',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Energy',
          name: 'energy',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Adaptability',
          name: 'adaptability',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Integrity',
          name: 'integrity',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Interpersonal Sensitivity',
          name: 'interpersonalSensitivity',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Candidate Proposal Type',
          name: 'candidateProposalType',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Candidate Salary Type',
          name: 'candidateSalaryType',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Candidate Proposal',
          name: 'economicCandidateProposal',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Candidate Proposal (€)',
          name: 'economicCandidateProposalInEuro',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Claims Type',
          name: 'economicClaimsType',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Claims Value',
          name: 'economicClaimsValue',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },

        {
          label: 'Economic Claims Value (€)',
          name: 'economicClaimsValueInEuro',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Claims Range 1',
          name: 'economicClaimsRange1',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Claims Range 1 (€)',
          name: 'economicClaimsRange1InEuro',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Claims Range 2',
          name: 'economicClaimsRange2',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Claims Range 2 (€)',
          name: 'economicClaimsRange2InEuro',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Company Proposal Type',
          name: 'companyProposalType',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Company Salary Type',
          name: 'companySalaryType',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Company Proposal',
          name: 'economicCompanyProposal',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Economic Company Proposal (€)',
          name: 'economicCompanyProposalInEuro',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Company Objectives',
          name: 'objectives',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },

        {
          label: 'Company Objectives (€)',
          name: 'objectivesInEuro',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        },
        {
          label: 'Knowledges and Experiences',
          name: 'knowledge',
          options: {
            filter: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {value ? (
                  <IconButton
                    onClick={() => this.handleOpenKnowledgeDialog(tableMeta)}
                  >
                    <VisibilityIcon color="secondary" />
                  </IconButton>
                ) : (
                  <div>-</div>
                )}
              </React.Fragment>
            )
          }
        },
        /*        {
          name: 'knowledgeNames',
          options: {
            filter: true,
            sort: true,
            display: true,
            viewColumns: true,
            search: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps()
          }
        }, */
        {
          label: 'Economic Proposal Doc',
          name: 'economicProposalDoc',
          options: {
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {value ? (
                  <IconButton
                    onClick={() => this.handleOpenDocumentDialog(
                      tableMeta,
                      'economicProposalDoc'
                    )
                    }
                  >
                    <VisibilityIcon color="secondary" />
                  </IconButton>
                ) : (
                  <div>-</div>
                )}
              </React.Fragment>
            )
          }
        },
        {
          label: 'Curriculum Doc',
          name: 'curriculumDoc',
          options: {
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {value ? (
                  <IconButton
                    onClick={() => this.handleOpenDocumentDialog(tableMeta, 'curriculumDoc')
                    }
                  >
                    <VisibilityIcon color="secondary" />
                  </IconButton>
                ) : (
                  <div>-</div>
                )}
              </React.Fragment>
            )
          }
        },
        {
          label: 'Attitude Test Doc',
          name: 'attitudeTestDoc',
          options: {
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {value ? (
                  <IconButton
                    onClick={() => this.handleOpenDocumentDialog(tableMeta, 'attitudeTestDoc')
                    }
                  >
                    <VisibilityIcon color="secondary" />
                  </IconButton>
                ) : (
                  <div>-</div>
                )}
              </React.Fragment>
            )
          }
        },
        {
          label: ' ',
          name: ' ',
          options: {
            viewColumns: false,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.hh_selectionProcessInformation_modify
                  ? (
                    <IconButton onClick={() => this.handleOpenEditDialog(tableMeta)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  ) : null}
                {thelogedUser.userRoles[0].actionsNames.hh_selectionProcessInformation_delete
                  ? (
                    <IconButton onClick={() => this.handleOpenDeleteDialog(tableMeta)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };
  }


  columnOptions = {
    filter: true,
    setCellProps: () => this.setCellProps(),
    setCellHeaderProps: () => this.setCellHeaderProps()
  };

  componentDidMount() {
    const {
      changeTheme,
      getAllSelectionProcessInformation,
      getAllSelectionTypeEvaluation
    } = this.props;
    changeTheme('blueCyanTheme');
    getAllSelectionTypeEvaluation();
    CurrencyService.getCurrency().then(({ data }) => {
      this.setState({ currencies: data });
    });
    const promise = new Promise(resolve => {
      getAllSelectionProcessInformation();
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      const allSelectionProcesses = [];
      this.props.allSelectionProcessInformation.forEach(process => {
        const factor = process.changeFactor;
        const economicCandidateProposalInEuro = process.economicCandidateProposal * factor;
        let economicClaimsValueInEuro = process.economicClaimsValue * factor;
        let economicClaimsRange1InEuro = process.economicClaimsRange1 * factor;
        let economicClaimsRange2InEuro = process.economicClaimsRange2 * factor;
        const economicCompanyProposalInEuro = process.economicCompanyProposal * factor;
        const objectivesInEuro = process.objectives * factor;
        if (process.economicClaimsType === 'Number') {
          economicClaimsRange1InEuro = '-';
          economicClaimsRange2InEuro = '-';
        } else {
          economicClaimsValueInEuro = '-';
        }
        const newProcess = {
          ...process,
          economicCandidateProposalInEuro: economicCandidateProposalInEuro.toFixed(
            5
          ),
          economicClaimsValueInEuro:
            process.economicClaimsType === 'Number'
              ? economicClaimsValueInEuro.toFixed(5)
              : economicClaimsValueInEuro,
          economicClaimsRange1InEuro:
            process.economicClaimsType === 'Range'
              ? economicClaimsRange1InEuro.toFixed(5)
              : economicClaimsRange1InEuro,
          economicClaimsRange2InEuro:
            process.economicClaimsType === 'Range'
              ? economicClaimsRange2InEuro.toFixed(5)
              : economicClaimsRange2InEuro,
          economicCompanyProposalInEuro: economicCompanyProposalInEuro.toFixed(
            5
          ),
          objectivesInEuro: objectivesInEuro.toFixed(5)
        };
        allSelectionProcesses.push(newProcess);
      });
      this.setState({
        allSelectionProcesses,
        filteredSelectionProcesses: allSelectionProcesses
      });
    });
  }

  setCellProps = () => ({
    style: {
      whiteSpace: 'nowrap',
      position: 'sticky',
      left: '0',
      background: 'white',
      zIndex: 100
    }
  });

  setCellHeaderProps = () => ({
    style: {
      whiteSpace: 'nowrap',
      position: 'sticky',
      left: 0,
      background: 'white',
      zIndex: 101
    }
  });

  handleUpdate = () => {
    const {
      updateSelectionProcessInformation,
      getAllSelectionProcessInformation
    } = this.props;
    const {
      selectionProcessInformationSelected,
      firstName,
      fatherFamilyName,
      motherFamilyName,
      profile,
      testDate,
      energy,
      adaptability,
      integrity,
      interpersonalSensitivity,
      economicCandidateProposal,
      economicClaimsValue,
      economicClaimsRange1,
      economicClaimsRange2,
      economicClaimsType,
      candidateProposalType,
      candidateSalaryType,
      economicCompanyProposal,
      objectives,
      companyProposalType,
      companySalaryType,
      checkedKnowledges,
      experiences,
      economicProposalDoc,
      curriculumDoc,
      attitudeTestDoc,
      currency
    } = this.state;
    const selectionProcessInformation = {
      selectionProcessId:
        selectionProcessInformationSelected.selectionProcessId,
      firstName,
      fatherFamilyName,
      motherFamilyName,
      profile,
      testDate: testDate.toISOString().slice(0, 10),
      energy,
      adaptability,
      integrity,
      interpersonalSensitivity,
      economicCandidateProposal,
      economicClaimsValue:
        economicClaimsType === 'Number' ? economicClaimsValue : '-',
      economicClaimsRange1:
        economicClaimsType === 'Range' ? economicClaimsRange1 : '-',
      economicClaimsRange2:
        economicClaimsType === 'Range' ? economicClaimsRange2 : '-',
      economicClaimsType,
      candidateProposalType,
      candidateSalaryType,
      economicCompanyProposal,
      objectives,
      companyProposalType,
      companySalaryType,
      knowledgeIdList: checkedKnowledges,
      experiences,
      currencyId: currency
    };

    const formData = new FormData();
    if (economicProposalDoc.constructor === File) {
      formData.append('economicProposalDoc', economicProposalDoc);
    } else {
      formData.append(
        'economicProposalDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    if (curriculumDoc.constructor === File) {
      formData.append('curriculumDoc', curriculumDoc);
    } else {
      formData.append(
        'curriculumDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    if (attitudeTestDoc.constructor === File) {
      formData.append('attitudeTestDoc', attitudeTestDoc);
    } else {
      formData.append(
        'attitudeTestDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    Object.keys(selectionProcessInformation).forEach(e => formData.append(e, selectionProcessInformation[e])
    );

    const promise = new Promise(resolve => {
      updateSelectionProcessInformation(formData);
      this.editingPromiseResolveUpdate = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        const promiseUpdate = new Promise(resolve => {
          getAllSelectionProcessInformation();
          this.editingPromiseResolve = resolve;
        });
        promiseUpdate.then(result => {
          const allSelectionProcesses = [];
          this.props.allSelectionProcessInformation.forEach(process => {
            const factor = process.changeFactor;
            const economicCandidateProposalInEuro = process.economicCandidateProposal * factor;
            let economicClaimsValueInEuro = process.economicClaimsValue * factor;
            let economicClaimsRange1InEuro = process.economicClaimsRange1 * factor;
            let economicClaimsRange2InEuro = process.economicClaimsRange2 * factor;
            const economicCompanyProposalInEuro = process.economicCompanyProposal * factor;
            const objectivesInEuro = process.objectives * factor;
            if (process.economicClaimsType === 'Number') {
              economicClaimsRange1InEuro = '-';
              economicClaimsRange2InEuro = '-';
            } else {
              economicClaimsValueInEuro = '-';
            }
            const newProcess = {
              ...process,
              economicCandidateProposalInEuro: economicCandidateProposalInEuro.toFixed(
                5
              ),
              economicClaimsValueInEuro:
                  process.economicClaimsType === 'Number'
                    ? economicClaimsValueInEuro.toFixed(5)
                    : economicClaimsValueInEuro,
              economicClaimsRange1InEuro:
                  process.economicClaimsType === 'Range'
                    ? economicClaimsRange1InEuro.toFixed(5)
                    : economicClaimsRange1InEuro,
              economicClaimsRange2InEuro:
                  process.economicClaimsType === 'Range'
                    ? economicClaimsRange2InEuro.toFixed(5)
                    : economicClaimsRange2InEuro,
              economicCompanyProposalInEuro: economicCompanyProposalInEuro.toFixed(
                5
              ),
              objectivesInEuro: objectivesInEuro.toFixed(5)
            };
            allSelectionProcesses.push(newProcess);
          });
          this.setState({
            allSelectionProcesses,
            filteredSelectionProcesses: allSelectionProcesses
          });
        });
        this.handleClose();
      } else {
        notification('danger', result);
      }
    });
  };

  handleOpenEditDialog = tableMeta => {
    const { allSelectionProcessInformation } = this.props;
    const { currencies } = this.state;
    const selectionProcessInformationSelected = allSelectionProcessInformation.filter(
      selectionProcessInformation => selectionProcessInformation.selectionProcessId === tableMeta.rowData[0]
    )[0];
    const factor = parseFloat(selectionProcessInformationSelected.changeFactor);
    const economicCandidateProposalInEuro = parseFloat(
      selectionProcessInformationSelected.economicCandidateProposal
    ) * factor;
    const economicClaimsValueInEuro = parseFloat(selectionProcessInformationSelected.economicClaimsValue)
      * factor;
    const economicClaimsRange1InEuro = parseFloat(selectionProcessInformationSelected.economicClaimsRange1)
      * factor;
    const economicClaimsRange2InEuro = parseFloat(selectionProcessInformationSelected.economicClaimsRange2)
      * factor;
    const economicCompanyProposalInEuro = parseFloat(selectionProcessInformationSelected.economicCompanyProposal)
      * factor;
    const objectivesInEuro = parseFloat(selectionProcessInformationSelected.objectives) * factor;
    const checkedKnowledges = [];
    selectionProcessInformationSelected.knowledge.forEach(elem => {
      checkedKnowledges.push(elem._id);
    });
    this.setState({
      selectionProcessInformationSelected,
      isEditDialogOpen: true,
      firstName: selectionProcessInformationSelected.firstName,
      fatherFamilyName: selectionProcessInformationSelected.fatherFamilyName,
      motherFamilyName: selectionProcessInformationSelected.motherFamilyName,
      profile: selectionProcessInformationSelected.profile,
      testDate: new Date(selectionProcessInformationSelected.testDate),
      energy: selectionProcessInformationSelected.energy,
      adaptability: selectionProcessInformationSelected.adaptability,
      integrity: selectionProcessInformationSelected.integrity,
      interpersonalSensitivity:
        selectionProcessInformationSelected.interpersonalSensitivity,
      economicCandidateProposal:
        selectionProcessInformationSelected.economicCandidateProposal,
      economicCandidateProposalInEuro,
      economicClaimsValue:
        selectionProcessInformationSelected.economicClaimsValue,
      economicClaimsValueInEuro,
      economicClaimsRange1:
        selectionProcessInformationSelected.economicClaimsRange1,
      economicClaimsRange1InEuro,
      economicClaimsRange2:
        selectionProcessInformationSelected.economicClaimsRange2,
      economicClaimsRange2InEuro,
      economicCompanyProposal:
        selectionProcessInformationSelected.economicCompanyProposal,
      economicCompanyProposalInEuro,
      objectives: selectionProcessInformationSelected.objectives,
      objectivesInEuro,
      candidateProposalType:
        selectionProcessInformationSelected.candidateProposalType,
      candidateSalaryType:
        selectionProcessInformationSelected.candidateSalaryType,
      companyProposalType:
        selectionProcessInformationSelected.companyProposalType,
      companySalaryType: selectionProcessInformationSelected.companySalaryType,
      economicClaimsType:
        selectionProcessInformationSelected.economicClaimsType,
      checkedKnowledges,
      experiences: selectionProcessInformationSelected.experiences,
      economicProposalDoc: selectionProcessInformationSelected.economicProposalDoc
        ? selectionProcessInformationSelected.economicProposalDoc
        : {},
      curriculumDoc: selectionProcessInformationSelected.curriculumDoc
        ? selectionProcessInformationSelected.curriculumDoc
        : {},
      attitudeTestDoc: selectionProcessInformationSelected.attitudeTestDoc
        ? selectionProcessInformationSelected.attitudeTestDoc
        : {},
      currency: selectionProcessInformationSelected.currencyId
    });
  };

  handleOpenDocumentDialog = (tableMeta, docName) => {
    const { allSelectionProcessInformation } = this.props;
    const selectionProcessInformationSelected = allSelectionProcessInformation.filter(
      selectionProcessInformation => selectionProcessInformation.selectionProcessId === tableMeta.rowData[0]
    )[0];
    this.setState({
      isOpenDocument: true,
      doc: selectionProcessInformationSelected[docName],
      docName,
      selectionProcessInformationSelected
    });
  };

  handleOpenKnowledgeDialog = tableMeta => {
    const { allSelectionProcessInformation } = this.props;
    const selectionProcessInformationSelected = allSelectionProcessInformation.filter(
      selectionProcessInformation => selectionProcessInformation.selectionProcessId === tableMeta.rowData[0]
    )[0];

    this.setState({
      isOpenKnowledge: true,
      selectionProcessInformationSelected
    });
  };

  handleOpenDeleteDialog = tableMeta => {
    const { allSelectionProcessInformation } = this.props;
    const selectionProcessInformationSelected = allSelectionProcessInformation.filter(
      selectionProcessInformation => selectionProcessInformation.selectionProcessId === tableMeta.rowData[0]
    )[0];
    this.setState({
      selectionProcessInformationSelected,
      isDeleteDialogOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isEditDialogOpen: false,
      isOpenDocument: false,
      isOpenKnowledge: false,
      selectionProcessInformationSelected: null,
      doc: {},
      isDeleteDialogOpen: false,
      isFilterDialogOpen: false
    });
  };

  fileToBase64 = file => {
    const binaryString = window.atob(file);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  renderFile = () => {
    const { doc } = this.state;
    return `data:application/pdf;base64,${doc}`;
  };

  handleDelete = () => {
    const {
      getAllSelectionProcessInformation,
      deleteSelectionProcessInformation,
      allSelectionProcessInformation
    } = this.props;
    const { selectionProcessInformationSelected } = this.state;
    const promise = new Promise(resolve => {
      deleteSelectionProcessInformation(
        selectionProcessInformationSelected.selectionProcessId
      );
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        //
        const promiseUpdate = new Promise(resolve => {
          getAllSelectionProcessInformation();
          this.editingPromiseResolve = resolve;
        });
        promiseUpdate.then(result => {
          const allSelectionProcesses = [];
          this.props.allSelectionProcessInformation.forEach(process => {
            const factor = process.changeFactor;
            const economicCandidateProposalInEuro = process.economicCandidateProposal * factor;
            let economicClaimsValueInEuro = process.economicClaimsValue * factor;
            let economicClaimsRange1InEuro = process.economicClaimsRange1 * factor;
            let economicClaimsRange2InEuro = process.economicClaimsRange2 * factor;
            const economicCompanyProposalInEuro = process.economicCompanyProposal * factor;
            const objectivesInEuro = process.objectives * factor;
            if (process.economicClaimsType === 'Number') {
              economicClaimsRange1InEuro = '-';
              economicClaimsRange2InEuro = '-';
            } else {
              economicClaimsValueInEuro = '-';
            }
            const newProcess = {
              ...process,
              economicCandidateProposalInEuro: economicCandidateProposalInEuro.toFixed(
                5
              ),
              economicClaimsValueInEuro:
                  process.economicClaimsType === 'Number'
                    ? economicClaimsValueInEuro.toFixed(5)
                    : economicClaimsValueInEuro,
              economicClaimsRange1InEuro:
                  process.economicClaimsType === 'Range'
                    ? economicClaimsRange1InEuro.toFixed(5)
                    : economicClaimsRange1InEuro,
              economicClaimsRange2InEuro:
                  process.economicClaimsType === 'Range'
                    ? economicClaimsRange2InEuro.toFixed(5)
                    : economicClaimsRange2InEuro,
              economicCompanyProposalInEuro: economicCompanyProposalInEuro.toFixed(
                5
              ),
              objectivesInEuro: objectivesInEuro.toFixed(5)
            };
            allSelectionProcesses.push(newProcess);
          });
          this.setState({
            allSelectionProcesses,
            filteredSelectionProcesses: allSelectionProcesses
          });
        });
        //
        this.handleClose();
      } else {
        notification('danger', result);
      }
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages
    });
  };

  handleDownload = () => {
    const { selectionProcessInformationSelected, docName, doc } = this.state;
    const docTitle = `${selectionProcessInformationSelected.firstName}_
    ${selectionProcessInformationSelected.fatherFamilyName}_
    ${selectionProcessInformationSelected.motherFamilyName}_${docName}`;

    const documentBase64 = this.fileToBase64(doc);
    const documentBlob = new Blob([documentBase64], {
      type: 'application/pdf'
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(documentBlob);
    link.download = docTitle;
    link.click();
  };

  handleUploadDocClick = () => {
    inputDoc.current.click();
  };

  handleDocChange = () => {
    const lastDot = inputDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (ext === 'pdf') {
      this.setState({
        doc: inputDoc.current.files[0]
      });
    }
  };

  handleChange = ev => {
    const { currency } = this.state;
    const { name } = ev.target;
    if (
      [
        'economicCandidateProposal',
        'economicClaimsValue',
        'economicClaimsRange1',
        'economicClaimsRange2',
        'economicCompanyProposal',
        'objectives'
      ].includes(name)
    ) {
      if (currency !== '') {
        this.setState(
          ev.target.value !== '' ? { [name]: ev.target.value } : { [name]: 0 },
          () => {
            this.convertHandler(currency);
          }
        );
      } else {
        this.setState(
          ev.target.value !== '' ? { [name]: ev.target.value } : { [name]: 0 }
        );
      }
    } else {
      this.setState({ [ev.target.name]: ev.target.value });
    }
  };

  handleChangeCheked = event => {
    const { checkedKnowledges, experiences } = this.state;
    const { name } = event.target;
    const checkedKnowledgesList = JSON.parse(JSON.stringify(checkedKnowledges));
    const experiencesList = JSON.parse(JSON.stringify(experiences));
    if (event.target.checked) {
      checkedKnowledgesList.push(name);
      experiencesList.push(0);
    } else {
      const index = checkedKnowledgesList.indexOf(name);
      checkedKnowledgesList.splice(index, 1);
      experiencesList.splice(index, 1);
    }
    this.setState({
      checkedKnowledges: checkedKnowledgesList,
      experiences: experiencesList
    });
  };

  handleChangeFilterCheked = event => {
    const { filterCheckedKnowledges, filterExperiences } = this.state;
    const { name } = event.target;
    const filterCheckedKnowledgesList = JSON.parse(
      JSON.stringify(filterCheckedKnowledges)
    );
    const filterExperiencesList = JSON.parse(JSON.stringify(filterExperiences));
    if (event.target.checked) {
      filterCheckedKnowledgesList.push(name);
      filterExperiencesList.push(0);
    } else {
      const index = filterCheckedKnowledgesList.indexOf(name);
      filterCheckedKnowledgesList.splice(index, 1);
      filterExperiencesList.splice(index, 1);
    }
    this.setState({
      filterCheckedKnowledges: filterCheckedKnowledgesList,
      filterExperiences: filterExperiencesList
    });
  };

  updateTableData = () => {
    const {
      filterCheckedKnowledges,
      filterExperiences,
      allSelectionProcesses
    } = this.state;
    let processesToCheck = JSON.parse(JSON.stringify(allSelectionProcesses));
    let filteredProcessesList = [];
    filterCheckedKnowledges.forEach((elem, index) => {
      filteredProcessesList = processesToCheck.filter(process => {
        const objIndex = process.knowledge.findIndex(obj => obj._id === elem);
        //
        if (filterExperiences[index] === 'all') {
          return process.knowledge.some(obj => obj._id === elem);
        }
        return (
          process.knowledge.some(obj => obj._id === elem)
          && Number(process.experiences[objIndex])
            === Number(filterExperiences[index])
        );
      });
      processesToCheck = JSON.parse(JSON.stringify(filteredProcessesList));
    });

    this.setState({
      filteredSelectionProcesses: filteredProcessesList,
      isFilterDialogOpen: false
    });
  };

  handleChangeExperiences = event => {
    const { experiences } = this.state;
    experiences[event.target.name] = event.target.value;
    this.setState({
      experiences
    });
  };

  handleChangeFilterExperiences = event => {
    const { filterExperiences } = this.state;
    filterExperiences[event.target.name] = event.target.value;
    this.setState({
      filterExperiences
    });
  };

  handleChangeSelectAllChecked = event => {
    const { filterExperiences } = this.state;
    if (event.target.checked) {
      filterExperiences[event.target.name] = 'all';
    } else {
      filterExperiences[event.target.name] = 0;
    }
    this.setState({
      filterExperiences
    });
  };

  handleChangeCurrency = ev => {
    const { name } = ev.target;
    this.setState({ [name]: ev.target.value }, () => {
      this.convertHandler(ev.target.value);
    });
  };

  handleValueChange = (value, type) => {
    this.setState({ [type]: value });
  };

  handleUploadEconomicProposalDocClick = () => {
    inputEconomicProposalDoc.current.click();
  };

  handleUploadCurriculumDocClick = () => {
    inputCurriculumDoc.current.click();
  };

  handleUploadAttitudeTestDocClick = () => {
    inputAttitudeTestDoc.current.click();
  };

  handleEconomicProposalDocChange = () => {
    this.setState({
      economicProposalDoc: inputEconomicProposalDoc.current.files[0]
    });
  };

  handleCurriculumDocChange = () => {
    this.setState({
      curriculumDoc: inputCurriculumDoc.current.files[0]
    });
  };

  handleAttitudeTestDocChange = () => {
    this.setState({
      attitudeTestDoc: inputAttitudeTestDoc.current.files[0]
    });
  };

  handleDateValue = value => {
    this.setState({
      testDate: value
    });
  };

  convertHandler = currencyId => {
    const {
      economicCandidateProposal,
      economicClaimsValue,
      economicClaimsRange1,
      economicClaimsRange2,
      economicCompanyProposal,
      objectives,
      currencies
    } = this.state;
    const currency = currencies.filter(cur => cur.currencyId === currencyId)[0];
    const factor = parseFloat(currency.changeFactor);
    const economicCandidateProposalInEuro = economicCandidateProposal * factor;
    const economicClaimsValueInEuro = economicClaimsValue * factor;
    const economicClaimsRange1InEuro = economicClaimsRange1 * factor;
    const economicClaimsRange2InEuro = economicClaimsRange2 * factor;
    const economicCompanyProposalInEuro = economicCompanyProposal * factor;
    const objectivesInEuro = objectives * factor;
    this.setState({
      economicCandidateProposalInEuro: economicCandidateProposalInEuro.toFixed(
        5
      ),
      economicClaimsValueInEuro: economicClaimsValueInEuro.toFixed(5),
      economicClaimsRange1InEuro: economicClaimsRange1InEuro.toFixed(5),
      economicClaimsRange2InEuro: economicClaimsRange2InEuro.toFixed(5),
      economicCompanyProposalInEuro: economicCompanyProposalInEuro.toFixed(5),
      objectivesInEuro: objectivesInEuro.toFixed(5)
    });
  };

  renderKnowledgeRow = knowledgeName => {
    const { classes } = this.props;
    const { selectionProcessInformationSelected } = this.state;
    const index = selectionProcessInformationSelected.knowledge.findIndex(
      elem => elem.name === knowledgeName
    );
    const experience = selectionProcessInformationSelected.experiences[index];
    return (
      <div className={classes.divSpace}>
        <Typography
          variant="subtitle1"
          style={{
            color: '#000',
            fontFamily: 'sans-serif , Arial',
            fontSize: '17px',
            marginTop: 20,
            marginLeft: 20
          }}
        >
          {knowledgeName}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            color: '#000',
            fontFamily: 'sans-serif , Arial',
            fontSize: '17px',
            marginTop: 20,
            marginLeft: 20
          }}
        >
          {`${experience} Years`}
        </Typography>
      </div>
    );
  };

  handleOpenFilterDialog = () => {
    this.setState({
      isFilterDialogOpen: true
    });
  };

  render() {
    const {
      classes,
      allSelectionProcessInformation,
      isLoadingSelectionProcessInformation,
      selectionProcessInformationResponse,
      errorSelectionProcessInformation,
      allSelectionTypeEvaluation,
      logedUser
    } = this.props;
    const {
      filteredSelectionProcesses,
      isEditDialogOpen,
      isOpenDocument,
      isOpenKnowledge,
      selectionProcessInformationSelected,
      doc,
      pageNumber,
      isDeleteDialogOpen,
      firstName,
      fatherFamilyName,
      motherFamilyName,
      profile,
      testDate,
      energy,
      adaptability,
      integrity,
      interpersonalSensitivity,
      economicCandidateProposal,
      economicCandidateProposalInEuro,
      economicClaimsValue,
      economicClaimsValueInEuro,
      economicClaimsRange1,
      economicClaimsRange1InEuro,
      economicClaimsRange2,
      economicClaimsRange2InEuro,
      candidateProposalType,
      candidateSalaryType,
      economicClaimsType,
      economicCompanyProposal,
      economicCompanyProposalInEuro,
      objectives,
      objectivesInEuro,
      companyProposalType,
      companySalaryType,
      checkedKnowledges,
      experiences,
      economicProposalDoc,
      curriculumDoc,
      attitudeTestDoc,
      currency,
      currencies,
      filterCheckedKnowledges,
      filterExperiences,
      isFilterDialogOpen,
      columns
    } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_selectionProcessInformation_export) {
      exportButton = true;
    }
    const title = brand.name + ' - Selection process information';
    const { desc } = brand;
    const options = {
      fixedHeader: true,
      fixedSelectColumn: false,
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      download: exportButton,
      print: exportButton,
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={filteredSelectionProcesses}
          url="/app/hh-rr/selectionProcessInformation/add-selection-process"
          tooltip="add new selection process"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.hh_selectionProcessInformation_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.hh_selectionProcessInformation_export}
        />
      )
    };

    !isLoadingSelectionProcessInformation
      && selectionProcessInformationResponse
      && this.editingPromiseResolve(selectionProcessInformationResponse);
    !isLoadingSelectionProcessInformation
      && !selectionProcessInformationResponse
      && this.editingPromiseResolve(errorSelectionProcessInformation);

    (!isLoadingSelectionProcessInformation && selectionProcessInformationResponse) && this.editingPromiseResolveUpdate(selectionProcessInformationResponse);
    (!isLoadingSelectionProcessInformation && !selectionProcessInformationResponse) && this.editingPromiseResolveUpdate(errorSelectionProcessInformation);

    const proposalTypes = ['Month', 'Year'];

    const salaryTypes = ['Gross Salary', 'Net Salary'];

    const economicClaimsTypes = ['Number', 'Range'];

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
        <Dialog
          maxWidth="lg"
          TransitionComponent={Transition}
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
          scroll="body"
          aria-labelledby="changeProfilePic"
          open={isFilterDialogOpen}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="SaveFormula">
            Filter by knowledge and experiences
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={6}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                md={9}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 12
                }}
              >
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  fullWidth
                >
                  <FormLabel component="legend" style={{ marginBottom: 20 }}>
                    Knowledges
                  </FormLabel>
                  {allSelectionTypeEvaluation
                    .filter(type => type.type === 'Main Type')
                    .map(mainType => (
                      <div>
                        <FormLabel component="legend">
                          {mainType.name}
                        </FormLabel>
                        <FormGroup row>
                          {mainType.childs.map(subType => (
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  checked={filterCheckedKnowledges.includes(
                                    subType.selectionTypeId
                                  )}
                                  onChange={this.handleChangeFilterCheked}
                                  name={subType.selectionTypeId}
                                />
                              )}
                              label={subType.name}
                            />
                          ))}
                        </FormGroup>
                      </div>
                    ))}

                  <FormHelperText>Choose the knowledges</FormHelperText>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 12
                }}
              >
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  fullWidth
                >
                  <FormLabel component="legend" style={{ marginBottom: 20 }}>
                    Experiences
                  </FormLabel>
                  <FormGroup row>
                    {filterExperiences.map((experience, index) => (
                      <div className={classes.divSpace}>
                        <FormControlLabel
                          control={(
                            <TextField
                              id="outlined-basic"
                              label="Experience By Years"
                              variant="outlined"
                              name={index}
                              style={{ marginBottom: 10 }}
                              value={experience}
                              className={classes.textField}
                              onChange={this.handleChangeFilterExperiences}
                              disabled={filterExperiences[index] === 'all'}
                            />
                          )}
                          label={
                            allSelectionTypeEvaluation.filter(
                              type => type.selectionTypeId
                                === filterCheckedKnowledges[index]
                            )[0].name
                          }
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={filterExperiences[index] === 'all'}
                              onChange={this.handleChangeSelectAllChecked}
                              name={index}
                            />
                          )}
                          label="Select all"
                        />
                      </div>
                    ))}
                  </FormGroup>
                  <FormHelperText>
                    Set years of experience for each knowledge
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button autoFocus onClick={this.updateTableData} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth="lg"
          TransitionComponent={Transition}
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
          scroll="body"
          aria-labelledby="changeProfilePic"
          open={isEditDialogOpen}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="SaveFormula">Edit Process</DialogTitle>
          <DialogContent>
            <div>
              <Grid
                container
                spacing={6}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 12
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Apply position"
                    variant="outlined"
                    name="profile"
                    value={profile}
                    style={{ width: '22%' }}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Father family name"
                    variant="outlined"
                    name="fatherFamilyName"
                    value={fatherFamilyName}
                    style={{ width: '22%' }}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Mother family name"
                    variant="outlined"
                    name="motherFamilyName"
                    value={motherFamilyName}
                    style={{ width: '22%' }}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    name="firstName"
                    value={firstName}
                    style={{ width: '22%' }}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginBottom: -60
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      opacity: 0.6
                    }}
                  >
                    Attitude Test Results
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 12
                  }}
                >
                  <div style={{ width: '20%' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        name="startDate"
                        label="Test Date"
                        value={testDate}
                        onChange={value => this.handleDateValue(value)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                        fullWidth
                        style={{ marginTop: -1 }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Energy"
                    variant="outlined"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="energy"
                    value={energy}
                    style={{ width: '17%' }}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Adaptability"
                    variant="outlined"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="adaptability"
                    value={adaptability}
                    style={{ width: '17%' }}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Integrity"
                    variant="outlined"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="integrity"
                    value={integrity}
                    style={{ width: '17%' }}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Interpersonal Sensitivity"
                    variant="outlined"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="interpersonalSensitivity"
                    value={interpersonalSensitivity}
                    style={{ width: '17%' }}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginBottom: -60
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      opacity: 0.6
                    }}
                  >
                    Economical requirements of the candidate
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: -40
                  }}
                >
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '23%' }}
                    required
                  >
                    <InputLabel>Currency</InputLabel>
                    <Select
                      name="currency"
                      value={currency}
                      onChange={this.handleChangeCurrency}
                    >
                      {currencies.map(clt => (
                        <MenuItem key={clt.currencyId} value={clt.currencyId}>
                          {clt.typeOfCurrency.currencyName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '23%', marginTop: 1 }}
                  >
                    <InputLabel>Proposal Type</InputLabel>

                    <Select
                      name="candidateProposalType"
                      value={candidateProposalType}
                      onChange={this.handleChange}
                    >
                      {proposalTypes.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '23%', marginTop: 1 }}
                  >
                    <InputLabel>Salary Type</InputLabel>

                    <Select
                      name="candidateSalaryType"
                      value={candidateSalaryType}
                      onChange={this.handleChange}
                    >
                      {salaryTypes.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '23%', marginTop: 1 }}
                  >
                    <InputLabel>Economic claims Type</InputLabel>

                    <Select
                      name="economicClaimsType"
                      value={economicClaimsType}
                      onChange={this.handleChange}
                    >
                      {economicClaimsTypes.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: -40
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Economic Proposal"
                    variant="outlined"
                    name="economicCandidateProposal"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    style={{ width: '40%' }}
                    value={economicCandidateProposal}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Economic Proposal In Euro"
                    variant="outlined"
                    name="economicCandidateProposalInEuro"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    style={{ width: '40%' }}
                    value={economicCandidateProposalInEuro}
                    className={classes.textField}
                    disabled
                  />
                </Grid>
                {economicClaimsType === 'Number' && (
                  <Grid
                    item
                    xs={12}
                    md={9}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Economic Claims Value"
                      variant="outlined"
                      name="economicClaimsValue"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      style={{ width: '40%' }}
                      value={economicClaimsValue}
                      className={classes.textField}
                      onChange={this.handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Economic Claims Value In Euro"
                      variant="outlined"
                      name="economicClaimsValueInEuro"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      style={{ width: '40%' }}
                      value={economicClaimsValueInEuro}
                      className={classes.textField}
                      disabled
                    />
                  </Grid>
                )}
                {economicClaimsType === 'Range' && (
                  <Grid
                    item
                    xs={12}
                    md={9}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Economic Claims Range 1"
                      variant="outlined"
                      name="economicClaimsRange1"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      style={{ width: '23%' }}
                      value={economicClaimsRange1}
                      className={classes.textField}
                      onChange={this.handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Economic Claims Range 1 In Euro"
                      variant="outlined"
                      name="economicClaimsRange1InEuro"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      style={{ width: '23%' }}
                      value={economicClaimsRange1InEuro}
                      className={classes.textField}
                      disabled
                    />
                    <TextField
                      id="outlined-basic"
                      label="Economic Claims Range 2"
                      variant="outlined"
                      name="economicClaimsRange2"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      style={{ width: '23%' }}
                      value={economicClaimsRange2}
                      className={classes.textField}
                      onChange={this.handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Economic Claims Range 2 In Euro"
                      variant="outlined"
                      name="economicClaimsRange2InEuro"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      style={{ width: '23%' }}
                      value={economicClaimsRange2InEuro}
                      className={classes.textField}
                      disabled
                    />
                  </Grid>
                )}

                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: 40,
                    marginBottom: -60
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      opacity: 0.6
                    }}
                  >
                    Economical company proposal
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 12
                  }}
                >
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '15%' }}
                  >
                    <InputLabel>Proposal Type</InputLabel>

                    <Select
                      name="companyProposalType"
                      value={companyProposalType}
                      onChange={this.handleChange}
                    >
                      {proposalTypes.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '15%' }}
                  >
                    <InputLabel>Salary Type</InputLabel>

                    <Select
                      name="companySalaryType"
                      value={companySalaryType}
                      onChange={this.handleChange}
                    >
                      {salaryTypes.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Economic Proposal"
                    variant="outlined"
                    name="economicCompanyProposal"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    style={{ width: '15%' }}
                    value={economicCompanyProposal}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Economic Proposal In Euro"
                    variant="outlined"
                    name="economicCompanyProposalInEuro"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    style={{ width: '15%' }}
                    value={economicCompanyProposalInEuro}
                    className={classes.textField}
                    disabled
                  />
                  <TextField
                    id="outlined-basic"
                    label="Objectives"
                    variant="outlined"
                    name="objectives"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    style={{ width: '15%' }}
                    value={objectives}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Objectives In Euro"
                    variant="outlined"
                    name="objectivesInEuro"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    style={{ width: '15%' }}
                    value={objectivesInEuro}
                    className={classes.textField}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 12
                  }}
                >
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    fullWidth
                  >
                    <FormLabel component="legend" style={{ marginBottom: 20 }}>
                      Knowledges
                    </FormLabel>
                    {allSelectionTypeEvaluation
                      .filter(type => type.type === 'Main Type')
                      .map(mainType => (
                        <div>
                          <FormLabel component="legend">
                            {mainType.name}
                          </FormLabel>
                          <FormGroup row>
                            {mainType.childs.map(subType => (
                              <FormControlLabel
                                control={(
                                  <Checkbox
                                    checked={checkedKnowledges.includes(
                                      subType.selectionTypeId
                                    )}
                                    onChange={this.handleChangeCheked}
                                    name={subType.selectionTypeId}
                                  />
                                )}
                                label={subType.name}
                              />
                            ))}
                          </FormGroup>
                        </div>
                      ))}

                    <FormHelperText>Choose the knowledges</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 12
                  }}
                >
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    fullWidth
                  >
                    <FormLabel component="legend" style={{ marginBottom: 20 }}>
                      Experiences
                    </FormLabel>
                    <FormGroup row>
                      {experiences.map((experience, index) => (
                        <FormControlLabel
                          control={(
                            <TextField
                              id="outlined-basic"
                              label="Experience By Years"
                              variant="outlined"
                              name={index}
                              type="number"
                              style={{ marginBottom: 10 }}
                              value={experience}
                              className={classes.textField}
                              onChange={this.handleChangeExperiences}
                            />
                          )}
                          label={
                            allSelectionTypeEvaluation.filter(
                              type => type.selectionTypeId
                                === checkedKnowledges[index]
                            )[0].name
                          }
                          labelPlacement="top"
                        />
                      ))}
                    </FormGroup>
                    <FormHelperText>
                      Set years of experience for each knowledge
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={7}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 12
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '30%'
                    }}
                  >
                    <IconButton
                      className={
                        curriculumDoc.constructor === Object
                          ? classes.uploadAvatarEmpty
                          : classes.uploadAvatarDone
                      }
                      onClick={this.handleUploadCurriculumDocClick}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <input
                          type="file"
                          id="file"
                          accept=".pdf"
                          ref={inputCurriculumDoc}
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={this.handleCurriculumDocChange}
                        />
                        <PublishIcon
                          className={classes.uploadIcon}
                          color="secondary"
                        />
                        <Typography
                          variant="subtitle1"
                          className={classes.uploadText}
                        >
                          Curriculum
                        </Typography>
                      </div>
                    </IconButton>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '30%'
                    }}
                  >
                    <IconButton
                      className={
                        attitudeTestDoc.constructor === Object
                          ? classes.uploadAvatarEmpty
                          : classes.uploadAvatarDone
                      }
                      onClick={this.handleUploadAttitudeTestDocClick}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <input
                          type="file"
                          id="file"
                          accept=".pdf"
                          ref={inputAttitudeTestDoc}
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={this.handleAttitudeTestDocChange}
                        />
                        <PublishIcon
                          className={classes.uploadIcon}
                          color="secondary"
                        />
                        <Typography
                          variant="subtitle1"
                          className={classes.uploadText}
                        >
                          Attitude Test
                        </Typography>
                      </div>
                    </IconButton>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '30%'
                    }}
                  >
                    <IconButton
                      className={
                        economicProposalDoc.constructor === Object
                          ? classes.uploadAvatarEmpty
                          : classes.uploadAvatarDone
                      }
                      onClick={this.handleUploadEconomicProposalDocClick}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <input
                          type="file"
                          id="file"
                          accept=".pdf"
                          ref={inputEconomicProposalDoc}
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={this.handleEconomicProposalDocChange}
                        />
                        <PublishIcon
                          className={classes.uploadIcon}
                          color="secondary"
                        />
                        <Typography
                          variant="subtitle1"
                          className={classes.uploadText}
                        >
                          Economic proposal
                        </Typography>
                      </div>
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isDeleteDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">Delete Process</DialogTitle>
          <DialogContent>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: 'sans-serif , Arial',
                fontSize: '17px'
              }}
            >
              Are you sure you want to delete this selection process?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth="lg"
          TransitionComponent={Transition}
          fullWidth
          scroll="body"
          aria-labelledby="changeProfilePic"
          open={isOpenDocument}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="SaveFormula">Document preview</DialogTitle>
          <DialogContent>
            {selectionProcessInformationSelected ? (
              <Document
                file={this.renderFile()}
                onLoadSuccess={this.onDocumentLoadSuccess}
                onLoadError={console.error}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            ) : (
              <div />
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleDownload} color="primary">
              Download
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth="xs"
          TransitionComponent={Transition}
          fullWidth
          scroll="paper"
          aria-labelledby="changeProfilePic"
          open={isOpenKnowledge}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="SaveFormula">Knowledge and Experiences</DialogTitle>
          <DialogContent>
            {selectionProcessInformationSelected && allSelectionTypeEvaluation.length > 0 ? (
              allSelectionTypeEvaluation
                .filter(type => type.type === 'Main Type')
                .map(
                  type => selectionProcessInformationSelected.knowledge.filter(elem => type.childs.some(i => i.name.includes(elem.name))
                  ).length > 0 && (
                    <div>
                      <Typography
                        variant="subtitle1"
                        style={{
                          color: 'primary',
                          fontFamily: 'sans-serif , Arial',
                          fontSize: '20px',
                          marginTop: 20
                        }}
                      >
                        {type.name}
                      </Typography>
                      <Divider />
                      {selectionProcessInformationSelected.knowledge
                        .filter(elem => type.childs.some(i => i.name.includes(elem.name))
                        )
                        .map(elem => this.renderKnowledgeRow(elem.name))}
                    </div>
                  )
                )
            ) : (
              <div>there is no experiences</div>
            )}
            {selectionProcessInformationSelected!= null && selectionProcessInformationSelected.knowledge.length > 0 ? (<div></div>) : (<div>there is no experiences for this personne</div>)}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Selection processes information"
          icon="ios-paper-outline"
          noMargin
          desc=""
        >
          <Button onClick={this.handleOpenFilterDialog}>Filter by knowledge and experience</Button>
          <MUIDataTable
            title=""
            data={filteredSelectionProcesses}
            columns={columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allSelectionProcessInformation: state.getIn(['selectionProcessInformations'])
    .allSelectionProcessInformation,
  selectionProcessInformationResponse: state.getIn([
    'selectionProcessInformations'
  ]).selectionProcessInformationResponse,
  isLoadingSelectionProcessInformation: state.getIn([
    'selectionProcessInformations'
  ]).isLoading,
  errorSelectionProcessInformation: state.getIn([
    'selectionProcessInformations'
  ]).errors,
  allSelectionTypeEvaluation: state.getIn(['selectionTypeEvaluations'])
    .allSelectionTypeEvaluation,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateSelectionProcessInformation,
    getAllSelectionProcessInformation,
    deleteSelectionProcessInformation,
    getAllSelectionTypeEvaluation
  },
  dispatch
);

const SelectionProcessInformationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionProcessInformation);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <SelectionProcessInformationMapped
      changeTheme={changeTheme}
      classes={classes}
    />
  );
};
