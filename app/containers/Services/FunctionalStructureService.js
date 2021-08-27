import axios from 'axios';
import ENDPOINTS from '../../api/endpoints';

class FunctionalStructureService {
  getLevels = () => axios.get(`${ENDPOINTS.FUNCTIONALSTRUCTURE}/all`);

  saveLevel = objects => axios.post(`${ENDPOINTS.FUNCTIONALSTRUCTURE}/add`, objects);

  updateLevel = (objects, levelId) => axios.put(`${ENDPOINTS.FUNCTIONALSTRUCTURE}/update/${levelId}`, objects);

  deleteLevel = levelId => axios.delete(`${ENDPOINTS.FUNCTIONALSTRUCTURE}/delete/${levelId}`);

  getLevelByType = type => axios.get(`${ENDPOINTS.FUNCTIONALSTRUCTURE}/all-by-type/${type}`);

  getLevelTree = levelId => axios.get(`${ENDPOINTS.FUNCTIONALSTRUCTURE}/level-tree/${levelId}`);

  setLevelStaffs = objects => axios.post(`${ENDPOINTS.FUNCTIONALSTRUCTURE}/level-assign`, objects);

  getLevelChild = levelId => axios.get(`${ENDPOINTS.FUNCTIONALSTRUCTURE}/level-child/${levelId}`);

}
export default new FunctionalStructureService();
