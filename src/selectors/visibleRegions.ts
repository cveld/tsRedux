import * as reselect from 'reselect';
import {matchingRegionsSelector} from './matchingRegions';

export const visibleRegionsSelector = reselect.createSelector(
    [matchingRegionsSelector, state => state.regions.regionMap, state => state.regions.filter],
    (matchingRegionIds, regionMap, filter) => {
        let visibleRegionIds = [];
        _.forEach(matchingRegionIds, id => addHierarchy(id, regionMap, visibleRegionIds));
        return visibleRegionIds;
    });


function addHierarchy(regionId, regionMap, idList) {    
        //add parent first
        let region = regionMap[regionId];
        if (region.parentId) {
            addHierarchy(region.parentId, regionMap, idList);
        }

        if (!_.any(idList, id => id === regionId)) {
            idList.push(regionId);
        }
    }
