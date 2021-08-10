import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ThemeContext } from '../../../App/ThemeWrapper';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import EconomicStaffYearService from '../../../Services/EconomicStaffYearService';
import EconomicStaffMonthService from '../../../Services/EconomicStaffMonthService';
import EconomicStaffExtraService from '../../../Services/EconomicStaffExtraService';

const useStyles = makeStyles();

class EconomicStaffPaymentBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      economicStaffsYear: [],
      economicStaffsMonth: [],
      economicStaffsExtra: [],
      openPopUp: false,
      columnsYear: [
        {
          label: 'First Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.firstName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Father Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.fatherFamilyName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Mother Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.motherFamilyName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Employee Number',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.employeeNumber
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Payment Date',
          name: 'yearPayment',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Currency',
          name: 'currency',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (currency) => (
              <React.Fragment>
                {
                  currency.typeOfCurrency.currencyCode
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Gross Salary',
          name: 'grosSalaryYear',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Gross Salary (€)',
          name: 'grosSalaryEuroYear',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'netSalaryYear',
          label: 'Net Salary',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'netSalaryEuroYear',
          label: 'Net Salary (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Contribution Salary',
          name: 'contributionSalaryYear',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Contribution Salary (€)',
          name: 'contributionSalaryEuroYear',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Company Cost',
          name: 'companyCostYear',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Company Cost (€)',
          name: 'companyCostEuroYear',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)} />
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_delete ? (
                  <IconButton onClick={() => this.handleDelete(tableMeta)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                ) : null}
              </React.Fragment>
            )
          }
        }
      ],
      columnsMonth: [
        {
          label: 'First Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.firstName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Father Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.fatherFamilyName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Mother Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.motherFamilyName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Employee Number',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.employeeNumber
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Payment Date',
          name: 'monthPayment',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Currency',
          name: 'currency',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (currency) => (
              <React.Fragment>
                {
                  currency.typeOfCurrency.currencyCode
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Gross Salary',
          name: 'grosSalaryMonth',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Gross Salary (€)',
          name: 'grosSalaryEuroMonth',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'netSalaryMonth',
          label: 'Net Salary',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'netSalaryEuroMonth',
          label: 'Net Salary (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Contribution Salary',
          name: 'contributionSalaryMonth',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Contribution Salary (€)',
          name: 'contributionSalaryEuroMonth',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Company Cost',
          name: 'companyCostMonth',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Company Cost (€)',
          name: 'companyCostEuroMonth',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_access ? (
                  <IconButton onClick={() => this.handleDetailsMonth(tableMeta)} />
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_delete ? (
                  <IconButton onClick={() => this.handleDeleteMonth(tableMeta)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                ) : null}
              </React.Fragment>
            )
          }
        }
      ],
      columnsExtra: [
        {
          label: 'First Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.firstName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Father Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.fatherFamilyName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Mother Name',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.staff.motherFamilyName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Employee Number',
          name: 'economicStaff',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (economicStaff) => (
              <React.Fragment>
                {
                  economicStaff.employeeNumber
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Payment Date',
          name: 'extraordinaryDate',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Currency',
          name: 'currency',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (currency) => (
              <React.Fragment>
                {
                  currency.typeOfCurrency.currencyCode
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Extraordinary Expenses',
          name: 'extraordinaryExpenses',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Extraordinary Expenses (€)',
          name: 'extraordinaryExpensesEuro',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'extraordinaryObjectives',
          label: 'Extraordinary Objectives',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'extraordinaryObjectivesEuro',
          label: 'Extraordinary Objectives (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 80
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 80
              }
            })
          }
        },
        {
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_access ? (
                  <IconButton onClick={() => this.handleDetailsExtra(tableMeta)} />
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_delete ? (
                  <IconButton onClick={() => this.handleDeleteExtra(tableMeta)}>
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

  componentDidMount() {
    EconomicStaffYearService.getEconomicStaffYear().then(result => {
      console.log(result.data);
      this.setState({ economicStaffsYear: result.data });
    });
    EconomicStaffMonthService.getEconomicStaffMonth().then(result => {
      console.log(result.data);
      this.setState({ economicStaffsMonth: result.data });
    });
    EconomicStaffExtraService.getEconomicStaffExtra().then(result => {
      console.log(result.data);
      this.setState({ economicStaffsExtra: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.economicStaffsYear[index].economicStaffYearId;
      console.log(id);
    }

    // eslint-disable-next-line react/sort-comp
    handleDetailsMonth = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.economicStaffsMonth[index].economicStaffMonthId;
      console.log(id);
    }

    // eslint-disable-next-line react/sort-comp
    handleDetailsExtra = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.economicStaffsExtra[index].economicStaffExtraId;
      console.log(id);
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleSave = () => {
    };

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.economicStaffsYear[index].economicStaffYearId;
      EconomicStaffYearService.deleteEconomicStaffYear(id).then(result => {
        this.setState({ economicStaffsYear: result.data });
      });
    };

    handleDeleteMonth = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.economicStaffsMonth[index].economicStaffMonthId;
      EconomicStaffMonthService.deleteEconomicStaffMonth(id).then(result => {
        this.setState({ economicStaffsMonth: result.data, openPopUp: true });
      });
    };

    handleDeleteExtra = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
          + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.economicStaffsExtra[index].economicStaffExtraId;
      EconomicStaffExtraService.deleteEconomicStaffExtra(id).then(result => {
        this.setState({ economicStaffsExtra: result.data, openPopUp: true });
      });
    };

    render() {
      console.log(this.state);
      const {
        economicStaffsYear, economicStaffsMonth, economicStaffsExtra, columnsYear, columnsMonth, columnsExtra
      } = this.state;
      const {
        logedUser
      } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        print: exportButton,
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={economicStaffsYear}
            hasAddRole={false}
            fileName="Staff economic payment year"
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_export}
          />
        )
      };

      const options2 = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        print: exportButton,
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={economicStaffsMonth}
            hasAddRole={false}
            fileName="Staff economic payment month"
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_export}
          />
        )
      };

      const options3 = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        print: exportButton,
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={economicStaffsExtra}
            hasAddRole={false}
            fileName="Staff economic payment extraordinary"
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_staffEconomicPayments_export}
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="Year Payment"
            data={economicStaffsYear}
            columns={columnsYear}
            options={options}
          />
          <br />
          <MUIDataTable
            title="Month Payment"
            data={economicStaffsMonth}
            columns={columnsMonth}
            options={options2}
          />
          <br />
          <MUIDataTable
            title="Extraordinary Payment"
            data={economicStaffsExtra}
            columns={columnsExtra}
            options={options3}
          />
        </div>
      );
    }
}

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser'),
});
const SupliersPaymentBlockMapped = connect(
  mapStateToProps,
  null
)(EconomicStaffPaymentBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <SupliersPaymentBlockMapped changeTheme={changeTheme} classes={classes} />;
};
