import * as uploadMappingRoute from 'routes/UploadMapping';

describe('(Route) UploadMapping', () => {
    let _route;

    beforeEach(() => {
        _route = uploadMappingRoute;
    });

    it('Should return a route configuration object', () => {
        expect(typeof _route).to.equal('object');
    });

    it('Configuration should contain path `employee/import/mapping/upload`', () => {
        expect(_route.uploadFile({}).path).to.equal('employee/import/mapping/upload');
    });

    it('Configuration should contain path `employee/import/mapping/select/:id`', ()=> {
        expect(_route.selectMappings({}).path).to.equal('employee/import/mapping/select/:id');
    });

    it('Configuration should contain path `employee/import/mapping/validate/:id`', ()=> {
        expect(_route.validateMappings({}).path).to.equal('employee/import/mapping/validate/:id');
    });

    it('Configuration should contain path `employee/import/mapping/processing/:id`', ()=> {
        expect(_route.processingResults({}).path).to.equal('employee/import/mapping/processing/:id');
    });
    it('Configuration should contain path `employee/import/mapping/statistic/:id`', ()=> {
        expect(_route.uploadSummary({}).path).to.equal('employee/import/mapping/statistic/:id');
    });
});
