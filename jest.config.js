module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	globalSetup: "./dist/__test__/global-setup.js",
	globalTeardown: "./dist/__test__/global-teardown.js",
};
