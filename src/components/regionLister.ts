import {RegionState, Region, RegionMap} from '../reducers/region';
import {RegionVisualProperties, RegionVisualPropertiesMap} from '../reducers/regionVisualProperties'
import {matchingRegionsSelector} from '../selectors/matchingRegions';
import {visibleRegionsSelector} from '../selectors/visibleRegions';
import {IRegionActionCreator} from '../actions/regionActionCreators';

export default function regionLoader() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: RegionListerController,
    template: require('./regionLister.html'),
    scope: {}
  };
}

class RegionListerController {

  regionMap: RegionMap;
  regionUIMap: RegionVisualPropertiesMap;
  visibleRegionIds: string[] = [];

  constructor($ngRedux, private regionActions: IRegionActionCreator) {
      $ngRedux.connect(state => ({
          regionMap: state.regions.regionMap,
          regionUIMap: state.regionsVisualProperties.map,
          matchingRegionIds: matchingRegionsSelector(state),
          visibleRegionIds: visibleRegionsSelector(state)
      }))(this);
  }

  getRegion = id => this.regionMap[id];
  isExpandable = id => this.regionUIMap[id].isExpandable;
  isExpanded = id => this.regionUIMap[id].isExpanded;
  getLeftMargin = id => this.regionUIMap[id].depth * 20;
  isVisible = id => !this.anyCollapsedParent(id);
  toggle = id => this.regionActions.toggleRegion(id);
  select = id => this.regionActions.selectRegion(id);


  anyCollapsedParent(regionId): boolean {
    let region = this.regionMap[regionId];
    if (!region.parentId) {
      return false;
    }
    return this.regionUIMap[region.parentId].isExpanded
      ? this.anyCollapsedParent(region.parentId)
      : true;
  }
}
