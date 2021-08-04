module.exports = [
  {
    key: 'commercial',
    name: 'Commercial',
    icon: 'ios-folder',
    multilevel: true,
    child: [
      {
        key: 'commercial_manager',
        name: 'Commercial Manager',
        icon: 'ios-newspaper-outline',
        keyParent: 'commercial',
        child: [
          {
            key: 'clients',
            name: 'Clients',
            link: '/app/gestion-commercial/clients',
            icon: 'ios-people-outline'
          },
          {
            key: 'commercial_assignment',
            name: 'Commercial assignment',
            link: '/app/configurations/assignments/commercial-assignment'
          },
          {
            key: 'client_contact',
            name: 'Clients Contacts',
            link: '/app/gestion-commercial/contacts',
            icon: 'ios-people-outline'
          },
          {
            key: 'commercial_operation',
            name: 'Commercial Operations',
            link: '/app/gestion-commercial/Commercial-Operations',
            icon: 'ios-people-outline'
          },
          /*          {
            key: 'country_assignment',
            name: 'Country assignment',
            link: '/app/configurations/countries'
          }, */
          {
            key: 'commercial_action',
            name: 'Commercial Action',
            link: '/app/commercial-action'
          },
          {
            key: 'commercialDocumentManager',
            name: 'commercial_document_manager',
            link: '/app/gestion-commercial/document-manager',
            icon: 'ios-newspaper-outline',
          }
        ]
      },
      /*      {
        key: 'commercialDocumentManager',
        name: 'commercial_document_manager',
        icon: 'ios-newspaper-outline',
        link: '/app/gestion-commercial/document-manager',
        keyParent: 'commercial'
      }, */
      {
        key: 'commercial_basic_table',
        name: 'Commercial Basic Tables',
        icon: 'ios-newspaper-outline',
        keyParent: 'commercial',
        child: [
          /*         {
                   key: 'countries',
                   name: 'Countries',
                   link: '/app/configurations/country'
                 }, */
          {
            key: 'States',
            name: 'County State City',
            link: '/app/gestion-commercial/states'
          },
          /*          {
            key: 'cities',
            name: 'Cities',
            link: '/app/gestion-commercial/cities'
          }, */
          {
            key: 'status_of_commercial_operation',
            name: 'Status of Commercial Operation',
            link: '/app/gestion-commercial/status'
          },
          {
            key: 'type_of_action',
            name: 'Type of Commercial Actions',
            link: '/app/gestion-commercial/Action-Type'
          },
          {
            key: 'contact_by_operation_status',
            name: 'Contact by Operation Status',
            link: '/app/gestion-commercial/contact-by-Operation'
          },
          {
            key: 'service_type',
            name: 'Service Type',
            link: '/app/gestion-commercial/service-type',
            icon: 'ios-people-outline'
          },
          /*          {
            key: 'sectors',
            name: 'Sectors',
            link: '/app/gestion-commercial/sectors',
            icon: 'ios-people-outline'
          }, */
          {
            key: 'sectorsCompany',
            name: 'Sectors Company',
            link: '/app/gestion-commercial/sectorsCompany',
            icon: 'ios-people-outline'
          },
          {
            key: 'civilityTitle',
            name: 'Title type',
            link: '/app/gestion-commercial/title-Type',
            icon: 'ios-people-outline'
          },
          /*          {
            key: 'logs',
            name: 'Logs',
            link: '/app/gestion-commercial/welcome'
          }, */

          /* {
            name: 'Countries',
            link: '/app/configurations/country'
          } */
        ]
      }
    ]
  },
  {
    key: 'financial',
    name: 'Financial',
    icon: 'ios-cash',
    multilevel: true,
    child: [
      {
        key: 'financial_manager',
        name: 'Financial Management',
        icon: 'ios-newspaper-outline',
        keyParent: 'financial',
        child: [
          {
            key: 'contract',
            name: 'Contracts',
            link: '/app/gestion-financial/Contracts',
            icon: 'ios-newspaper-outline'
          },
          {
            key: 'billing',
            name: 'Billing',
            link: '/app/gestion-financial/Billing',
            icon: 'ios-cash-outline'
          },
          {
            key: 'staffPaymentManagement',
            name: 'Staff Economic Management',
            link: '/app/gestion-financial/Staff Economic Management',
            icon: 'ios-cash-outline'
          },
          {
            key: 'staffPayment',
            name: 'Staff Economic Payments',
            link: '/app/gestion-financial/Staff Economic Payments',
            icon: 'ios-cash-outline'
          },
          {
            key: 'suppliersContract',
            name: 'Suppliers Contract',
            link: '/app/gestion-financial/Suppliers Contract',
            icon: 'ios-cash-outline'
          },
          {
            key: 'suppliersPayment',
            name: 'Suppliers Payment',
            link: '/app/gestion-financial/Suppliers Payment',
            icon: 'ios-cash-outline'
          },
          {
            key: 'purchaseOrderManagement',
            name: 'Purchase Order Management',
            link: '/app/gestion-financial/Purchase-Order Management',
            icon: 'ios-cash-outline'
          }
        ]
      },
      {
        key: 'financial_basic_table',
        name: 'Financial Basic Tables',
        icon: 'ios-newspaper-outline',
        keyParent: 'financial',
        child: [
          {
            key: 'company',
            name: 'Companies',
            link: '/app/gestion-financial/Company',
            icon: 'ios-people-outline'
          },
          {
            key: 'contractStatus',
            name: 'Contract Status',
            link: '/app/gestion-financial/Contract-Status',
            icon: 'ios-newspaper-outline'
          },
          {
            key: 'TypeOfCurrency',
            name: 'Currency Type',
            link: '/app/gestion-financial/Currency-Type',
            icon: 'ios-cash-outline'
          },
          {
            key: 'currencyManagement',
            name: 'Currency Management',
            link: '/app/gestion-financial/Currency-Management',
            icon: 'ios-cash-outline'
          },
          {
            key: 'iva',
            name: ' I.V.A %',
            link: '/app/gestion-financial/IVA',
            icon: 'ios-cash-outline'
          },
          /*          {
            key: 'typeOfRetentoins',
            name: 'Types of Retentions',
            link: '/app/gestion-financial/Retention',
            icon: 'ios-cash-outline'
          }, */
          {
            key: 'suppliersType',
            name: 'Suppliers Type ',
            link: '/app/gestion-financial/Suppliers-Type',
            icon: 'ios-cash-outline'
          },
          {
            key: 'externalSuppliers',
            name: 'External Suppliers ',
            link: '/app/gestion-financial/External-Suppliers',
            icon: 'ios-cash-outline'
          },
          {
            key: 'purchaseOrderAcceptance',
            name: 'Purchase Order Acceptance ',
            link: '/app/gestion-financial/Purchase-Order',
            icon: 'ios-cash-outline'
          },
          {
            key: 'businessExpenseTypes',
            name: 'business_expense_types',
            link: '/app/gestion-financial/business-expense-types',
            // icon: 'ios-cash-outline'
          },
          {
            key: 'requestStatus',
            name: 'request_status',
            link: '/app/gestion-financial/request-status',
            // icon: 'ios-cash-outline'
          },
          {
            key: 'travelRequestEmailAddress',
            name: 'travel_request_email_address',
            link: '/app/gestion-financial/travel-request-email-address',
            // icon: 'ios-cash-outline'
          },
          {
            key: 'staffExpenseTypes',
            name: 'staff_expense_types',
            link: '/app/gestion-financial/staff-expense-types',
            // icon: 'ios-cash-outline'
          },
          {
            key: 'personTypes',
            name: 'person_types',
            link: '/app/gestion-financial/person-types',
            // icon: 'ios-cash-outline'
          },
          {
            key: 'voucherTypes',
            name: 'voucher_types',
            link: '/app/gestion-financial/voucher-types',
            // icon: 'ios-cash-outline'
          },
          {
            key: 'expenseStatus',
            name: 'expense_status',
            link: '/app/gestion-financial/expense-status',
            // icon: 'ios-cash-outline'
          },
          {
            key: 'expenseEmailAddress',
            name: 'expense_email_address',
            link: '/app/gestion-financial/expense-email-address',
            // icon: 'ios-cash-outline'
          }
        ]
      },
      {
        key: 'financial-expenses',
        name: 'financial_expenses',
        // icon: 'card_travel-icon',
        keyParent: 'financial',
        child: [
          {
            key: 'expensesRecord',
            name: 'expenses_record',
            link: '/app/gestion-financial/expenses-record'
          },
          {
            key: 'expensesManagement',
            name: 'expenses_management',
            link: '/app/gestion-financial/expenses-management'
          }
        ]
      },
      {
        key: 'financial-travels',
        name: 'financial_travels',
        // icon: 'card_travel-icon',
        keyParent: 'financial',
        child: [
          {
            key: 'travelRequests',
            name: 'travel_requests',
            link: '/app/gestion-financial/travel-requests'
          },
          {
            key: 'travelManagement',
            name: 'travel_management',
            link: '/app/gestion-financial/travel-management'
          }
        ]
      }
    ]
  },
  {
    key: 'hhrrSystem',
    name: 'HH.RR System',
    icon: 'ios-people',
    child: [
      {
        key: 'hhrr_manager',
        name: 'HH.RR Manager',
        icon: 'ios-newspaper-outline',
        keyParent: 'hhrrSystem',
        child: [
          {
            key: 'absenceConsult',
            name: 'Absence Consult',
            link: '/app/hh-rr/absenceConsult',
            icon: 'ios-people-outline'
          },
          {
            key: 'absenceRequest',
            name: 'Absence Request',
            link: '/app/hh-rr/absenceRequest',
            icon: 'ios-people-outline'
          },
          {
            key: 'administrativeStructure',
            name: 'Administrative Structure',
            link: '/app/hh-rr/administrativeStructure',
            icon: 'ios-people-outline'
          },
          {
            key: 'functionalStructure',
            name: 'Functional Structure',
            link: '/app/hh-rr/functionalStructure',
            icon: 'ios-people-outline'
          },
          {
            key: 'selectionProcessInformation',
            name: 'Selection Process Information',
            link: '/app/hh-rr/selectionProcessInformation',
            icon: 'ios-people-outline'
          },
          {
            key: 'staff',
            name: 'Staff',
            link: '/app/hh-rr/staff'
          }
        ]
      },
      {
        key: 'hhrr_basic_table',
        name: 'HH.RR Basic Tables',
        icon: 'ios-newspaper-outline',
        keyParent: 'hhrrSystem',
        child: [
          {
            key: 'contractModel',
            name: 'Contract models',
            link: '/app/hh-rr/ContractModel',
            icon: 'ios-paper-outline'
          },
          {
            key: 'localBankHoliday',
            name: 'Local bank holiday',
            link: '/app/hh-rr/LocalBankHoliday',
            icon: 'ios-paper-outline'
          },

          {
            key: 'selectionTypeEvaluation',
            name: 'Selection Type Evaluation',
            link: '/app/hh-rr/selectionTypeEvaluation',
            icon: 'ios-people-outline'
          },
          {
            key: 'absenceType',
            name: 'Types of absence',
            link: '/app/hh-rr/AbsenceType',
            icon: 'ios-paper-outline'
          },
          {
            key: 'contractType',
            name: 'Types of contract',
            link: '/app/hh-rr/ContractType',
            icon: 'ios-paper-outline'
          },
          {
            key: 'legalCategoryType',
            name: 'Types of legal category',
            link: '/app/hh-rr/LegalCategoryType',
            icon: 'ios-paper-outline'
          }
        ]
      }
    ]
  },
  {
    key: 'operativeSystem',
    name: 'operative_system',
    icon: 'ios-cash',
    multilevel: true,
    child: [
      {
        key: 'staffAssignment',
        name: 'staff_assignment',
        link: '/app/operative-system/staff-assignment',
        // icon: 'ios-newspaper-outline'
      },
      {
        key: 'weeklyReport',
        name: 'weekly_report',
        link: '/app/operative-system/weekly-report',
        // icon: 'ios-newspaper-outline'
      },
      {
        key: 'operativeBasicTables',
        name: 'operative_basic_tables',
        // icon: 'ios-newspaper-outline',
        keyParent: 'operativeSystem',
        child: [
          {
            key: 'assignmentType',
            name: 'assignment_type',
            link: '/app/operative-system/basic-tables/assignment-types',
            // icon: 'ios-newspaper-outline'
          }
        ]
      },
      {
        key: 'operativeConfigurations',
        name: 'operative_configurations',
        // icon: 'ios-newspaper-outline',
        keyParent: 'operativeSystem',
        child: [
          {
            key: 'weeklyReportConfig',
            name: 'weekly_report_config',
            link: '/app/operative-system/configurations/weekly-report',
            // icon: 'ios-newspaper-outline'
          }
        ]
      }
    ]
  },
  /* {
    key: 'errors',
    name: 'Errors',
    icon: 'ios-paw-outline',
    child: [
      {
        key: 'errors_page',
        name: 'Errors Pages',
        title: true
      },
      {
        key: 'not_found_page',
        name: 'Not Found Page',
        link: '/app/pages/not-found',
        icon: 'ios-warning-outline'
      },
      {
        key: 'error_page',
        name: 'Error Page',
        link: '/app/pages/error',
        icon: 'ios-warning-outline'
      }
    ]
  }, */
  /* {
    key: 'menu_levels',
    name: 'Menu Levels',
    multilevel: true,
    icon: 'ios-menu-outline',
    child: [
      {
        key: 'level_2',
        keyParent: 'menu_levels',
        multilevel: true,
        name: 'Level 2',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Sub Menu 1',
            keyParent: 'level_2',
            child: [
              {
                key: 'test',
                name: 'diobra',
                link: '/#'
              }
            ]
          }
        ]
      }
    ]
  }, */
  /* {
    key: 'no_child',
    name: 'One Level Menu',
    icon: 'ios-document-outline',
    linkParent: '/app'
  }, */
  {
    key: 'administration',
    name: 'Administration',
    icon: 'ios-people',
    child: [
      {
        key: 'roles',
        name: 'Roles Management',
        link: '/app/data/administration/roles'
      },
      {
        key: 'users',
        name: 'Users Management',
        link: '/app/data/administration/users'
      },
      {
        key: 'logs',
        name: 'Logs',
        link: '/app/data/administration/logs'
      },
      /* {
         key: 'roles_abilities',
         name: 'Actions Management',
         link: '/app/data/administration/role-actions'
       }  ,
     {
         key: 'machines',
         name: 'machines',
         link: '/app/data/administration/machines'
       } */
    ]
  },
  {
    key: 'translation',
    name: 'translation',
    icon: 'translate-icon',
    child: [
      {
        key: 'defaultSentences',
        name: 'default_sentences',
        link: '/app/translation/default-sentences'
      },
      {
        key: 'translationSentences',
        name: 'translation_sentences',
        link: '/app/translation/translation-sentences'
      }
    ]
  }
];
