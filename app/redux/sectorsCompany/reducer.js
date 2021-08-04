import {
  ADD_SECTORCOMPANY,
  ADD_SECTORCOMPANY_FAILURE,
  ADD_SECTORCOMPANY_SUCCESS,
  DELETE_SECTORCOMPANY,
  DELETE_SECTORCOMPANY_FAILURE,
  DELETE_SECTORCOMPANY_SUCCESS,
  GET_ALL_SECTORCOMPANYS,
  GET_ALL_SECTORCOMPANYS_FAILURE,
  GET_ALL_SECTORCOMPANYS_SUCCESS,
  UPDATE_SECTORCOMPANY,
  UPDATE_SECTORCOMPANY_FAILURE,
  UPDATE_SECTORCOMPANY_SUCCESS,
  GET_ALL_CHILDSECTORCOMPANYS,
  GET_ALL_CHILDSECTORCOMPANYS_SUCCESS,
  GET_ALL_CHILDSECTORCOMPANYS_FAILURE,
  GET_ALL_PRIMARYSECTORCOMPANYS_SUCCESS,

  GET_ALL_SUBCHILDSECTORCOMPANYS,
  GET_ALL_SUBCHILDSECTORCOMPANYS_SUCCESS,
  GET_ALL_SUBCHILDSECTORCOMPANYS_FAILURE,

  DELETECONFIRMATION_SECTORCOMPANY,
  DELETECONFIRMATION_SECTORCOMPANY_SUCCESS,
  DELETECONFIRMATION_SECTORCOMPANY_FAILURE
} from './constants';

const initialState = {
  isLoading: false,
  isLoadingAllSectorChildComapnys: false,
  errors: {},
  sectorComapnyResponse: '',
  sectorChildComapnyResponse: '',
  allSectorComapnys: [],
  allSubSectorChildComapnys: [],
  subsectorComapnyResponse: '',
};

export default function sectorComapnyReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_SECTORCOMPANYS:
    case GET_ALL_SUBCHILDSECTORCOMPANYS:
    case ADD_SECTORCOMPANY:
    case UPDATE_SECTORCOMPANY:
    case DELETE_SECTORCOMPANY:
    case DELETECONFIRMATION_SECTORCOMPANY:
      return {
        ...state,
        isLoading: true,
        sectorComapnyResponse: '',
      };
    case GET_ALL_CHILDSECTORCOMPANYS:
      return {
        ...state,
        isLoadingAllSectorChildComapnys: true,
        sectorChildComapnyResponse: ''
      };
      // SUCCESS ACTIONS
    case ADD_SECTORCOMPANY_SUCCESS:
    case UPDATE_SECTORCOMPANY_SUCCESS:
    case DELETE_SECTORCOMPANY_SUCCESS:
    case DELETECONFIRMATION_SECTORCOMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectorComapnyResponse: action.payload,
        errors: {}
      };

    case GET_ALL_SECTORCOMPANYS_SUCCESS:

      return {
        ...state,
        isLoading: false,
        allSectorComapnys: action.payload,
        sectorComapnyResponse: ''
      };
    case GET_ALL_CHILDSECTORCOMPANYS_SUCCESS:
      return {
        ...state,
        isLoadingAllSectorChildComapnys: false,
        allSectorChildComapnys: action.payload,
        sectorChildComapnyResponse: action.payload,
      };

    case GET_ALL_SUBCHILDSECTORCOMPANYS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allSubSectorChildComapnys: action.payload,
        subsectorComapnyResponse: ''
      };

    case GET_ALL_PRIMARYSECTORCOMPANYS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allSectorPimaryComapnys: action.payload,
        sectorComapnyResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_SECTORCOMPANYS_FAILURE:
    case GET_ALL_SUBCHILDSECTORCOMPANYS_FAILURE:
    case GET_ALL_CHILDSECTORCOMPANYS_FAILURE:
    case ADD_SECTORCOMPANY_FAILURE:
    case UPDATE_SECTORCOMPANY_FAILURE:
    case DELETE_SECTORCOMPANY_FAILURE:
    case DELETECONFIRMATION_SECTORCOMPANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        sectorComapnyResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
