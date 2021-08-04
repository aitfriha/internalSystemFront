import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  isString, isEmpty
} from 'lodash';
import { connect } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SendIcon from '@material-ui/icons/Send';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { addAction, getAllActions } from '../../../../redux/actions/actions';
import { getAllSubjects } from '../../../../redux/subjects/actions';
import notification from '../../../../../app/components/Notification/Notification';
import {
  addRole, deleteRole, getAllRoles, updateRole, addRoleAbilities
} from '../../../../redux/rolesAbilities/actions';
import PapperBlock from '../../../../../app/components/PapperBlock/PapperBlock';
const styles = (theme) => ({
  gridItemMargin: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },

  parentRow: {
    backgroundColor: '#cfd8dc'
  }

});

class RoleActions extends React.Component {
  constructor(props) {
    super(props);

    this.editingPromiseResolve = () => {
    };
    this.editingPromiseResolveAction = () => {
    };
    this.state = {
      roleDescription: '',
      expanded: false,
      roleName: '',
      oldRoleName: '',
      /* theRoleName: '', */
      admin_user_Management_access: false,
      admin_user_Management_create: false,
      admin_user_Management_modify: false,
      admin_user_Management_delete: false,
      admin_user_Management_export: false,
      admin_roles_management_access: false,
      admin_roles_management_create: false,
      admin_roles_management_modify: false,
      admin_roles_management_delete: false,
      admin_roles_management_export: false,
      // //commercial
      commercial_customers_access: false,
      commercial_customers_create: false,
      commercial_customers_modify: false,
      commercial_customers_delete: false,
      commercial_customers_export: false,

      commercial_commercialAssignments_access: false,
      commercial_commercialAssignments_create: false,
      commercial_commercialAssignments_import: false,
      commercial_commercialAssignments_delete: false,
      commercial_commercialAssignments_export: false,

      commercial_clientContact_access: false,
      commercial_clientContact_create: false,
      commercial_clientContact_modify: false,
      commercial_clientContact_delete: false,
      commercial_clientContact_export: false,

      commercial_commercialOperation_access: false,
      commercial_commercialOperation_create: false,
      commercial_commercialOperation_modify: false,
      commercial_commercialOperation_delete: false,
      commercial_commercialOperation_export: false,

      commercial_commercialAction_access: false,
      commercial_commercialAction_create: false,
      commercial_commercialAction_modify: false,
      commercial_commercialAction_delete: false,
      commercial_commercialAction_export: false,

      commercial_countriesStatesCities_access: false,
      commercial_countriesStatesCities_create: false,
      commercial_countriesStatesCities_modify: false,
      commercial_countriesStatesCities_delete: false,
      commercial_countriesStatesCities_export: false,

      commercial_StateOfCommercialOperation_access: false,
      commercial_StateOfCommercialOperation_create: false,
      commercial_StateOfCommercialOperation_modify: false,
      commercial_StateOfCommercialOperation_delete: false,
      commercial_StateOfCommercialOperation_export: false,

      commercial_contactByOperationStatus_access: false,
      commercial_contactByOperationStatus_create: false,
      commercial_contactByOperationStatus_modify: false,
      commercial_contactByOperationStatus_delete: false,
      commercial_contactByOperationStatus_export: false,

      commercial_serviceType_access: false,
      commercial_serviceType_create: false,
      commercial_serviceType_modify: false,
      commercial_serviceType_delete: false,
      commercial_serviceType_export: false,

      commercial_sectorsCompany_access: false,
      commercial_sectorsCompany_create: false,
      commercial_sectorsCompany_modify: false,
      commercial_sectorsCompany_delete: false,
      commercial_sectorsCompany_export: false,

      commercial_titleType_access: false,
      commercial_titleType_create: false,
      commercial_titleType_modify: false,
      commercial_titleType_delete: false,
      commercial_titleType_export: false,

      commercial_documentManager_access: false,
      // hh
      hh_administrativeStructureDefinition_access: false,
      hh_administrativeStructureDefinition_create: false,
      hh_administrativeStructureDefinition_modify: false,
      hh_administrativeStructureDefinition_delete: false,
      hh_administrativeStructureDefinition_export: false,

      hh_administrativeStructureAssignation_access: false,
      hh_administrativeStructureAssignation_modify: false,

      hh_functionalStructureDefinition_access: false,
      hh_functionalStructureDefinition_create: false,
      hh_functionalStructureDefinition_modify: false,
      hh_functionalStructureDefinition_delete: false,
      hh_functionalStructureDefinition_export: false,

      hh_functionalStructureAssignation_access: false,
      hh_functionalStructureAssignation_modify: false,

      hh_staff_personalInformationManagement_access: false,
      hh_staff_personalInformationManagement_create: false,
      hh_staff_personalInformationManagement_modify: false,
      hh_staff_personalInformationManagement_delete: false,
      hh_staff_personalInformationManagement_export: false,

      hh_staff_contractInformationManagement_access: false,
      hh_staff_contractInformationManagement_create: false,
      hh_staff_contractInformationManagement_modify: false,
      hh_staff_contractInformationManagement_delete: false,
      hh_staff_contractInformationManagement_export: false,

      hh_staff_economicObjectiveManagement_access: false,
      hh_staff_economicObjectiveManagement_create: false,
      hh_staff_economicObjectiveManagement_modify: false,
      hh_staff_economicObjectiveManagement_delete: false,
      hh_staff_economicObjectiveManagement_export: false,

      hh_absenceRequest_access: false,
      hh_absenceRequest_create: false,
      hh_absenceRequest_modify: false,
      hh_absenceRequest_delete: false,
      hh_absenceRequest_export: false,

      hh_absenceConsult_access: false,
      hh_absenceConsult_modify: false,
      hh_absenceConsult_export: false,

      hh_selectionProcessInformation_access: false,
      hh_selectionProcessInformation_create: false,
      hh_selectionProcessInformation_modify: false,
      hh_selectionProcessInformation_delete: false,
      hh_selectionProcessInformation_export: false,

      hh_typesOfLegalCategory_access: false,
      hh_typesOfLegalCategory_create: false,
      hh_typesOfLegalCategory_modify: false,
      hh_typesOfLegalCategory_delete: false,
      hh_typesOfLegalCategory_export: false,

      hh_typesOfContracts_access: false,
      hh_typesOfContracts_create: false,
      hh_typesOfContracts_modify: false,
      hh_typesOfContracts_delete: false,
      hh_typesOfContracts_export: false,

      hh_typesOfAbsences_access: false,
      hh_typesOfAbsences_create: false,
      hh_typesOfAbsences_modify: false,
      hh_typesOfAbsences_delete: false,
      hh_typesOfAbsences_export: false,

      hh_contractModels_access: false,
      hh_contractModels_create: false,
      hh_contractModels_modify: false,
      hh_contractModels_delete: false,
      hh_contractModels_export: false,

      hh_localBankHolidays_access: false,
      hh_localBankHolidays_create: false,
      hh_localBankHolidays_modify: false,
      hh_localBankHolidays_delete: false,
      hh_localBankHolidays_export: false,

      hh_selectionTypesEvaluation_access: false,
      hh_selectionTypesEvaluation_create: false,
      hh_selectionTypesEvaluation_modify: false,
      hh_selectionTypesEvaluation_delete: false,
      hh_selectionTypesEvaluation_export: false,
      // operative module
      operativeModule_staffAssignments_access: false,
      operativeModule_staffAssignments_create: false,
      operativeModule_staffAssignments_modify: false,
      operativeModule_staffAssignments_delete: false,
      operativeModule_staffAssignments_export: false,

      operativeModule_workParts_access: false,
      operativeModule_workParts_create: false,
      operativeModule_workParts_modify: false,
      operativeModule_workParts_delete: false,
      operativeModule_workParts_export: false,

      operativeModule_AssignmentType_access: false,
      operativeModule_AssignmentType_create: false,
      operativeModule_AssignmentType_modify: false,
      operativeModule_AssignmentType_delete: false,
      operativeModule_AssignmentType_export: false,

      operativeModule_workPartsConfig_access: false,
      operativeModule_workPartsConfig_modify: false,
      operativeModule_workPartsConfig_export: false,
      // financial
      financialModule_contracts_access: false,
      financialModule_contracts_create: false,
      financialModule_contracts_modify: false,
      financialModule_contracts_delete: false,
      financialModule_contracts_export: false,

      financialModule_suppliersContracts_access: false,
      financialModule_suppliersContracts_create: false,
      financialModule_suppliersContracts_modify: false,
      financialModule_suppliersContracts_delete: false,
      financialModule_suppliersContracts_export: false,

      financialModule_billingManagement_access: false,
      financialModule_billingManagement_create: false,
      financialModule_billingManagement_modify: false,
      financialModule_billingManagement_delete: false,
      financialModule_billingManagement_export: false,


      financialModule_staffEconomicManagement_access: false,
      financialModule_staffEconomicManagement_create: false,
      financialModule_staffEconomicManagement_modify: false,
      financialModule_staffEconomicManagement_delete: false,
      financialModule_staffEconomicManagement_export: false,

      financialModule_staffEconomicPayments_access: false,
      financialModule_staffEconomicPayments_create: false,
      financialModule_staffEconomicPayments_modify: false,
      financialModule_staffEconomicPayments_delete: false,
      financialModule_staffEconomicPayments_export: false,

      financialModule_suppliersPayments_access: false,
      financialModule_suppliersPayments_create: false,
      financialModule_suppliersPayments_modify: false,
      financialModule_suppliersPayments_delete: false,
      financialModule_suppliersPayments_export: false,

      financialModule_purchaseOrderManagement_access: false,
      financialModule_purchaseOrderManagement_create: false,
      financialModule_purchaseOrderManagement_modify: false,
      financialModule_purchaseOrderManagement_delete: false,
      financialModule_purchaseOrderManagement_export: false,

      financialModule_travelRequest_access: false,
      financialModule_travelRequest_create: false,
      financialModule_travelRequest_modify: false,
      financialModule_travelRequest_delete: false,
      financialModule_travelRequest_cancel: false,
      financialModule_travelRequest_export: false,

      financialModule_travelManagement_access: false,
      financialModule_travelManagement_modify: false,
      financialModule_travelManagement_export: false,

      financialModule_expenseRecord_access: false,
      financialModule_expenseRecord_create: false,
      financialModule_expenseRecord_modify: false,
      financialModule_expenseRecord_download: false,
      financialModule_expenseRecord_export: false,

      financialModule_expensesManagement_access: false,
      financialModule_expensesManagement_create: false,
      financialModule_expensesManagement_modify: false,
      financialModule_expensesManagement_download: false,
      financialModule_expensesManagement_export: false,

      financialModule_companies_access: false,
      financialModule_companies_create: false,
      financialModule_companies_modify: false,
      financialModule_companies_delete: false,
      financialModule_companies_export: false,

      financialModule_typeOfCurrency_access: false,
      financialModule_typeOfCurrency_create: false,
      financialModule_typeOfCurrency_modify: false,
      financialModule_typeOfCurrency_delete: false,
      financialModule_typeOfCurrency_export: false,

      financialModule_currencyManagement_access: false,
      financialModule_currencyManagement_create: false,
      financialModule_currencyManagement_modify: false,
      financialModule_currencyManagement_delete: false,
      financialModule_currencyManagement_export: false,

      financialModule_contractStatus_access: false,
      financialModule_contractStatus_create: false,
      financialModule_contractStatus_modify: false,
      financialModule_contractStatus_delete: false,
      financialModule_contractStatus_export: false,

      financialModule_iva_access: false,
      financialModule_iva_create: false,
      financialModule_iva_modify: false,
      financialModule_iva_delete: false,
      financialModule_iva_export: false,

      /*      financialModule_typeOfRententions_access: false,
      financialModule_typeOfRententions_create: false,
      financialModule_typeOfRententions_modify: false,
      financialModule_typeOfRententions_delete: false,
      financialModule_typeOfRententions_export: false, */

      financialModule_suppliersTypes_access: false,
      financialModule_suppliersTypes_create: false,
      financialModule_suppliersTypes_modify: false,
      financialModule_suppliersTypes_delete: false,
      financialModule_suppliersTypes_export: false,

      financialModule_externalSuppliers_access: false,
      financialModule_externalSuppliers_create: false,
      financialModule_externalSuppliers_modify: false,
      financialModule_externalSuppliers_delete: false,
      financialModule_externalSuppliers_export: false,

      financialModule_purchaseOrderAcceptance_access: false,
      financialModule_purchaseOrderAcceptance_create: false,
      financialModule_purchaseOrderAcceptance_modify: false,
      financialModule_purchaseOrderAcceptance_delete: false,
      financialModule_purchaseOrderAcceptance_export: false,

      financialModule_businessExpenseTypes_access: false,
      financialModule_businessExpenseTypes_create: false,
      financialModule_businessExpenseTypes_modify: false,
      financialModule_businessExpenseTypes_delete: false,
      financialModule_businessExpenseTypes_export: false,

      financialModule_requestStatus_access: false,
      financialModule_requestStatus_create: false,
      financialModule_requestStatus_modify: false,
      financialModule_requestStatus_delete: false,
      financialModule_requestStatus_export: false,

      financialModule_travelRequestEmailAddress_access: false,
      financialModule_travelRequestEmailAddress_create: false,
      financialModule_travelRequestEmailAddress_modify: false,
      financialModule_travelRequestEmailAddress_delete: false,
      financialModule_travelRequestEmailAddress_export: false,

      financialModule_staffExpensesTypes_access: false,
      financialModule_staffExpensesTypes_create: false,
      financialModule_staffExpensesTypes_modify: false,
      financialModule_staffExpensesTypes_delete: false,
      financialModule_staffExpensesTypes_export: false,

      financialModule_personsTypes_access: false,
      financialModule_personsTypes_create: false,
      financialModule_personsTypes_modify: false,
      financialModule_personsTypes_delete: false,
      financialModule_personsTypes_export: false,

      financialModule_voucherType_access: false,
      financialModule_voucherType_create: false,
      financialModule_voucherType_modify: false,
      financialModule_voucherType_delete: false,
      financialModule_voucherType_export: false,

      financialModule_expensesStatus_access: false,
      financialModule_expensesStatus_create: false,
      financialModule_expensesStatus_modify: false,
      financialModule_expensesStatus_delete: false,
      financialModule_expensesStatus_export: false,

      financialModule_expensesEmailAddress_access: false,
      financialModule_expensesEmailAddress_create: false,
      financialModule_expensesEmailAddress_modify: false,
      financialModule_expensesEmailAddress_delete: false,
      financialModule_expensesEmailAddress_export: false,
      // translation
      translationModule_defaultSentences_access: false,
      translationModule_defaultSentences_create: false,
      translationModule_defaultSentences_modify: false,
      translationModule_defaultSentences_delete: false,

      translationModule_translationSentences_access: false,
      translationModule_translationSentences_create: false,
      translationModule_translationSentences_modify: false,
      translationModule_translationSentences_delete: false,


      columns: [
        {
          title: 'role*',
          field: 'roleName'
        }, {
          title: 'actions',
          field: 'roleActionsIds',
          render: rowData => rowData && rowData.roleActionsIds.join(', '),
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 200,
            maxWidth: 200
          }
        }, {
          title: 'description',
          field: 'roleDescription'
        },

      ]
    };
  }

  componentDidMount() {
    const {
      getAllRoles, getAllSubjects, getAllActions, location
    } = this.props;
    getAllRoles();
    getAllSubjects();
    getAllActions();
    if (!isEmpty(location.state)) {
      this.setState({ roleName: location.state.UserRole });
      this.setState({ oldRoleName: location.state.UserRole });
      this.setState({ roleDescription: location.state.roleDescription });
      for (const key in location.state.actions) {
        this.setState({ [key]: location.state.actions[key] });
      }
    }
  }

  handleChangeRoleName= (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeRoleName2= (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeDescription = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleSubmit = () => {
    const { addRole } = this.props;
    const {
      roleName,
      oldRoleName,
      roleDescription,
      admin_user_Management_access,
      admin_user_Management_create,
      admin_user_Management_modify,
      admin_user_Management_delete,
      admin_user_Management_export,
      admin_roles_management_access,
      admin_roles_management_create,
      admin_roles_management_modify,
      admin_roles_management_delete,
      admin_roles_management_export,
      commercial_customers_access,
      commercial_customers_create,
      commercial_customers_modify,
      commercial_customers_delete,
      commercial_customers_export,
      commercial_commercialAssignments_access,
      commercial_commercialAssignments_create,
      commercial_commercialAssignments_import,
      commercial_commercialAssignments_delete,
      commercial_commercialAssignments_export,
      commercial_clientContact_access,
      commercial_clientContact_create,
      commercial_clientContact_modify,
      commercial_clientContact_delete,
      commercial_clientContact_export,
      commercial_commercialOperation_access,
      commercial_commercialOperation_create,
      commercial_commercialOperation_modify,
      commercial_commercialOperation_delete,
      commercial_commercialOperation_export,
      commercial_commercialAction_access,
      commercial_commercialAction_create,
      commercial_commercialAction_modify,
      commercial_commercialAction_delete,
      commercial_commercialAction_export,
      commercial_countriesStatesCities_access,
      commercial_countriesStatesCities_create,
      commercial_countriesStatesCities_modify,
      commercial_countriesStatesCities_delete,
      commercial_countriesStatesCities_export,
      commercial_StateOfCommercialOperation_access,
      commercial_StateOfCommercialOperation_create,
      commercial_StateOfCommercialOperation_modify,
      commercial_StateOfCommercialOperation_delete,
      commercial_StateOfCommercialOperation_export,
      commercial_contactByOperationStatus_access,
      commercial_contactByOperationStatus_create,
      commercial_contactByOperationStatus_modify,
      commercial_contactByOperationStatus_delete,
      commercial_contactByOperationStatus_export,
      commercial_serviceType_access,
      commercial_serviceType_create,
      commercial_serviceType_modify,
      commercial_serviceType_delete,
      commercial_serviceType_export,
      commercial_sectorsCompany_access,
      commercial_sectorsCompany_create,
      commercial_sectorsCompany_modify,
      commercial_sectorsCompany_delete,
      commercial_sectorsCompany_export,
      commercial_titleType_access,
      commercial_titleType_create,
      commercial_titleType_modify,
      commercial_titleType_delete,
      commercial_titleType_export,
      commercial_documentManager_access,
      hh_administrativeStructureDefinition_access,
      hh_administrativeStructureDefinition_create,
      hh_administrativeStructureDefinition_modify,
      hh_administrativeStructureDefinition_delete,
      hh_administrativeStructureDefinition_export,
      hh_administrativeStructureAssignation_access,
      hh_administrativeStructureAssignation_modify,
      hh_functionalStructureDefinition_access,
      hh_functionalStructureDefinition_create,
      hh_functionalStructureDefinition_modify,
      hh_functionalStructureDefinition_delete,
      hh_functionalStructureDefinition_export,
      hh_functionalStructureAssignation_access,
      hh_functionalStructureAssignation_modify,
      hh_staff_personalInformationManagement_access,
      hh_staff_personalInformationManagement_create,
      hh_staff_personalInformationManagement_modify,
      hh_staff_personalInformationManagement_delete,
      hh_staff_personalInformationManagement_export,
      hh_staff_contractInformationManagement_access,
      hh_staff_contractInformationManagement_create,
      hh_staff_contractInformationManagement_modify,
      hh_staff_contractInformationManagement_delete,
      hh_staff_contractInformationManagement_export,
      hh_staff_economicObjectiveManagement_access,
      hh_staff_economicObjectiveManagement_create,
      hh_staff_economicObjectiveManagement_modify,
      hh_staff_economicObjectiveManagement_delete,
      hh_staff_economicObjectiveManagement_export,
      hh_absenceRequest_access,
      hh_absenceRequest_create,
      hh_absenceRequest_modify,
      hh_absenceRequest_delete,
      hh_absenceRequest_export,
      hh_absenceConsult_access,
      hh_absenceConsult_modify,
      hh_absenceConsult_export,
      hh_selectionProcessInformation_access,
      hh_selectionProcessInformation_create,
      hh_selectionProcessInformation_modify,
      hh_selectionProcessInformation_delete,
      hh_selectionProcessInformation_export,
      hh_typesOfLegalCategory_access,
      hh_typesOfLegalCategory_create,
      hh_typesOfLegalCategory_modify,
      hh_typesOfLegalCategory_delete,
      hh_typesOfLegalCategory_export,
      hh_typesOfContracts_access,
      hh_typesOfContracts_create,
      hh_typesOfContracts_modify,
      hh_typesOfContracts_delete,
      hh_typesOfContracts_export,
      hh_typesOfAbsences_access,
      hh_typesOfAbsences_create,
      hh_typesOfAbsences_modify,
      hh_typesOfAbsences_delete,
      hh_typesOfAbsences_export,
      hh_contractModels_access,
      hh_contractModels_create,
      hh_contractModels_modify,
      hh_contractModels_delete,
      hh_contractModels_export,
      hh_localBankHolidays_access,
      hh_localBankHolidays_create,
      hh_localBankHolidays_modify,
      hh_localBankHolidays_delete,
      hh_localBankHolidays_export,
      hh_selectionTypesEvaluation_access,
      hh_selectionTypesEvaluation_create,
      hh_selectionTypesEvaluation_modify,
      hh_selectionTypesEvaluation_delete,
      hh_selectionTypesEvaluation_export,
      operativeModule_staffAssignments_access,
      operativeModule_staffAssignments_create,
      operativeModule_staffAssignments_modify,
      operativeModule_staffAssignments_delete,
      operativeModule_staffAssignments_export,
      operativeModule_workParts_access,
      operativeModule_workParts_create,
      operativeModule_workParts_modify,
      operativeModule_workParts_delete,
      operativeModule_workParts_export,
      operativeModule_AssignmentType_access,
      operativeModule_AssignmentType_create,
      operativeModule_AssignmentType_modify,
      operativeModule_AssignmentType_delete,
      operativeModule_AssignmentType_export,
      operativeModule_workPartsConfig_access,
      operativeModule_workPartsConfig_modify,
      operativeModule_workPartsConfig_export,
      financialModule_contracts_access,
      financialModule_contracts_create,
      financialModule_contracts_modify,
      financialModule_contracts_delete,
      financialModule_contracts_export,
      financialModule_suppliersContracts_access,
      financialModule_suppliersContracts_create,
      financialModule_suppliersContracts_modify,
      financialModule_suppliersContracts_delete,
      financialModule_suppliersContracts_export,
      financialModule_billingManagement_access,
      financialModule_billingManagement_create,
      financialModule_billingManagement_modify,
      financialModule_billingManagement_delete,
      financialModule_billingManagement_export,
      financialModule_staffEconomicManagement_access,
      financialModule_staffEconomicManagement_create,
      financialModule_staffEconomicManagement_modify,
      financialModule_staffEconomicManagement_delete,
      financialModule_staffEconomicManagement_export,
      financialModule_staffEconomicPayments_access,
      financialModule_staffEconomicPayments_create,
      financialModule_staffEconomicPayments_modify,
      financialModule_staffEconomicPayments_delete,
      financialModule_staffEconomicPayments_export,
      financialModule_suppliersPayments_access,
      financialModule_suppliersPayments_create,
      financialModule_suppliersPayments_modify,
      financialModule_suppliersPayments_delete,
      financialModule_suppliersPayments_export,
      financialModule_purchaseOrderManagement_access,
      financialModule_purchaseOrderManagement_create,
      financialModule_purchaseOrderManagement_modify,
      financialModule_purchaseOrderManagement_delete,
      financialModule_purchaseOrderManagement_export,
      financialModule_travelRequest_access,
      financialModule_travelRequest_create,
      financialModule_travelRequest_modify,
      financialModule_travelRequest_delete,
      financialModule_travelRequest_cancel,
      financialModule_travelRequest_export,
      financialModule_travelManagement_access,
      financialModule_travelManagement_modify,
      financialModule_travelManagement_export,
      financialModule_expenseRecord_access,
      financialModule_expenseRecord_create,
      financialModule_expenseRecord_modify,
      financialModule_expenseRecord_download,
      financialModule_expenseRecord_export,
      financialModule_expensesManagement_access,
      financialModule_expensesManagement_create,
      financialModule_expensesManagement_modify,
      financialModule_expensesManagement_download,
      financialModule_expensesManagement_export,
      financialModule_companies_access,
      financialModule_companies_create,
      financialModule_companies_modify,
      financialModule_companies_delete,
      financialModule_companies_export,
      financialModule_typeOfCurrency_access,
      financialModule_typeOfCurrency_create,
      financialModule_typeOfCurrency_modify,
      financialModule_typeOfCurrency_delete,
      financialModule_typeOfCurrency_export,
      financialModule_currencyManagement_access,
      financialModule_currencyManagement_create,
      financialModule_currencyManagement_modify,
      financialModule_currencyManagement_delete,
      financialModule_currencyManagement_export,
      financialModule_contractStatus_access,
      financialModule_contractStatus_create,
      financialModule_contractStatus_modify,
      financialModule_contractStatus_delete,
      financialModule_contractStatus_export,
      financialModule_iva_access,
      financialModule_iva_create,
      financialModule_iva_modify,
      financialModule_iva_delete,
      financialModule_iva_export,
      /*  financialModule_typeOfRententions_access,
      financialModule_typeOfRententions_create,
      financialModule_typeOfRententions_modify,
      financialModule_typeOfRententions_delete,
      financialModule_typeOfRententions_export, */
      financialModule_suppliersTypes_access,
      financialModule_suppliersTypes_create,
      financialModule_suppliersTypes_modify,
      financialModule_suppliersTypes_delete,
      financialModule_suppliersTypes_export,
      financialModule_externalSuppliers_access,
      financialModule_externalSuppliers_create,
      financialModule_externalSuppliers_modify,
      financialModule_externalSuppliers_delete,
      financialModule_externalSuppliers_export,
      financialModule_purchaseOrderAcceptance_access,
      financialModule_purchaseOrderAcceptance_create,
      financialModule_purchaseOrderAcceptance_modify,
      financialModule_purchaseOrderAcceptance_delete,
      financialModule_purchaseOrderAcceptance_export,
      financialModule_businessExpenseTypes_access,
      financialModule_businessExpenseTypes_create,
      financialModule_businessExpenseTypes_modify,
      financialModule_businessExpenseTypes_delete,
      financialModule_businessExpenseTypes_export,
      financialModule_requestStatus_access,
      financialModule_requestStatus_create,
      financialModule_requestStatus_modify,
      financialModule_requestStatus_delete,
      financialModule_requestStatus_export,
      financialModule_travelRequestEmailAddress_access,
      financialModule_travelRequestEmailAddress_create,
      financialModule_travelRequestEmailAddress_modify,
      financialModule_travelRequestEmailAddress_delete,
      financialModule_travelRequestEmailAddress_export,
      financialModule_staffExpensesTypes_access,
      financialModule_staffExpensesTypes_create,
      financialModule_staffExpensesTypes_modify,
      financialModule_staffExpensesTypes_delete,
      financialModule_staffExpensesTypes_export,
      financialModule_personsTypes_access,
      financialModule_personsTypes_create,
      financialModule_personsTypes_modify,
      financialModule_personsTypes_delete,
      financialModule_personsTypes_export,
      financialModule_voucherType_access,
      financialModule_voucherType_create,
      financialModule_voucherType_modify,
      financialModule_voucherType_delete,
      financialModule_voucherType_export,
      financialModule_expensesStatus_access,
      financialModule_expensesStatus_create,
      financialModule_expensesStatus_modify,
      financialModule_expensesStatus_delete,
      financialModule_expensesStatus_export,
      financialModule_expensesEmailAddress_access,
      financialModule_expensesEmailAddress_create,
      financialModule_expensesEmailAddress_modify,
      financialModule_expensesEmailAddress_delete,
      financialModule_expensesEmailAddress_export,
      translationModule_defaultSentences_access,
      translationModule_defaultSentences_create,
      translationModule_defaultSentences_modify,
      translationModule_defaultSentences_delete,

      translationModule_translationSentences_access,
      translationModule_translationSentences_create,
      translationModule_translationSentences_modify,
      translationModule_translationSentences_delete,
    } = this.state;
    const action = {
      roleName,
      oldRoleName,
      roleDescription,
      actionsNames: {
        admin_user_Management_access,
        admin_user_Management_create,
        admin_user_Management_modify,
        admin_user_Management_delete,
        admin_user_Management_export,
        admin_roles_management_access,
        admin_roles_management_create,
        admin_roles_management_modify,
        admin_roles_management_delete,
        admin_roles_management_export,
        commercial_customers_access,
        commercial_customers_create,
        commercial_customers_modify,
        commercial_customers_delete,
        commercial_customers_export,
        commercial_commercialAssignments_access,
        commercial_commercialAssignments_create,
        commercial_commercialAssignments_import,
        commercial_commercialAssignments_delete,
        commercial_commercialAssignments_export,
        commercial_clientContact_access,
        commercial_clientContact_create,
        commercial_clientContact_modify,
        commercial_clientContact_delete,
        commercial_clientContact_export,
        commercial_commercialOperation_access,
        commercial_commercialOperation_create,
        commercial_commercialOperation_modify,
        commercial_commercialOperation_delete,
        commercial_commercialOperation_export,
        commercial_commercialAction_access,
        commercial_commercialAction_create,
        commercial_commercialAction_modify,
        commercial_commercialAction_delete,
        commercial_commercialAction_export,
        commercial_countriesStatesCities_access,
        commercial_countriesStatesCities_create,
        commercial_countriesStatesCities_modify,
        commercial_countriesStatesCities_delete,
        commercial_countriesStatesCities_export,
        commercial_StateOfCommercialOperation_access,
        commercial_StateOfCommercialOperation_create,
        commercial_StateOfCommercialOperation_modify,
        commercial_StateOfCommercialOperation_delete,
        commercial_StateOfCommercialOperation_export,
        commercial_contactByOperationStatus_access,
        commercial_contactByOperationStatus_create,
        commercial_contactByOperationStatus_modify,
        commercial_contactByOperationStatus_delete,
        commercial_contactByOperationStatus_export,
        commercial_serviceType_access,
        commercial_serviceType_create,
        commercial_serviceType_modify,
        commercial_serviceType_delete,
        commercial_serviceType_export,
        commercial_sectorsCompany_access,
        commercial_sectorsCompany_create,
        commercial_sectorsCompany_modify,
        commercial_sectorsCompany_delete,
        commercial_sectorsCompany_export,
        commercial_titleType_access,
        commercial_titleType_create,
        commercial_titleType_modify,
        commercial_titleType_delete,
        commercial_titleType_export,
        commercial_documentManager_access,
        hh_administrativeStructureDefinition_access,
        hh_administrativeStructureDefinition_create,
        hh_administrativeStructureDefinition_modify,
        hh_administrativeStructureDefinition_delete,
        hh_administrativeStructureDefinition_export,
        hh_administrativeStructureAssignation_access,
        hh_administrativeStructureAssignation_modify,
        hh_functionalStructureDefinition_access,
        hh_functionalStructureDefinition_create,
        hh_functionalStructureDefinition_modify,
        hh_functionalStructureDefinition_delete,
        hh_functionalStructureDefinition_export,
        hh_functionalStructureAssignation_access,
        hh_functionalStructureAssignation_modify,
        hh_staff_personalInformationManagement_access,
        hh_staff_personalInformationManagement_create,
        hh_staff_personalInformationManagement_modify,
        hh_staff_personalInformationManagement_delete,
        hh_staff_personalInformationManagement_export,
        hh_staff_contractInformationManagement_access,
        hh_staff_contractInformationManagement_create,
        hh_staff_contractInformationManagement_modify,
        hh_staff_contractInformationManagement_delete,
        hh_staff_contractInformationManagement_export,
        hh_staff_economicObjectiveManagement_access,
        hh_staff_economicObjectiveManagement_create,
        hh_staff_economicObjectiveManagement_modify,
        hh_staff_economicObjectiveManagement_delete,
        hh_staff_economicObjectiveManagement_export,
        hh_absenceRequest_access,
        hh_absenceRequest_create,
        hh_absenceRequest_modify,
        hh_absenceRequest_delete,
        hh_absenceRequest_export,
        hh_absenceConsult_access,
        hh_absenceConsult_modify,
        hh_absenceConsult_export,
        hh_selectionProcessInformation_access,
        hh_selectionProcessInformation_create,
        hh_selectionProcessInformation_modify,
        hh_selectionProcessInformation_delete,
        hh_selectionProcessInformation_export,
        hh_typesOfLegalCategory_access,
        hh_typesOfLegalCategory_create,
        hh_typesOfLegalCategory_modify,
        hh_typesOfLegalCategory_delete,
        hh_typesOfLegalCategory_export,
        hh_typesOfContracts_access,
        hh_typesOfContracts_create,
        hh_typesOfContracts_modify,
        hh_typesOfContracts_delete,
        hh_typesOfContracts_export,
        hh_typesOfAbsences_access,
        hh_typesOfAbsences_create,
        hh_typesOfAbsences_modify,
        hh_typesOfAbsences_delete,
        hh_typesOfAbsences_export,
        hh_contractModels_access,
        hh_contractModels_create,
        hh_contractModels_modify,
        hh_contractModels_delete,
        hh_contractModels_export,
        hh_localBankHolidays_access,
        hh_localBankHolidays_create,
        hh_localBankHolidays_modify,
        hh_localBankHolidays_delete,
        hh_localBankHolidays_export,
        hh_selectionTypesEvaluation_access,
        hh_selectionTypesEvaluation_create,
        hh_selectionTypesEvaluation_modify,
        hh_selectionTypesEvaluation_delete,
        hh_selectionTypesEvaluation_export,
        operativeModule_staffAssignments_access,
        operativeModule_staffAssignments_create,
        operativeModule_staffAssignments_modify,
        operativeModule_staffAssignments_delete,
        operativeModule_staffAssignments_export,
        operativeModule_workParts_access,
        operativeModule_workParts_create,
        operativeModule_workParts_modify,
        operativeModule_workParts_delete,
        operativeModule_workParts_export,
        operativeModule_AssignmentType_access,
        operativeModule_AssignmentType_create,
        operativeModule_AssignmentType_modify,
        operativeModule_AssignmentType_delete,
        operativeModule_AssignmentType_export,
        operativeModule_workPartsConfig_access,
        operativeModule_workPartsConfig_modify,
        operativeModule_workPartsConfig_export,
        financialModule_contracts_access,
        financialModule_contracts_create,
        financialModule_contracts_modify,
        financialModule_contracts_delete,
        financialModule_contracts_export,
        financialModule_suppliersContracts_access,
        financialModule_suppliersContracts_create,
        financialModule_suppliersContracts_modify,
        financialModule_suppliersContracts_delete,
        financialModule_suppliersContracts_export,
        financialModule_billingManagement_access,
        financialModule_billingManagement_create,
        financialModule_billingManagement_modify,
        financialModule_billingManagement_delete,
        financialModule_billingManagement_export,
        financialModule_staffEconomicManagement_access,
        financialModule_staffEconomicManagement_create,
        financialModule_staffEconomicManagement_modify,
        financialModule_staffEconomicManagement_delete,
        financialModule_staffEconomicManagement_export,
        financialModule_staffEconomicPayments_access,
        financialModule_staffEconomicPayments_create,
        financialModule_staffEconomicPayments_modify,
        financialModule_staffEconomicPayments_delete,
        financialModule_staffEconomicPayments_export,
        financialModule_suppliersPayments_access,
        financialModule_suppliersPayments_create,
        financialModule_suppliersPayments_modify,
        financialModule_suppliersPayments_delete,
        financialModule_suppliersPayments_export,
        financialModule_purchaseOrderManagement_access,
        financialModule_purchaseOrderManagement_create,
        financialModule_purchaseOrderManagement_modify,
        financialModule_purchaseOrderManagement_delete,
        financialModule_purchaseOrderManagement_export,
        financialModule_travelRequest_access,
        financialModule_travelRequest_create,
        financialModule_travelRequest_modify,
        financialModule_travelRequest_delete,
        financialModule_travelRequest_cancel,
        financialModule_travelRequest_export,
        financialModule_travelManagement_access,
        financialModule_travelManagement_modify,
        financialModule_travelManagement_export,
        financialModule_expenseRecord_access,
        financialModule_expenseRecord_create,
        financialModule_expenseRecord_modify,
        financialModule_expenseRecord_download,
        financialModule_expenseRecord_export,
        financialModule_expensesManagement_access,
        financialModule_expensesManagement_create,
        financialModule_expensesManagement_modify,
        financialModule_expensesManagement_download,
        financialModule_expensesManagement_export,
        financialModule_companies_access,
        financialModule_companies_create,
        financialModule_companies_modify,
        financialModule_companies_delete,
        financialModule_companies_export,
        financialModule_typeOfCurrency_access,
        financialModule_typeOfCurrency_create,
        financialModule_typeOfCurrency_modify,
        financialModule_typeOfCurrency_delete,
        financialModule_typeOfCurrency_export,
        financialModule_currencyManagement_access,
        financialModule_currencyManagement_create,
        financialModule_currencyManagement_modify,
        financialModule_currencyManagement_delete,
        financialModule_currencyManagement_export,
        financialModule_contractStatus_access,
        financialModule_contractStatus_create,
        financialModule_contractStatus_modify,
        financialModule_contractStatus_delete,
        financialModule_contractStatus_export,
        financialModule_iva_access,
        financialModule_iva_create,
        financialModule_iva_modify,
        financialModule_iva_delete,
        financialModule_iva_export,
        /*        financialModule_typeOfRententions_access,
        financialModule_typeOfRententions_create,
        financialModule_typeOfRententions_modify,
        financialModule_typeOfRententions_delete,
        financialModule_typeOfRententions_export, */
        financialModule_suppliersTypes_access,
        financialModule_suppliersTypes_create,
        financialModule_suppliersTypes_modify,
        financialModule_suppliersTypes_delete,
        financialModule_suppliersTypes_export,
        financialModule_externalSuppliers_access,
        financialModule_externalSuppliers_create,
        financialModule_externalSuppliers_modify,
        financialModule_externalSuppliers_delete,
        financialModule_externalSuppliers_export,
        financialModule_purchaseOrderAcceptance_access,
        financialModule_purchaseOrderAcceptance_create,
        financialModule_purchaseOrderAcceptance_modify,
        financialModule_purchaseOrderAcceptance_delete,
        financialModule_purchaseOrderAcceptance_export,
        financialModule_businessExpenseTypes_access,
        financialModule_businessExpenseTypes_create,
        financialModule_businessExpenseTypes_modify,
        financialModule_businessExpenseTypes_delete,
        financialModule_businessExpenseTypes_export,
        financialModule_requestStatus_access,
        financialModule_requestStatus_create,
        financialModule_requestStatus_modify,
        financialModule_requestStatus_delete,
        financialModule_requestStatus_export,
        financialModule_travelRequestEmailAddress_access,
        financialModule_travelRequestEmailAddress_create,
        financialModule_travelRequestEmailAddress_modify,
        financialModule_travelRequestEmailAddress_delete,
        financialModule_travelRequestEmailAddress_export,
        financialModule_staffExpensesTypes_access,
        financialModule_staffExpensesTypes_create,
        financialModule_staffExpensesTypes_modify,
        financialModule_staffExpensesTypes_delete,
        financialModule_staffExpensesTypes_export,
        financialModule_personsTypes_access,
        financialModule_personsTypes_create,
        financialModule_personsTypes_modify,
        financialModule_personsTypes_delete,
        financialModule_personsTypes_export,
        financialModule_voucherType_access,
        financialModule_voucherType_create,
        financialModule_voucherType_modify,
        financialModule_voucherType_delete,
        financialModule_voucherType_export,
        financialModule_expensesStatus_access,
        financialModule_expensesStatus_create,
        financialModule_expensesStatus_modify,
        financialModule_expensesStatus_delete,
        financialModule_expensesStatus_export,
        financialModule_expensesEmailAddress_access,
        financialModule_expensesEmailAddress_create,
        financialModule_expensesEmailAddress_modify,
        financialModule_expensesEmailAddress_delete,
        financialModule_expensesEmailAddress_export,
        translationModule_defaultSentences_access,
        translationModule_defaultSentences_create,
        translationModule_defaultSentences_modify,
        translationModule_defaultSentences_delete,
        translationModule_translationSentences_access,
        translationModule_translationSentences_create,
        translationModule_translationSentences_modify,
        translationModule_translationSentences_delete
      }
    };
    const promise = new Promise((resolve) => {
      addRole(action);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
      } else {
        notification('danger', result);
      }
    });
  };

    handleChangePanel = (panel) => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false);
    //  this.setState({ [event.target.name]: event.target.checked })
      console.log(panel);
      if (isExpanded === true) {
        this.setState({ expanded: panel });
      } else {
        this.setState({ expanded: false });
      }
    };

  handleChangeAdminModule= (panel) => (event, isExpanded) => {
    this.setState({ admin_user_Management_access: event.target.checked });
    this.setState({ admin_user_Management_create: event.target.checked });
    this.setState({ admin_user_Management_modify: event.target.checked });
    this.setState({ admin_user_Management_delete: event.target.checked });
    this.setState({ admin_user_Management_export: event.target.checked });
    this.setState({ admin_roles_management_access: event.target.checked });
    this.setState({ admin_roles_management_create: event.target.checked });
    this.setState({ admin_roles_management_modify: event.target.checked });
    this.setState({ admin_roles_management_delete: event.target.checked });
    this.setState({ admin_roles_management_export: event.target.checked });
  };

  handleChangeTranslationModule= (panel) => (event, isExpanded) => {
    this.setState({ translationModule_defaultSentences_access: event.target.checked });
    this.setState({ translationModule_defaultSentences_create: event.target.checked });
    this.setState({ translationModule_defaultSentences_modify: event.target.checked });
    this.setState({ translationModule_defaultSentences_delete: event.target.checked });
    this.setState({ translationModule_translationSentences_access: event.target.checked });
    this.setState({ translationModule_translationSentences_create: event.target.checked });
    this.setState({ translationModule_translationSentences_modify: event.target.checked });
    this.setState({ translationModule_translationSentences_delete: event.target.checked });
  };

  render() {
    const {
      expanded,
      roleName,
      /*   theRoleName, */
      admin_user_Management_access,
      admin_user_Management_create,
      admin_user_Management_modify,
      admin_user_Management_delete,
      admin_user_Management_export,
      admin_roles_management_access,
      admin_roles_management_create,
      admin_roles_management_modify,
      admin_roles_management_delete,
      admin_roles_management_export,
      // //commercial
      commercial_customers_access,
      commercial_customers_create,
      commercial_customers_modify,
      commercial_customers_delete,
      commercial_customers_export,
      commercial_commercialAssignments_access,
      commercial_commercialAssignments_create,
      commercial_commercialAssignments_import,
      commercial_commercialAssignments_delete,
      commercial_commercialAssignments_export,
      commercial_clientContact_access,
      commercial_clientContact_create,
      commercial_clientContact_modify,
      commercial_clientContact_delete,
      commercial_clientContact_export,
      commercial_commercialOperation_access,
      commercial_commercialOperation_create,
      commercial_commercialOperation_modify,
      commercial_commercialOperation_delete,
      commercial_commercialOperation_export,
      commercial_commercialAction_access,
      commercial_commercialAction_create,
      commercial_commercialAction_modify,
      commercial_commercialAction_delete,
      commercial_commercialAction_export,
      commercial_countriesStatesCities_access,
      commercial_countriesStatesCities_create,
      commercial_countriesStatesCities_modify,
      commercial_countriesStatesCities_delete,
      commercial_countriesStatesCities_export,
      commercial_StateOfCommercialOperation_access,
      commercial_StateOfCommercialOperation_create,
      commercial_StateOfCommercialOperation_modify,
      commercial_StateOfCommercialOperation_delete,
      commercial_StateOfCommercialOperation_export,
      commercial_contactByOperationStatus_access,
      commercial_contactByOperationStatus_create,
      commercial_contactByOperationStatus_modify,
      commercial_contactByOperationStatus_delete,
      commercial_contactByOperationStatus_export,
      commercial_serviceType_access,
      commercial_serviceType_create,
      commercial_serviceType_modify,
      commercial_serviceType_delete,
      commercial_serviceType_export,
      commercial_sectorsCompany_access,
      commercial_sectorsCompany_create,
      commercial_sectorsCompany_modify,
      commercial_sectorsCompany_delete,
      commercial_sectorsCompany_export,
      commercial_titleType_access,
      commercial_titleType_create,
      commercial_titleType_modify,
      commercial_titleType_delete,
      commercial_titleType_export,
      commercial_documentManager_access,
      hh_administrativeStructureDefinition_access,
      hh_administrativeStructureDefinition_create,
      hh_administrativeStructureDefinition_modify,
      hh_administrativeStructureDefinition_delete,
      hh_administrativeStructureDefinition_export,
      hh_administrativeStructureAssignation_access,
      hh_administrativeStructureAssignation_modify,
      hh_functionalStructureDefinition_access,
      hh_functionalStructureDefinition_create,
      hh_functionalStructureDefinition_modify,
      hh_functionalStructureDefinition_delete,
      hh_functionalStructureDefinition_export,
      hh_functionalStructureAssignation_access,
      hh_functionalStructureAssignation_modify,
      hh_staff_personalInformationManagement_access,
      hh_staff_personalInformationManagement_create,
      hh_staff_personalInformationManagement_modify,
      hh_staff_personalInformationManagement_delete,
      hh_staff_personalInformationManagement_export,
      hh_staff_contractInformationManagement_access,
      hh_staff_contractInformationManagement_create,
      hh_staff_contractInformationManagement_modify,
      hh_staff_contractInformationManagement_delete,
      hh_staff_contractInformationManagement_export,
      hh_staff_economicObjectiveManagement_access,
      hh_staff_economicObjectiveManagement_create,
      hh_staff_economicObjectiveManagement_modify,
      hh_staff_economicObjectiveManagement_delete,
      hh_staff_economicObjectiveManagement_export,
      hh_absenceRequest_access,
      hh_absenceRequest_create,
      hh_absenceRequest_modify,
      hh_absenceRequest_delete,
      hh_absenceRequest_export,
      hh_absenceConsult_access,
      hh_absenceConsult_modify,
      hh_absenceConsult_export,
      hh_selectionProcessInformation_access,
      hh_selectionProcessInformation_create,
      hh_selectionProcessInformation_modify,
      hh_selectionProcessInformation_delete,
      hh_selectionProcessInformation_export,
      hh_typesOfLegalCategory_access,
      hh_typesOfLegalCategory_create,
      hh_typesOfLegalCategory_modify,
      hh_typesOfLegalCategory_delete,
      hh_typesOfLegalCategory_export,
      hh_typesOfContracts_access,
      hh_typesOfContracts_create,
      hh_typesOfContracts_modify,
      hh_typesOfContracts_delete,
      hh_typesOfContracts_export,
      hh_typesOfAbsences_access,
      hh_typesOfAbsences_create,
      hh_typesOfAbsences_modify,
      hh_typesOfAbsences_delete,
      hh_typesOfAbsences_export,
      hh_contractModels_access,
      hh_contractModels_create,
      hh_contractModels_modify,
      hh_contractModels_delete,
      hh_contractModels_export,
      hh_localBankHolidays_access,
      hh_localBankHolidays_create,
      hh_localBankHolidays_modify,
      hh_localBankHolidays_delete,
      hh_localBankHolidays_export,
      hh_selectionTypesEvaluation_access,
      hh_selectionTypesEvaluation_create,
      hh_selectionTypesEvaluation_modify,
      hh_selectionTypesEvaluation_delete,
      hh_selectionTypesEvaluation_export,
      operativeModule_staffAssignments_access,
      operativeModule_staffAssignments_create,
      operativeModule_staffAssignments_modify,
      operativeModule_staffAssignments_delete,
      operativeModule_staffAssignments_export,
      operativeModule_workParts_access,
      operativeModule_workParts_create,
      operativeModule_workParts_modify,
      operativeModule_workParts_delete,
      operativeModule_workParts_export,
      operativeModule_AssignmentType_access,
      operativeModule_AssignmentType_create,
      operativeModule_AssignmentType_modify,
      operativeModule_AssignmentType_delete,
      operativeModule_AssignmentType_export,
      operativeModule_workPartsConfig_access,
      operativeModule_workPartsConfig_modify,
      operativeModule_workPartsConfig_export,
      financialModule_contracts_access,
      financialModule_contracts_create,
      financialModule_contracts_modify,
      financialModule_contracts_delete,
      financialModule_contracts_export,
      financialModule_suppliersContracts_access,
      financialModule_suppliersContracts_create,
      financialModule_suppliersContracts_modify,
      financialModule_suppliersContracts_delete,
      financialModule_suppliersContracts_export,
      financialModule_billingManagement_access,
      financialModule_billingManagement_create,
      financialModule_billingManagement_modify,
      financialModule_billingManagement_delete,
      financialModule_billingManagement_export,
      financialModule_staffEconomicManagement_access,
      financialModule_staffEconomicManagement_create,
      financialModule_staffEconomicManagement_modify,
      financialModule_staffEconomicManagement_delete,
      financialModule_staffEconomicManagement_export,
      financialModule_staffEconomicPayments_access,
      financialModule_staffEconomicPayments_create,
      financialModule_staffEconomicPayments_modify,
      financialModule_staffEconomicPayments_delete,
      financialModule_staffEconomicPayments_export,
      financialModule_suppliersPayments_access,
      financialModule_suppliersPayments_create,
      financialModule_suppliersPayments_modify,
      financialModule_suppliersPayments_delete,
      financialModule_suppliersPayments_export,
      financialModule_purchaseOrderManagement_access,
      financialModule_purchaseOrderManagement_create,
      financialModule_purchaseOrderManagement_modify,
      financialModule_purchaseOrderManagement_delete,
      financialModule_purchaseOrderManagement_export,
      financialModule_travelRequest_access,
      financialModule_travelRequest_create,
      financialModule_travelRequest_modify,
      financialModule_travelRequest_delete,
      financialModule_travelRequest_cancel,
      financialModule_travelRequest_export,
      financialModule_travelManagement_access,
      financialModule_travelManagement_modify,
      financialModule_travelManagement_export,
      financialModule_expenseRecord_access,
      financialModule_expenseRecord_create,
      financialModule_expenseRecord_modify,
      financialModule_expenseRecord_download,
      financialModule_expenseRecord_export,
      financialModule_expensesManagement_access,
      financialModule_expensesManagement_create,
      financialModule_expensesManagement_modify,
      financialModule_expensesManagement_download,
      financialModule_expensesManagement_export,
      financialModule_companies_access,
      financialModule_companies_create,
      financialModule_companies_modify,
      financialModule_companies_delete,
      financialModule_companies_export,
      financialModule_typeOfCurrency_access,
      financialModule_typeOfCurrency_create,
      financialModule_typeOfCurrency_modify,
      financialModule_typeOfCurrency_delete,
      financialModule_typeOfCurrency_export,
      financialModule_currencyManagement_access,
      financialModule_currencyManagement_create,
      financialModule_currencyManagement_modify,
      financialModule_currencyManagement_delete,
      financialModule_currencyManagement_export,
      financialModule_contractStatus_access,
      financialModule_contractStatus_create,
      financialModule_contractStatus_modify,
      financialModule_contractStatus_delete,
      financialModule_contractStatus_export,
      financialModule_iva_access,
      financialModule_iva_create,
      financialModule_iva_modify,
      financialModule_iva_delete,
      financialModule_iva_export,
      /*      financialModule_typeOfRententions_access,
      financialModule_typeOfRententions_create,
      financialModule_typeOfRententions_modify,
      financialModule_typeOfRententions_delete,
      financialModule_typeOfRententions_export, */
      financialModule_suppliersTypes_access,
      financialModule_suppliersTypes_create,
      financialModule_suppliersTypes_modify,
      financialModule_suppliersTypes_delete,
      financialModule_suppliersTypes_export,
      financialModule_externalSuppliers_access,
      financialModule_externalSuppliers_create,
      financialModule_externalSuppliers_modify,
      financialModule_externalSuppliers_delete,
      financialModule_externalSuppliers_export,
      financialModule_purchaseOrderAcceptance_access,
      financialModule_purchaseOrderAcceptance_create,
      financialModule_purchaseOrderAcceptance_modify,
      financialModule_purchaseOrderAcceptance_delete,
      financialModule_purchaseOrderAcceptance_export,
      financialModule_businessExpenseTypes_access,
      financialModule_businessExpenseTypes_create,
      financialModule_businessExpenseTypes_modify,
      financialModule_businessExpenseTypes_delete,
      financialModule_businessExpenseTypes_export,
      financialModule_requestStatus_access,
      financialModule_requestStatus_create,
      financialModule_requestStatus_modify,
      financialModule_requestStatus_delete,
      financialModule_requestStatus_export,
      financialModule_travelRequestEmailAddress_access,
      financialModule_travelRequestEmailAddress_create,
      financialModule_travelRequestEmailAddress_modify,
      financialModule_travelRequestEmailAddress_delete,
      financialModule_travelRequestEmailAddress_export,
      financialModule_staffExpensesTypes_access,
      financialModule_staffExpensesTypes_create,
      financialModule_staffExpensesTypes_modify,
      financialModule_staffExpensesTypes_delete,
      financialModule_staffExpensesTypes_export,
      financialModule_personsTypes_access,
      financialModule_personsTypes_create,
      financialModule_personsTypes_modify,
      financialModule_personsTypes_delete,
      financialModule_personsTypes_export,
      financialModule_voucherType_access,
      financialModule_voucherType_create,
      financialModule_voucherType_modify,
      financialModule_voucherType_delete,
      financialModule_voucherType_export,
      financialModule_expensesStatus_access,
      financialModule_expensesStatus_create,
      financialModule_expensesStatus_modify,
      financialModule_expensesStatus_delete,
      financialModule_expensesStatus_export,
      financialModule_expensesEmailAddress_access,
      financialModule_expensesEmailAddress_create,
      financialModule_expensesEmailAddress_modify,
      financialModule_expensesEmailAddress_delete,
      financialModule_expensesEmailAddress_export,
      translationModule_defaultSentences_access,
      translationModule_defaultSentences_create,
      translationModule_defaultSentences_modify,
      translationModule_defaultSentences_delete,
      translationModule_translationSentences_access,
      translationModule_translationSentences_create,
      translationModule_translationSentences_modify,
      translationModule_translationSentences_delete,
    } = this.state;
    const {
      classes, allRoles, addRole, errors, isLoading, roleResponse, getAllRoles, updateRole, deleteRole, allActions, allSubjects, addRoleAbilities,
      isLoadingAction, actionResponse, errorsAction
    } = this.props;
    const { columns, roleDescription } = this.state;
    (!isLoadingAction && actionResponse) && this.editingPromiseResolveAction(actionResponse);
    (!isLoadingAction && !actionResponse) && this.editingPromiseResolveAction(errorsAction);
    // Sent resolve to editing promises
    (!isLoading && roleResponse) && this.editingPromiseResolve(roleResponse);
    (!isLoading && !roleResponse) && this.editingPromiseResolve(errors);
    return (
      <div>
        <PapperBlock
          title={isEmpty(this.props.location.state)
            ? 'Add new Role' : 'Actions'}
          desc=""
          icon="ios-people-outline"
          noMargin
          overflowX
        >
          {isEmpty(this.props.location.state)
            ? (
              <div style={{ margin: 'auto', width: '50%', textAlign: 'center' }}>
                <div>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '30%' }}
                    required
                  >
                    <TextField id="standard-basic" label="Role Name*" value={roleName} name="roleName" onChange={this.handleChangeRoleName} />
                  </FormControl>
                </div>
                <br />
                <div>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '70%' }}
                    required
                  >
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      name="roleDescription"
                      value={roleDescription}
                      style={{ width: '100%' }}
                      className={classes.textField}
                      onChange={this.handleChangeDescription}
                    />
                  </FormControl>
                </div>
              </div>
            )
            : (
              <div style={{ margin: 'auto', width: '50%', textAlign: 'center' }}>
                <div>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '30%' }}
                    required
                  >
                    <TextField id="standard-basic" label="Role Name*" value={roleName} name="roleName" onChange={this.handleChangeRoleName2} />
                  </FormControl>
                </div>
                <br />
                <div>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '70%' }}
                    required
                  >
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      name="roleDescription"
                      value={roleDescription}
                      style={{ width: '100%' }}
                      className={classes.textField}
                      onChange={this.handleChangeDescription}
                    />
                  </FormControl>
                </div>
              </div>
            )}
          <br />
          <Accordion expanded={expanded === 'panel1'} onChange={this.handleChangePanel('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
1. Administrative Module
                <Checkbox onChange={this.handleChangeAdminModule('admin')} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={admin_user_Management_access} onChange={this.handleChange} name="admin_user_Management_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={admin_user_Management_create} onChange={this.handleChange} name="admin_user_Management_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={admin_user_Management_modify} onChange={this.handleChange} name="admin_user_Management_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={admin_user_Management_delete} onChange={this.handleChange} name="admin_user_Management_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={admin_user_Management_export} onChange={this.handleChange} name="admin_user_Management_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Roles Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={admin_roles_management_access} onChange={this.handleChange} name="admin_roles_management_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={admin_roles_management_create} onChange={this.handleChange} name="admin_roles_management_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={admin_roles_management_modify} onChange={this.handleChange} name="admin_roles_management_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={admin_roles_management_delete} onChange={this.handleChange} name="admin_roles_management_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={admin_roles_management_export} onChange={this.handleChange} name="admin_roles_management_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={this.handleChangePanel('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>2. Commercial Module</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_customers_access} onChange={this.handleChange} name="commercial_customers_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_customers_create} onChange={this.handleChange} name="commercial_customers_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_customers_modify} onChange={this.handleChange} name="commercial_customers_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_customers_delete} onChange={this.handleChange} name="commercial_customers_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_customers_export} onChange={this.handleChange} name="commercial_customers_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Commercial Assignments" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAssignments_access} onChange={this.handleChange} name="commercial_commercialAssignments_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAssignments_create} onChange={this.handleChange} name="commercial_commercialAssignments_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAssignments_import} onChange={this.handleChange} name="commercial_commercialAssignments_import" />}
                    label="Import"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAssignments_delete} onChange={this.handleChange} name="commercial_commercialAssignments_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAssignments_export} onChange={this.handleChange} name="commercial_commercialAssignments_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Client Contract" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_clientContact_access} onChange={this.handleChange} name="commercial_clientContact_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_clientContact_create} onChange={this.handleChange} name="commercial_clientContact_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_clientContact_modify} onChange={this.handleChange} name="commercial_clientContact_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_clientContact_delete} onChange={this.handleChange} name="commercial_clientContact_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_clientContact_export} onChange={this.handleChange} name="commercial_clientContact_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Commercial Operation" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialOperation_access} onChange={this.handleChange} name="commercial_commercialOperation_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialOperation_create} onChange={this.handleChange} name="commercial_commercialOperation_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialOperation_modify} onChange={this.handleChange} name="commercial_commercialOperation_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialOperation_delete} onChange={this.handleChange} name="commercial_commercialOperation_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialOperation_export} onChange={this.handleChange} name="commercial_commercialOperation_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Commercial Action" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAction_access} onChange={this.handleChange} name="commercial_commercialAction_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAction_create} onChange={this.handleChange} name="commercial_commercialAction_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAction_modify} onChange={this.handleChange} name="commercial_commercialAction_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAction_delete} onChange={this.handleChange} name="commercial_commercialAction_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_commercialAction_export} onChange={this.handleChange} name="commercial_commercialAction_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Countries-States-Cities" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_countriesStatesCities_access} onChange={this.handleChange} name="commercial_countriesStatesCities_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_countriesStatesCities_create} onChange={this.handleChange} name="commercial_countriesStatesCities_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_countriesStatesCities_modify} onChange={this.handleChange} name="commercial_countriesStatesCities_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_countriesStatesCities_delete} onChange={this.handleChange} name="commercial_countriesStatesCities_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_countriesStatesCities_export} onChange={this.handleChange} name="commercial_countriesStatesCities_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="State of Commercial Operation" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_StateOfCommercialOperation_access} onChange={this.handleChange} name="commercial_StateOfCommercialOperation_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_StateOfCommercialOperation_create} onChange={this.handleChange} name="commercial_StateOfCommercialOperation_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_StateOfCommercialOperation_modify} onChange={this.handleChange} name="commercial_StateOfCommercialOperation_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_StateOfCommercialOperation_delete} onChange={this.handleChange} name="commercial_StateOfCommercialOperation_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_StateOfCommercialOperation_export} onChange={this.handleChange} name="commercial_StateOfCommercialOperation_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Contact by Operation Status" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_contactByOperationStatus_access} onChange={this.handleChange} name="commercial_contactByOperationStatus_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_contactByOperationStatus_create} onChange={this.handleChange} name="commercial_contactByOperationStatus_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_contactByOperationStatus_modify} onChange={this.handleChange} name="commercial_contactByOperationStatus_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_contactByOperationStatus_delete} onChange={this.handleChange} name="commercial_contactByOperationStatus_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_contactByOperationStatus_export} onChange={this.handleChange} name="commercial_contactByOperationStatus_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Service Type" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_serviceType_access} onChange={this.handleChange} name="commercial_serviceType_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_serviceType_create} onChange={this.handleChange} name="commercial_serviceType_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_serviceType_modify} onChange={this.handleChange} name="commercial_serviceType_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_serviceType_delete} onChange={this.handleChange} name="commercial_serviceType_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_serviceType_export} onChange={this.handleChange} name="commercial_serviceType_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sectors Company" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_sectorsCompany_access} onChange={this.handleChange} name="commercial_sectorsCompany_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_sectorsCompany_create} onChange={this.handleChange} name="commercial_sectorsCompany_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_sectorsCompany_modify} onChange={this.handleChange} name="commercial_sectorsCompany_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_sectorsCompany_delete} onChange={this.handleChange} name="commercial_sectorsCompany_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_sectorsCompany_export} onChange={this.handleChange} name="commercial_sectorsCompany_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Title Type" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_titleType_access} onChange={this.handleChange} name="commercial_titleType_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_titleType_create} onChange={this.handleChange} name="commercial_titleType_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_titleType_modify} onChange={this.handleChange} name="commercial_titleType_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_titleType_delete} onChange={this.handleChange} name="commercial_titleType_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={commercial_titleType_export} onChange={this.handleChange} name="commercial_titleType_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Presales Document Managent" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={commercial_documentManager_access} onChange={this.handleChange} name="commercial_documentManager_access" />}
                    label="Access"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={this.handleChangePanel('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>3. HH-RR Module</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Administrative Structure Definition" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_administrativeStructureDefinition_access} onChange={this.handleChange} name="hh_administrativeStructureDefinition_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_administrativeStructureDefinition_create} onChange={this.handleChange} name="hh_administrativeStructureDefinition_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_administrativeStructureDefinition_modify} onChange={this.handleChange} name="hh_administrativeStructureDefinition_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_administrativeStructureDefinition_delete} onChange={this.handleChange} name="hh_administrativeStructureDefinition_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_administrativeStructureDefinition_export} onChange={this.handleChange} name="hh_administrativeStructureDefinition_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Administrative Structure Assignation" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_administrativeStructureAssignation_access} onChange={this.handleChange} name="hh_administrativeStructureAssignation_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_administrativeStructureAssignation_modify} onChange={this.handleChange} name="hh_administrativeStructureAssignation_modify" />}
                    label="Modify"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Functional Structure Definition" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_functionalStructureDefinition_access} onChange={this.handleChange} name="hh_functionalStructureDefinition_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_functionalStructureDefinition_create} onChange={this.handleChange} name="hh_functionalStructureDefinition_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_functionalStructureDefinition_modify} onChange={this.handleChange} name="hh_functionalStructureDefinition_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_functionalStructureDefinition_delete} onChange={this.handleChange} name="hh_functionalStructureDefinition_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_functionalStructureDefinition_export} onChange={this.handleChange} name="hh_functionalStructureDefinition_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Functional Structure Assignation" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_functionalStructureAssignation_access} onChange={this.handleChange} name="hh_functionalStructureAssignation_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_functionalStructureAssignation_modify} onChange={this.handleChange} name="hh_functionalStructureAssignation_modify" />}
                    label="Modify"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Staff – Personal Information Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_personalInformationManagement_access} onChange={this.handleChange} name="hh_staff_personalInformationManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_personalInformationManagement_create} onChange={this.handleChange} name="hh_staff_personalInformationManagement_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_personalInformationManagement_modify} onChange={this.handleChange} name="hh_staff_personalInformationManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_personalInformationManagement_delete} onChange={this.handleChange} name="hh_staff_personalInformationManagement_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_personalInformationManagement_export} onChange={this.handleChange} name="hh_staff_personalInformationManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Staff – Contract Information Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_contractInformationManagement_access} onChange={this.handleChange} name="hh_staff_contractInformationManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_contractInformationManagement_create} onChange={this.handleChange} name="hh_staff_contractInformationManagement_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_contractInformationManagement_modify} onChange={this.handleChange} name="hh_staff_contractInformationManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_contractInformationManagement_delete} onChange={this.handleChange} name="hh_staff_contractInformationManagement_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_contractInformationManagement_export} onChange={this.handleChange} name="hh_staff_contractInformationManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Staff – Economic Objective Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_economicObjectiveManagement_access} onChange={this.handleChange} name="hh_staff_economicObjectiveManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_economicObjectiveManagement_create} onChange={this.handleChange} name="hh_staff_economicObjectiveManagement_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_economicObjectiveManagement_modify} onChange={this.handleChange} name="hh_staff_economicObjectiveManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_economicObjectiveManagement_delete} onChange={this.handleChange} name="hh_staff_economicObjectiveManagement_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_staff_economicObjectiveManagement_export} onChange={this.handleChange} name="hh_staff_economicObjectiveManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Absence Request" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_absenceRequest_access} onChange={this.handleChange} name="hh_absenceRequest_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_absenceRequest_create} onChange={this.handleChange} name="hh_absenceRequest_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_absenceRequest_modify} onChange={this.handleChange} name="hh_absenceRequest_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_absenceRequest_delete} onChange={this.handleChange} name="hh_absenceRequest_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_absenceRequest_export} onChange={this.handleChange} name="hh_absenceRequest_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Absence Consult" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_absenceConsult_access} onChange={this.handleChange} name="hh_absenceConsult_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_absenceConsult_modify} onChange={this.handleChange} name="hh_absenceConsult_modify" />}
                    label="Modify (Accept Reject)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_absenceConsult_export} onChange={this.handleChange} name="hh_absenceConsult_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Selection Process Information" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionProcessInformation_access} onChange={this.handleChange} name="hh_selectionProcessInformation_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionProcessInformation_create} onChange={this.handleChange} name="hh_selectionProcessInformation_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionProcessInformation_modify} onChange={this.handleChange} name="hh_selectionProcessInformation_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionProcessInformation_delete} onChange={this.handleChange} name="hh_selectionProcessInformation_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionProcessInformation_export} onChange={this.handleChange} name="hh_selectionProcessInformation_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Types of Legal Category" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfLegalCategory_access} onChange={this.handleChange} name="hh_typesOfLegalCategory_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfLegalCategory_create} onChange={this.handleChange} name="hh_typesOfLegalCategory_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfLegalCategory_modify} onChange={this.handleChange} name="hh_typesOfLegalCategory_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfLegalCategory_delete} onChange={this.handleChange} name="hh_typesOfLegalCategory_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfLegalCategory_export} onChange={this.handleChange} name="hh_typesOfLegalCategory_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Types of Contracts" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfContracts_access} onChange={this.handleChange} name="hh_typesOfContracts_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfContracts_create} onChange={this.handleChange} name="hh_typesOfContracts_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfContracts_modify} onChange={this.handleChange} name="hh_typesOfContracts_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfContracts_delete} onChange={this.handleChange} name="hh_typesOfContracts_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfContracts_export} onChange={this.handleChange} name="hh_typesOfContracts_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Types of Absences" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfAbsences_access} onChange={this.handleChange} name="hh_typesOfAbsences_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfAbsences_create} onChange={this.handleChange} name="hh_typesOfAbsences_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfAbsences_modify} onChange={this.handleChange} name="hh_typesOfAbsences_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfAbsences_delete} onChange={this.handleChange} name="hh_typesOfAbsences_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_typesOfAbsences_export} onChange={this.handleChange} name="hh_typesOfAbsences_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Contract Models" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_contractModels_access} onChange={this.handleChange} name="hh_contractModels_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_contractModels_create} onChange={this.handleChange} name="hh_contractModels_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_contractModels_modify} onChange={this.handleChange} name="hh_contractModels_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_contractModels_delete} onChange={this.handleChange} name="hh_contractModels_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_contractModels_export} onChange={this.handleChange} name="hh_contractModels_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Local Bank Holidays" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_localBankHolidays_access} onChange={this.handleChange} name="hh_localBankHolidays_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_localBankHolidays_create} onChange={this.handleChange} name="hh_localBankHolidays_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_localBankHolidays_modify} onChange={this.handleChange} name="hh_localBankHolidays_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_localBankHolidays_delete} onChange={this.handleChange} name="hh_localBankHolidays_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_localBankHolidays_export} onChange={this.handleChange} name="hh_localBankHolidays_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Selection Types Evaluation" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionTypesEvaluation_access} onChange={this.handleChange} name="hh_selectionTypesEvaluation_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionTypesEvaluation_create} onChange={this.handleChange} name="hh_selectionTypesEvaluation_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionTypesEvaluation_modify} onChange={this.handleChange} name="hh_selectionTypesEvaluation_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionTypesEvaluation_delete} onChange={this.handleChange} name="hh_selectionTypesEvaluation_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hh_selectionTypesEvaluation_export} onChange={this.handleChange} name="hh_selectionTypesEvaluation_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel4'} onChange={this.handleChangePanel('panel4')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>4. Operative Module</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Staff Assignments" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_staffAssignments_access} onChange={this.handleChange} name="operativeModule_staffAssignments_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_staffAssignments_create} onChange={this.handleChange} name="operativeModule_staffAssignments_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_staffAssignments_modify} onChange={this.handleChange} name="operativeModule_staffAssignments_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_staffAssignments_delete} onChange={this.handleChange} name="operativeModule_staffAssignments_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_staffAssignments_export} onChange={this.handleChange} name="operativeModule_staffAssignments_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Work Parts" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_workParts_access} onChange={this.handleChange} name="operativeModule_workParts_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_workParts_create} onChange={this.handleChange} name="operativeModule_workParts_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_workParts_modify} onChange={this.handleChange} name="operativeModule_workParts_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_workParts_delete} onChange={this.handleChange} name="operativeModule_workParts_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_workParts_export} onChange={this.handleChange} name="operativeModule_workParts_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Assignment Type" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_AssignmentType_access} onChange={this.handleChange} name="operativeModule_AssignmentType_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_AssignmentType_create} onChange={this.handleChange} name="operativeModule_AssignmentType_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_AssignmentType_modify} onChange={this.handleChange} name="operativeModule_AssignmentType_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_AssignmentType_delete} onChange={this.handleChange} name="operativeModule_AssignmentType_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_AssignmentType_export} onChange={this.handleChange} name="operativeModule_AssignmentType_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Work Parts Config" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_workPartsConfig_access} onChange={this.handleChange} name="operativeModule_workPartsConfig_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_workPartsConfig_modify} onChange={this.handleChange} name="operativeModule_workPartsConfig_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={operativeModule_workPartsConfig_export} onChange={this.handleChange} name="operativeModule_workPartsConfig_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel5'} onChange={this.handleChangePanel('panel5')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>5. Financial Module</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Contracts" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contracts_access} onChange={this.handleChange} name="financialModule_contracts_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contracts_create} onChange={this.handleChange} name="financialModule_contracts_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contracts_modify} onChange={this.handleChange} name="financialModule_contracts_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contracts_delete} onChange={this.handleChange} name="financialModule_contracts_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contracts_export} onChange={this.handleChange} name="financialModule_contracts_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Suppliers contracts" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersContracts_access} onChange={this.handleChange} name="financialModule_suppliersContracts_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersContracts_create} onChange={this.handleChange} name="financialModule_suppliersContracts_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersContracts_modify} onChange={this.handleChange} name="financialModule_suppliersContracts_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersContracts_delete} onChange={this.handleChange} name="financialModule_suppliersContracts_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersContracts_export} onChange={this.handleChange} name="financialModule_suppliersContracts_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Billing Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_billingManagement_access} onChange={this.handleChange} name="financialModule_billingManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_billingManagement_create} onChange={this.handleChange} name="financialModule_billingManagement_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_billingManagement_modify} onChange={this.handleChange} name="financialModule_billingManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_billingManagement_delete} onChange={this.handleChange} name="financialModule_billingManagement_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_billingManagement_export} onChange={this.handleChange} name="financialModule_billingManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Staff Economic Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicManagement_access} onChange={this.handleChange} name="financialModule_staffEconomicManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicManagement_create} onChange={this.handleChange} name="financialModule_staffEconomicManagement_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicManagement_modify} onChange={this.handleChange} name="financialModule_staffEconomicManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicManagement_delete} onChange={this.handleChange} name="financialModule_staffEconomicManagement_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicManagement_export} onChange={this.handleChange} name="financialModule_staffEconomicManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Staff Economic Payments" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicPayments_access} onChange={this.handleChange} name="financialModule_staffEconomicPayments_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicPayments_create} onChange={this.handleChange} name="financialModule_staffEconomicPayments_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicPayments_modify} onChange={this.handleChange} name="financialModule_staffEconomicPayments_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicPayments_delete} onChange={this.handleChange} name="financialModule_staffEconomicPayments_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffEconomicPayments_export} onChange={this.handleChange} name="financialModule_staffEconomicPayments_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Suppliers Payments" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersPayments_access} onChange={this.handleChange} name="financialModule_suppliersPayments_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersPayments_create} onChange={this.handleChange} name="financialModule_suppliersPayments_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersPayments_modify} onChange={this.handleChange} name="financialModule_suppliersPayments_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersPayments_delete} onChange={this.handleChange} name="financialModule_suppliersPayments_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersPayments_export} onChange={this.handleChange} name="financialModule_suppliersPayments_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase Order Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderManagement_access} onChange={this.handleChange} name="financialModule_purchaseOrderManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderManagement_create} onChange={this.handleChange} name="financialModule_purchaseOrderManagement_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderManagement_modify} onChange={this.handleChange} name="financialModule_purchaseOrderManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderManagement_delete} onChange={this.handleChange} name="financialModule_purchaseOrderManagement_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderManagement_export} onChange={this.handleChange} name="financialModule_purchaseOrderManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Travel Request" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequest_access} onChange={this.handleChange} name="financialModule_travelRequest_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequest_create} onChange={this.handleChange} name="financialModule_travelRequest_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequest_modify} onChange={this.handleChange} name="financialModule_travelRequest_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequest_delete} onChange={this.handleChange} name="financialModule_travelRequest_delete" />}
                    label="Download"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequest_cancel} onChange={this.handleChange} name="financialModule_travelRequest_cancel" />}
                    label="Cancel"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequest_export} onChange={this.handleChange} name="financialModule_travelRequest_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Travel Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelManagement_access} onChange={this.handleChange} name="financialModule_travelManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelManagement_modify} onChange={this.handleChange} name="financialModule_travelManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelManagement_export} onChange={this.handleChange} name="financialModule_travelManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Expense Record" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expenseRecord_access} onChange={this.handleChange} name="financialModule_expenseRecord_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expenseRecord_create} onChange={this.handleChange} name="financialModule_expenseRecord_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expenseRecord_modify} onChange={this.handleChange} name="financialModule_expenseRecord_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expenseRecord_download} onChange={this.handleChange} name="financialModule_expenseRecord_download" />}
                    label="Download"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expenseRecord_export} onChange={this.handleChange} name="financialModule_expenseRecord_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Expenses Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesManagement_access} onChange={this.handleChange} name="financialModule_expensesManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesManagement_modify} onChange={this.handleChange} name="financialModule_expensesManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesManagement_download} onChange={this.handleChange} name="financialModule_expensesManagement_download" />}
                    label="Download"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesManagement_export} onChange={this.handleChange} name="financialModule_expensesManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Companies" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_companies_access} onChange={this.handleChange} name="financialModule_companies_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_companies_create} onChange={this.handleChange} name="financialModule_companies_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_companies_modify} onChange={this.handleChange} name="financialModule_companies_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_companies_delete} onChange={this.handleChange} name="financialModule_companies_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_companies_export} onChange={this.handleChange} name="financialModule_companies_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Type of Currency" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfCurrency_access} onChange={this.handleChange} name="financialModule_typeOfCurrency_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfCurrency_create} onChange={this.handleChange} name="financialModule_typeOfCurrency_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfCurrency_modify} onChange={this.handleChange} name="financialModule_typeOfCurrency_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfCurrency_delete} onChange={this.handleChange} name="financialModule_typeOfCurrency_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfCurrency_export} onChange={this.handleChange} name="financialModule_typeOfCurrency_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Currency Management" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_currencyManagement_access} onChange={this.handleChange} name="financialModule_currencyManagement_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_currencyManagement_create} onChange={this.handleChange} name="financialModule_currencyManagement_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_currencyManagement_modify} onChange={this.handleChange} name="financialModule_currencyManagement_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_currencyManagement_delete} onChange={this.handleChange} name="financialModule_currencyManagement_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_currencyManagement_export} onChange={this.handleChange} name="financialModule_currencyManagement_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Contract Status" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contractStatus_access} onChange={this.handleChange} name="financialModule_contractStatus_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contractStatus_create} onChange={this.handleChange} name="financialModule_contractStatus_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contractStatus_modify} onChange={this.handleChange} name="financialModule_contractStatus_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contractStatus_delete} onChange={this.handleChange} name="financialModule_contractStatus_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_contractStatus_export} onChange={this.handleChange} name="financialModule_contractStatus_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="I.V.A%:" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_iva_access} onChange={this.handleChange} name="financialModule_iva_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_iva_create} onChange={this.handleChange} name="financialModule_iva_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_iva_modify} onChange={this.handleChange} name="financialModule_iva_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_iva_delete} onChange={this.handleChange} name="financialModule_iva_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_iva_export} onChange={this.handleChange} name="financialModule_iva_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            {/*  <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Type of Retentions" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfRententions_access} onChange={this.handleChange} name="financialModule_typeOfRententions_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfRententions_create} onChange={this.handleChange} name="financialModule_typeOfRententions_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfRententions_modify} onChange={this.handleChange} name="financialModule_typeOfRententions_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfRententions_delete} onChange={this.handleChange} name="financialModule_typeOfRententions_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_typeOfRententions_export} onChange={this.handleChange} name="financialModule_typeOfRententions_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails> */}
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Suppliers Types" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersTypes_access} onChange={this.handleChange} name="financialModule_suppliersTypes_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersTypes_create} onChange={this.handleChange} name="financialModule_suppliersTypes_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersTypes_modify} onChange={this.handleChange} name="financialModule_suppliersTypes_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersTypes_delete} onChange={this.handleChange} name="financialModule_suppliersTypes_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_suppliersTypes_export} onChange={this.handleChange} name="financialModule_suppliersTypes_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="External Suppliers" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_externalSuppliers_access} onChange={this.handleChange} name="financialModule_externalSuppliers_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_externalSuppliers_create} onChange={this.handleChange} name="financialModule_externalSuppliers_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_externalSuppliers_modify} onChange={this.handleChange} name="financialModule_externalSuppliers_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_externalSuppliers_delete} onChange={this.handleChange} name="financialModule_externalSuppliers_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_externalSuppliers_export} onChange={this.handleChange} name="financialModule_externalSuppliers_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase Order Acceptance" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderAcceptance_access} onChange={this.handleChange} name="financialModule_purchaseOrderAcceptance_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderAcceptance_create} onChange={this.handleChange} name="financialModule_purchaseOrderAcceptance_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderAcceptance_modify} onChange={this.handleChange} name="financialModule_purchaseOrderAcceptance_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderAcceptance_delete} onChange={this.handleChange} name="financialModule_purchaseOrderAcceptance_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_purchaseOrderAcceptance_export} onChange={this.handleChange} name="financialModule_purchaseOrderAcceptance_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Business Expense Types" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_businessExpenseTypes_access} onChange={this.handleChange} name="financialModule_businessExpenseTypes_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_businessExpenseTypes_create} onChange={this.handleChange} name="financialModule_businessExpenseTypes_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_businessExpenseTypes_modify} onChange={this.handleChange} name="financialModule_businessExpenseTypes_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_businessExpenseTypes_delete} onChange={this.handleChange} name="financialModule_businessExpenseTypes_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_businessExpenseTypes_export} onChange={this.handleChange} name="financialModule_businessExpenseTypes_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Request Status" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_requestStatus_access} onChange={this.handleChange} name="financialModule_requestStatus_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_requestStatus_create} onChange={this.handleChange} name="financialModule_requestStatus_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_requestStatus_modify} onChange={this.handleChange} name="financialModule_requestStatus_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_requestStatus_delete} onChange={this.handleChange} name="financialModule_requestStatus_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_requestStatus_export} onChange={this.handleChange} name="financialModule_requestStatus_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Travel Request Email Address" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequestEmailAddress_access} onChange={this.handleChange} name="financialModule_travelRequestEmailAddress_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequestEmailAddress_create} onChange={this.handleChange} name="financialModule_travelRequestEmailAddress_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequestEmailAddress_modify} onChange={this.handleChange} name="financialModule_travelRequestEmailAddress_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequestEmailAddress_delete} onChange={this.handleChange} name="financialModule_travelRequestEmailAddress_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_travelRequestEmailAddress_export} onChange={this.handleChange} name="financialModule_travelRequestEmailAddress_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Staff Expenses Types" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffExpensesTypes_access} onChange={this.handleChange} name="financialModule_staffExpensesTypes_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffExpensesTypes_create} onChange={this.handleChange} name="financialModule_staffExpensesTypes_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffExpensesTypes_modify} onChange={this.handleChange} name="financialModule_staffExpensesTypes_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffExpensesTypes_delete} onChange={this.handleChange} name="financialModule_staffExpensesTypes_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_staffExpensesTypes_export} onChange={this.handleChange} name="financialModule_staffExpensesTypes_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Persons Type" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_personsTypes_access} onChange={this.handleChange} name="financialModule_personsTypes_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_personsTypes_create} onChange={this.handleChange} name="financialModule_personsTypes_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_personsTypes_modify} onChange={this.handleChange} name="financialModule_personsTypes_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_personsTypes_delete} onChange={this.handleChange} name="financialModule_personsTypes_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_personsTypes_export} onChange={this.handleChange} name="financialModule_personsTypes_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Voucher Types" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_voucherType_access} onChange={this.handleChange} name="financialModule_voucherType_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_voucherType_create} onChange={this.handleChange} name="financialModule_voucherType_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_voucherType_modify} onChange={this.handleChange} name="financialModule_voucherType_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_voucherType_delete} onChange={this.handleChange} name="financialModule_voucherType_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_voucherType_export} onChange={this.handleChange} name="financialModule_voucherType_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Expenses Status" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesStatus_access} onChange={this.handleChange} name="financialModule_expensesStatus_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesStatus_create} onChange={this.handleChange} name="financialModule_expensesStatus_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesStatus_modify} onChange={this.handleChange} name="financialModule_expensesStatus_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesStatus_delete} onChange={this.handleChange} name="financialModule_expensesStatus_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesStatus_export} onChange={this.handleChange} name="financialModule_expensesStatus_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Expenses Email Address" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesEmailAddress_access} onChange={this.handleChange} name="financialModule_expensesEmailAddress_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesEmailAddress_create} onChange={this.handleChange} name="financialModule_expensesEmailAddress_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesEmailAddress_modify} onChange={this.handleChange} name="financialModule_expensesEmailAddress_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesEmailAddress_delete} onChange={this.handleChange} name="financialModule_expensesEmailAddress_delete" />}
                    label="Delete"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={financialModule_expensesEmailAddress_export} onChange={this.handleChange} name="financialModule_expensesEmailAddress_export" />}
                    label="Export"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel6'} onChange={this.handleChangePanel('panel6')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                6. translation
                <Checkbox onChange={this.handleChangeTranslationModule('translation')} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Default sentences" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={translationModule_defaultSentences_access} onChange={this.handleChange} name="translationModule_defaultSentences_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={translationModule_defaultSentences_create} onChange={this.handleChange} name="translationModule_defaultSentences_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={translationModule_defaultSentences_modify} onChange={this.handleChange} name="translationModule_defaultSentences_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={translationModule_defaultSentences_delete} onChange={this.handleChange} name="translationModule_defaultSentences_delete" />}
                    label="Delete"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
            <AccordionDetails>
              <ListItem button style={{ width: '35%' }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Translation sentences" />
              </ListItem>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={translationModule_translationSentences_access} onChange={this.handleChange} name="translationModule_translationSentences_access" />}
                    label="Access"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={translationModule_translationSentences_create} onChange={this.handleChange} name="translationModule_translationSentences_create" />}
                    label="Create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={translationModule_translationSentences_modify} onChange={this.handleChange} name="translationModule_translationSentences_modify" />}
                    label="Modify"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={translationModule_translationSentences_delete} onChange={this.handleChange} name="translationModule_translationSentences_delete" />}
                    label="Delete"
                  />
                </FormGroup>
              </FormControl>

            </AccordionDetails>
          </Accordion>
          <br />

          <div style={{ margin: 'auto', width: '50%', textAlign: 'center' }}>
            {isEmpty(this.props.location.state)
              ? (
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={this.handleSubmit}
                >
                    Save role
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={this.handleSubmit}
                >
                    Edit Actions
                </Button>
              )
            }
          </div>
        </PapperBlock>
      </div>
    );
  }
}


RoleActions.propTypes = {
  /** Classes */
  classes: PropTypes.object.isRequired,
  /** Location */
  location: PropTypes.object.isRequired,
  /** Errors */
  errors: PropTypes.object.isRequired,
  /** isLoading */
  isLoading: PropTypes.bool.isRequired,
  /** getAllRoles */
  getAllRoles: PropTypes.func.isRequired,
  /** allRoles */
  allRoles: PropTypes.array.isRequired,
  /** allSubjects */
  allSubjects: PropTypes.array.isRequired,
  /** allActions */
  allActions: PropTypes.array.isRequired,
  /** addRole */
  addRole: PropTypes.func.isRequired,
  /** Role Response */
  roleResponse: PropTypes.string.isRequired,
  /** addRole */
  updateRole: PropTypes.func.isRequired,
  /** deleteRole */
  deleteRole: PropTypes.func.isRequired,
  /** getAllSubjects */
  getAllSubjects: PropTypes.func.isRequired,
  /** getAllActions */
  getAllActions: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  allSubjects: state.getIn(['subject']).allSubjects,
  allActions: state.getIn(['action']).allActions,
  allRoles: state.getIn(['roles']).allRoles,
  roleResponse: state.getIn(['roles']).roleResponse,
  isLoading: state.getIn(['roles']).isLoading,
  errors: state.getIn(['roles']).errors,


  actionResponse: state.getIn(['action']).actionResponse,
  isLoadingAction: state.getIn(['action']).isLoading,
  errorsAction: state.getIn(['action']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addRole,
  addRoleAbilities,
  deleteRole,
  getAllRoles,
  updateRole,
  getAllSubjects,
  getAllActions,
  addAction
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleActions));
