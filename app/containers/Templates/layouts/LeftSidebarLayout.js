import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  Header,
  Sidebar,
  BreadCrumb,
} from 'dan-components';
import dataMenu from 'dan-api/ui/menu';
import { connect } from 'react-redux';
import Decoration from '../Decoration';
import styles from '../appStyles-jss';
let dataMenux = [];
class LeftSidebarLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    const {
      logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);

    /*    this.setState({ aaa: [] });
    if (this.props.moduleName === 'Welcome to commercial module') {
      dataMenux = [dataMenu[0]];
      this.state.aaa.push(dataMenu[0]);
      console.log('xxxxxxxxxxxxx');
    }
    if (this.props.moduleName === 'Welcome to financial module') {
      dataMenux = [dataMenu[1]];
    }
    if (this.props.moduleName === 'Welcome to human resources module') {
      dataMenux = [dataMenu[2]];
    } */
    // console.log('my props ', dataMenux);
    // administration
    if (thelogedUser.userRoles[0].actionsNames.admin_user_Management_access == false) {
      for (const k in dataMenu) {
        if (dataMenu[k].key === 'administration') {
          this.removeByAttr(dataMenu[k].child, 'key', 'users');
        }
      }
    }
    if (thelogedUser.userRoles[0].actionsNames.admin_roles_management_access == false) {
      for (const k in dataMenu) {
        if (dataMenu[k].key === 'administration') {
          this.removeByAttr(dataMenu[k].child, 'key', 'roles');
          if (dataMenu[k].child.length === 0) {
            this.removeByAttr(dataMenu, 'key', 'administration');
          }
        }
      }
    }
    // commercial
    if (thelogedUser.userRoles[0].actionsNames.commercial_customers_access == false) {
      this.access('commercial', 'commercial_manager', 'clients');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_commercialAssignments_access == false) {
      this.access('commercial', 'commercial_manager', 'commercial_assignment');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_clientContact_access == false) {
      this.access('commercial', 'commercial_manager', 'client_contact');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_commercialOperation_access == false) {
      this.access('commercial', 'commercial_manager', 'commercial_operation');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_countriesStatesCities_access == false) {
      this.access('commercial', 'commercial_manager', 'country_assignment');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_commercialAction_access == false) {
      this.access('commercial', 'commercial_manager', 'commercial_action');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_documentManager_access == false) {
      this.access('commercial', 'commercial_manager', 'commercialDocumentManager');
    }

    if (thelogedUser.userRoles[0].actionsNames.commercial_countriesStatesCities_access == false) {
      this.access('commercial', 'commercial_basic_table', 'States');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_StateOfCommercialOperation_access == false) {
      this.access('commercial', 'commercial_basic_table', 'status_of_commercial_operation');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_contactByOperationStatus_access == false) {
      this.access('commercial', 'commercial_basic_table', 'contact_by_operation_status');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_serviceType_access == false) {
      this.access('commercial', 'commercial_basic_table', 'service_type');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_sectorsCompany_access == false) {
      this.access('commercial', 'commercial_basic_table', 'sectorsCompany');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_titleType_access == false) {
      this.access('commercial', 'commercial_basic_table', 'civilityTitle');
    }
    // financial
    if (thelogedUser.userRoles[0].actionsNames.financialModule_contracts_access == false) {
      this.access('financial', 'financial_manager', 'contract');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_billingManagement_access == false) {
      this.access('financial', 'financial_manager', 'billing');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicManagement_access == false) {
      this.access('financial', 'financial_manager', 'staffPaymentManagement');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_access == false) {
      this.access('financial', 'financial_manager', 'staffPayment');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_suppliersContracts_access == false) {
      this.access('financial', 'financial_manager', 'suppliersContract');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_suppliersPayments_access == false) {
      this.access('financial', 'financial_manager', 'suppliersPayment');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_purchaseOrderAcceptance_access == false) {
      this.access('financial', 'financial_manager', 'purchaseOrderManagement');
    }
    // basic table
    if (thelogedUser.userRoles[0].actionsNames.financialModule_companies_access == false) {
      this.access('financial', 'financial_basic_table', 'company');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_contractStatus_access == false) {
      this.access('financial', 'financial_basic_table', 'contractStatus');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_access == false) {
      this.access('financial', 'financial_basic_table', 'TypeOfCurrency');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_currencyManagement_access == false) {
      this.access('financial', 'financial_basic_table', 'currencyManagement');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_iva_access == false) {
      this.access('financial', 'financial_basic_table', 'iva');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_suppliersTypes_access == false) {
      this.access('financial', 'financial_basic_table', 'suppliersType');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_externalSuppliers_access == false) {
      this.access('financial', 'financial_basic_table', 'externalSuppliers');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_purchaseOrderAcceptance_access == false) {
      this.access('financial', 'financial_basic_table', 'purchaseOrderAcceptance');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_businessExpenseTypes_access == false) {
      this.access('financial', 'financial_basic_table', 'businessExpenseTypes');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_travelRequest_access == false) {
      this.access('financial', 'financial_basic_table', 'requestStatus');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_travelRequestEmailAddress_access == false) {
      this.access('financial', 'financial_basic_table', 'travelRequestEmailAddress');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_staffExpensesTypes_access == false) {
      this.access('financial', 'financial_basic_table', 'staffExpenseTypes');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_personsTypes_access == false) {
      this.access('financial', 'financial_basic_table', 'personTypes');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_voucherType_access == false) {
      this.access('financial', 'financial_basic_table', 'voucherTypes');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_expensesStatus_access == false) {
      this.access('financial', 'financial_basic_table', 'expenseStatus');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_expensesEmailAddress_access == false) {
      this.access('financial', 'financial_basic_table', 'expenseEmailAddress');
    }
    /*    if (thelogedUser.userRoles[0].actionsNames.financialModule_typeOfRententions_access == false) {
      this.access('financial', 'financial_basic_table', 'typeOfRetentoins');
    } */

    if (thelogedUser.userRoles[0].actionsNames.financialModule_expenseRecord_access == false) {
      this.access('financial', 'financial-expenses', 'expensesRecord');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_expensesManagement_access == false) {
      this.access('financial', 'financial-expenses', 'expensesManagement');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_travelRequest_access == false) {
      this.access('financial', 'financial-travels', 'travelRequests');
    }
    if (thelogedUser.userRoles[0].actionsNames.financialModule_travelManagement_access == false) {
      this.access('financial', 'financial-travels', 'travelManagement');
    }
    // HH.RR Manager
    if (thelogedUser.userRoles[0].actionsNames.hh_absenceConsult_access == false) {
      this.access('hhrrSystem', 'hhrr_manager', 'absenceConsult');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_absenceRequest_access == false) {
      this.access('hhrrSystem', 'hhrr_manager', 'absenceRequest');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_administrativeStructureAssignation_access == false) {
      this.access('hhrrSystem', 'hhrr_manager', 'administrativeStructure');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_administrativeStructureDefinition_access == false) {
      this.access('hhrrSystem', 'hhrr_manager', 'functionalStructure');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_selectionProcessInformation_access == false) {
      this.access('hhrrSystem', 'hhrr_manager', 'selectionProcessInformation');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_staff_personalInformationManagement_access == false) {
      this.access('hhrrSystem', 'hhrr_manager', 'staff');
    }
    // bt
    if (thelogedUser.userRoles[0].actionsNames.hh_contractModels_access == false) {
      this.access('hhrrSystem', 'hhrr_basic_table', 'contractModel');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_localBankHolidays_access == false) {
      this.access('hhrrSystem', 'hhrr_basic_table', 'localBankHoliday');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_access == false) {
      this.access('hhrrSystem', 'hhrr_basic_table', 'selectionTypeEvaluation');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_typesOfAbsences_access == false) {
      this.access('hhrrSystem', 'hhrr_basic_table', 'absenceType');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_typesOfContracts_access == false) {
      this.access('hhrrSystem', 'hhrr_basic_table', 'contractType');
    }
    if (thelogedUser.userRoles[0].actionsNames.hh_typesOfLegalCategory_access == false) {
      this.access('hhrrSystem', 'hhrr_basic_table', 'legalCategoryType');
    }
    // operative system
    // console.log("thelogedUser.userRoles[0].actionsNames");
    // console.log(thelogedUser.userRoles[0].actionsNames);
    if (thelogedUser.userRoles[0].actionsNames.operativeModule_staffAssignments_access == false) {
      for (const k in dataMenu) {
        if (dataMenu[k].key === 'operativeSystem') {
          this.removeByAttr(dataMenu[k].child, 'key', 'staffAssignment');
        }
      }
    }

    if (thelogedUser.userRoles[0].actionsNames.operativeModule_workParts_access == false) {
      for (const k in dataMenu) {
        if (dataMenu[k].key === 'operativeSystem') {
          this.removeByAttr(dataMenu[k].child, 'key', 'weeklyReport');
        }
      }
    }
    // bt
    if (thelogedUser.userRoles[0].actionsNames.operativeModule_AssignmentType_access == false) {
      this.access('operativeSystem', 'operativeBasicTables', 'assignmentType');
    }
    if (thelogedUser.userRoles[0].actionsNames.operativeModule_workPartsConfig_access == false) {
      this.access('operativeSystem', 'operativeConfigurations', 'weeklyReportConfig');
    }
    // translation
    if (thelogedUser.userRoles[0].actionsNames.translationModule_defaultSentences_access == false) {
      for (const k in dataMenu) {
        if (dataMenu[k].key === 'translation') {
          this.removeByAttr(dataMenu[k].child, 'key', 'defaultSentences');
        }
      }
    }
    //  console.log(dataMenu);
    /*    if (thelogedUser.userRoles[0].actionsNames.translationModule_translationSentences_access == false) {
      for (const k in dataMenu) {
        if (dataMenu[k].key === 'translation') {
          this.removeByAttr(dataMenu[k].child, 'key', 'translationSentences');
          if (dataMenu[k].child.length === 0) {
            this.removeByAttr(dataMenu, 'key', 'translation');
          }
        }
      }
    } */
  }

  access = function (lev3, lev4, lev5) {
    for (const k in dataMenu) {
      if (dataMenu[k].key === lev3) {
        for (const i in dataMenu[k].child) {
          if (dataMenu[k].child[i].key === lev4) {
            this.removeByAttr(dataMenu[k].child[i].child, 'key', lev5);
            if (dataMenu[k].child[i].child.length === 0) {
              this.removeByAttr(dataMenu[k].child, 'key', lev4);
              if (dataMenu[k].child.length === 0) {
                this.removeByAttr(dataMenu, 'key', lev3);
              }
            }
          }
        }
      }
    }
  }

   removeByAttr = function (arr, attr, value) {
     let i = arr.length;
     while (i--) {
       if (arr[i]
          && arr[i].hasOwnProperty(attr)
          && (arguments.length > 2 && arr[i][attr] === value)) {
         arr.splice(i, 1);
       }
     }
     return arr;
   }

   render() {
     const {
       classes,
       children,
       toggleDrawer,
       sidebarOpen,
       loadTransition,
       pageLoaded,
       mode,
       gradient,
       deco,
       history,
       bgPosition,
       changeMode,
       place,
       titleException,
       handleOpenGuide
     } = this.props;
     if (this.props.moduleName === 'Welcome to commercial module') {
       for (const k in dataMenu) {
         if (dataMenu[k].key === 'commercial') {
           dataMenux = [dataMenu[k]];
         }
       }
     }
     if (this.props.moduleName === 'Welcome to financial module') {
       for (const k in dataMenu) {
         if (dataMenu[k].key === 'financial') {
           dataMenux = [dataMenu[k]];
         }
       }
     }
     if (this.props.moduleName === 'Welcome to human resources module') {
       for (const k in dataMenu) {
         if (dataMenu[k].key === 'hhrrSystem') {
           dataMenux = [dataMenu[k]];
         }
       }
     }
     if (this.props.moduleName === 'Welcome to operating systems module') {
       for (const k in dataMenu) {
         if (dataMenu[k].key === 'operativeSystem') {
           dataMenux = [dataMenu[k]];
         }
       }
     }
     if (this.props.moduleName === 'Welcome to administration module') {
       for (const k in dataMenu) {
         if (dataMenu[k].key === 'administration') {
           dataMenux = [dataMenu[k]];
         }
       }
     }
     /*     if (this.props.moduleName === 'Welcome to administration module') {
       dataMenux = [dataMenu[4]];
     } */
     if (window.location.pathname === '/app') {
       dataMenux = [];
     }
     return (
       <Fragment>
         <Header
           toggleDrawerOpen={toggleDrawer}
           margin={sidebarOpen}
           gradient={gradient}
           position="left-sidebar"
           changeMode={changeMode}
           mode={mode}
           title={place}
           history={history}
           openGuide={handleOpenGuide}
         />
         <Sidebar
           open={sidebarOpen}
           toggleDrawerOpen={toggleDrawer}
           loadTransition={loadTransition}
           dataMenu={dataMenux}
           leftSidebar
         />
         <main
           className={classNames(classes.content, !sidebarOpen ? classes.contentPaddingLeft : '')}
           id="mainContent"
         >
           <Decoration
             mode={mode}
             gradient={gradient}
             decoration={deco}
             bgPosition={bgPosition}
             horizontalMenu={false}
           />
           <section className={classNames(classes.mainWrap, classes.sidebarLayout)}>
             {titleException.indexOf(history.location.pathname) < 0 && (
               <div className={classes.pageTitle}>
                 <Typography
                   component="h4"
                   className={bgPosition === 'header' ? classes.darkTitle : classes.lightTitle}
                   variant="h4"
                 >
                   {place}
                 </Typography>
                 <BreadCrumb
                   separator=" / "
                   theme={bgPosition === 'header' ? 'dark' : 'light'}
                   location={history.location}
                 />
               </div>
             )}
             {!pageLoaded && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />)}
             <Fade
               in={pageLoaded}
               {...(pageLoaded ? { timeout: 700 } : {})}
             >
               <div className={!pageLoaded ? classes.hideApp : ''}>
                 {/* Application content will load here */}
                 {children}
               </div>
             </Fade>
           </section>
         </main>
       </Fragment>
     );
   }
}

LeftSidebarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser'),
});


export default withStyles(styles)(connect(
  mapStateToProps,
  null
)(LeftSidebarLayout));
