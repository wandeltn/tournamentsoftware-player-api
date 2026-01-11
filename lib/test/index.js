"use strict";
/**
 * @file Test suite, using Mocha and Chai.
 * Compiled files inside the 'test' folder are excluded from
 * published npm projects.
 * (Note that fs-extra is added as a dev dependency to make
 * sandbox setup much easier. If you aren't using a sandbox
 * you can remove this dependency. If you need fs-extra for
 * your main code, move it into the regular 'dependencies'
 * section of your package.json file)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_extra_1 = __importDefault(require("fs-extra"));
const api_js_1 = __importDefault(require("../lib/api.js"));
const sandboxRoot = './sandbox';
const samplesRoot = './samples';
/**
 * Clone any files in a "./samples" folder into
 * a "./sandbox" folder, overwriting any files
 * currently in there. This is useful for allowing
 * your test suite to make changes to files without
 * changing the originals, so that you can easily
 * reset back to an original state prior to running a test.
 */
function resetSandbox() {
    if (!fs_extra_1.default.existsSync(samplesRoot)) {
        // Then no samples exist, and no sandbox needed
        return;
    }
    fs_extra_1.default.ensureDirSync(sandboxRoot);
    fs_extra_1.default.emptyDirSync(sandboxRoot);
    fs_extra_1.default.copySync(samplesRoot, sandboxRoot);
}
describe('Test Suite', function () {
    before(function () {
        resetSandbox();
    });
    describe('Test Group', function () {
        it('can do something', async function () {
            resetSandbox();
            const playerDetails = await (0, api_js_1.default)('05x 1234567');
            (0, chai_1.expect)(playerDetails.club).to.equal('Demo Club');
            (0, chai_1.expect)(playerDetails.name).to.equal('Test Player1');
            (0, chai_1.expect)(playerDetails.id).to.equal('05x 1234567');
        });
    });
    after(function () {
        resetSandbox();
    });
});
//# sourceMappingURL=index.js.map