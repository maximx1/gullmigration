var MigrationMath = require("../../src/utils/migrationMath.js");

describe("determineMigrationVersions", function() {
  it("should return no versions if input versions match", function() {
    expect(MigrationMath.determineMigrationVersions(0, 0)).to.be.an('array').that.is.empty;
    expect(MigrationMath.determineMigrationVersions(1, 1)).to.be.an('array').that.is.empty;
    expect(MigrationMath.determineMigrationVersions(2, 2)).to.be.an('array').that.is.empty;
    expect(MigrationMath.determineMigrationVersions(3, 3)).to.be.an('array').that.is.empty;
    expect(MigrationMath.determineMigrationVersions(4, 4)).to.be.an('array').that.is.empty;
  });

  it("should return all versions if non-existant(-1) 'existing' version is passed in", function() {
    expect(MigrationMath.determineMigrationVersions(-1, 0)).to.deep.equal([0]);
    expect(MigrationMath.determineMigrationVersions(-1, 1)).to.deep.equal([0, 1]);
    expect(MigrationMath.determineMigrationVersions(-1, 2)).to.deep.equal([0, 1, 2]);
    expect(MigrationMath.determineMigrationVersions(-1, 3)).to.deep.equal([0, 1, 2, 3]);
  });

  it("should return all versions after existing to and including expected version", function() {
    expect(MigrationMath.determineMigrationVersions(4, 10)).to.deep.equal([5, 6, 7, 8, 9, 10]);
    expect(MigrationMath.determineMigrationVersions(0, 1)).to.deep.equal([1]);
    expect(MigrationMath.determineMigrationVersions(0, 2)).to.deep.equal([1, 2]);
    expect(MigrationMath.determineMigrationVersions(33, 37)).to.deep.equal([34, 35, 36, 37]);
  });

  //TODO: test down evolutions
});
