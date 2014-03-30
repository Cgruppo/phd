/**
 * Tests the udc module.
 *
 * Curran Kelleher 3/30/2014
 */
describe('udc', function() {
  var udc;

  // Use require.js to fetch the module.
  it('should load the AMD module', function (done) {
    require(['udc'], function (UDC) {
      udc = UDC();
      done();
    });
  });

  it('should load a data set', function (done) {
    var url = 'data/un_population/un_population';
    udc.load(url, function () {
      done();
    });
  });

  it('should list sources', function () {
    var sources = udc.listSources();
    expect(sources.length).toBe(1);
    expect(sources[0]).toBe('United Nations');
  });

  it('should list data sets', function () {
    var source = 'United Nations',
        dataSets = udc.listDataSets(source);
    expect(dataSets.length).toBe(1);
    expect(dataSets[0]).toBe('Population Estimates');
  });

  it('should list dimensions for a data set', function () {
    var source = 'United Nations',
        dataSet = 'Population Estimates',
        dimensions = udc.listDimensions(source, dataSet);
    expect(dimensions.length).toBe(2);
    expect(dimensions).toContain('Time');
    expect(dimensions).toContain('Space');
  });

  it('should list measures for a data set', function () {
    var source = 'United Nations',
        dataSet = 'Population Estimates',
        measures = udc.listMeasures(source, dataSet);
    expect(measures.length).toBe(1);
    expect(measures).toContain('Population');
  });

  it('should list members', function () {
    var source = 'United Nations',
        dataSet = 'Population Estimates',
        dimension = 'Time',
        members = udc.getDomain(source, dataSet, dimension),
        expectedMembers = _.range(1950, 2011).map(String);
    expect(members.length).toBe(expectedMembers.length);
    expectedMembers.forEach(function (year) {
      expect(members).toContain(year);
    });
  });
});