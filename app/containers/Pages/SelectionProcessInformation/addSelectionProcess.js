import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
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
import PublishIcon from '@material-ui/icons/Publish';
import { PapperBlock } from 'dan-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutoComplete from '../../../components/AutoComplete';
import styles from './selectionProcess-jss';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import { ThemeContext } from '../../App/ThemeWrapper';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getAllSelectionProcessInformation,
  saveSelectionProcessInformation
} from '../../../redux/selectionProcessInformation/actions';
import { getAllSelectionTypeEvaluation } from '../../../redux/selectionTypeEvaluation/actions';
import notification from '../../../components/Notification/Notification';
import CurrencyService from '../../Services/CurrencyService';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(styles);

const inputEconomicProposalDoc = React.createRef();
const inputCurriculumDoc = React.createRef();
const inputAttitudeTestDoc = React.createRef();

class AddSelectionProcess extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
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
      currency: ''
    };
  }

  componentDidMount() {
    const { changeTheme, getAllSelectionTypeEvaluation } = this.props;
    changeTheme('blueCyanTheme');
    getAllSelectionTypeEvaluation();
    CurrencyService.getCurrency().then(({ data }) => {
      this.setState({ currencies: data });
    });
  }

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
      console.log(index);
      checkedKnowledgesList.splice(index, 1);
      experiencesList.splice(index, 1);
    }
    console.log(experiencesList);
    this.setState({
      checkedKnowledges: checkedKnowledgesList,
      experiences: experiencesList
    });
  };

  handleChangeExperiences = event => {
    const { experiences } = this.state;
    console.log(event.target.name);
    console.log(event.target.value);
    experiences[event.target.name] = event.target.value;
    this.setState({
      experiences
    });
  };

  handleSubmitSelectionProcessInformation = () => {
    const {
      saveSelectionProcessInformation,
      getAllSelectionProcessInformation
    } = this.props;
    const {
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
    console.log(selectionProcessInformation);
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
      saveSelectionProcessInformation(formData);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllSelectionProcessInformation();
        console.log(result);
        history.push('/app/hh-rr/selectionProcessInformation');
      } else {
        console.log(result);
        notification('danger', result);
      }
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

  render() {
    const {
      classes,
      isLoadingSelectionProcessInformation,
      selectionProcessInformationResponse,
      errorSelectionProcessInformation,
      allSelectionTypeEvaluation
    } = this.props;
    const {
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
      currencies
    } = this.state;
    !isLoadingSelectionProcessInformation
      && selectionProcessInformationResponse
      && this.editingPromiseResolve(selectionProcessInformationResponse);
    !isLoadingSelectionProcessInformation
      && !selectionProcessInformationResponse
      && this.editingPromiseResolve(errorSelectionProcessInformation);

    const proposalTypes = ['Month', 'Year'];

    const salaryTypes = ['Gross Salary', 'Net Salary'];

    const economicClaimsTypes = ['Number', 'Range'];

    return (
      <div>
        <PapperBlock
          title="Add selection process"
          icon="ios-paper-outline"
          noMargin
          whiteBg
        >
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
                      <FormLabel component="legend">{mainType.name}</FormLabel>
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
                          InputProps={{ inputProps: { min: 0 } }}
                          style={{ marginBottom: 10 }}
                          value={experience}
                          className={classes.textField}
                          onChange={this.handleChangeExperiences}
                        />
                      )}
                      label={
                        allSelectionTypeEvaluation.filter(
                          type => type.selectionTypeId === checkedKnowledges[index]
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

            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 12
              }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitSelectionProcessInformation}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allSelectionProcessInformation: state.getIn(['selectionProcessInformations'])
    .allSelectionProcessInformation,
  allSelectionProcessInformationByState: state.getIn([
    'selectionProcessInformations'
  ]).allSelectionProcessInformationByState,
  selectionProcessInformationResponse: state.getIn([
    'selectionProcessInformations'
  ]).selectionProcessInformationResponse,
  isLoadingSelectionProcessInformation: state.getIn([
    'selectionProcessInformations'
  ]).isLoading,
  errorSelectionProcessInformation: state.getIn([
    'selectionProcessInformations'
  ]).errors,
  allStaff: state.getIn(['staffs']).allStaff,
  allSelectionTypeEvaluation: state.getIn(['selectionTypeEvaluations'])
    .allSelectionTypeEvaluation
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveSelectionProcessInformation,
    getAllSelectionProcessInformation,
    getAllSelectionTypeEvaluation
  },
  dispatch
);

const AddSelectionProcessMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSelectionProcess);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <AddSelectionProcessMapped changeTheme={changeTheme} classes={classes} />
  );
};
