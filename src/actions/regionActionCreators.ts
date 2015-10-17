import * as types from '../constants/actionTypes'
import {createAction, createAsyncAction} from '../redux/action';
import * as redux from 'redux';

export interface IRegionActionCreator {
  loadRegionsAsync();
  selectRegion(regionId: string);
  filterRegions(searchTerm: string);
  toggleRegion(id: string);
}

export default function regionActionsService($ngRedux, $q: ng.IQService): IRegionActionCreator {
  let actionCreator = <IRegionActionCreator>{
    loadRegionsAsync: () => createAsyncAction(types.LOAD_REGIONS, fakeHttpCall($q)),
    selectRegion: regionId => createAction(types.SELECT_REGION, regionId),
    filterRegions: searchTerm => createAction(types.FILTER_REGIONS, searchTerm),
    toggleRegion: regionId => createAction(types.TOGGLE_REGION, regionId)
  };
  return redux.bindActionCreators(actionCreator, $ngRedux.dispatch);
}

function fakeHttpCall( $q: ng.IQService): ng.IPromise<any> {
  let deferred = $q.defer();
  setTimeout(() => {  
    deferred.resolve(require('../fakeData/regions.json'));
  }, 100);
  return deferred.promise;
}
