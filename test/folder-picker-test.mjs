import assert from "node:assert/strict";
import {
	buildPickerScript,
	pickDirectory,
	quotePowerShell,
} from "../lib/rpc/folder-picker.js";

assert.equal(quotePowerShell("D:\\Dev's Cache"), "'D:\\Dev''s Cache'");

const script = buildPickerScript("D:\\Dev's Cache");
assert.match(script, /\$owner\.TopMost = \$true/);
assert.match(script, /\$dialog\.ShowDialog\(\$owner\)/);
assert.match(script, /\$dialog\.SelectedPath = 'D:\\Dev''s Cache'/);
assert.match(script, /\$dialog\.Dispose\(\)/);
assert.match(script, /\$owner\.Dispose\(\)/);

function fakeContext(stdout, exitCode = 0, stderr = "") {
	return {
		subprocess: {
			spawn(spec) {
				assert.equal(spec.argv[0], "powershell.exe");
				assert(spec.argv.includes("-STA"));
				assert(spec.signal instanceof AbortSignal);
				return {
					done: Promise.resolve({ exitCode }),
					collected: {
						stdout: { readFrom: () => ({ text: stdout }) },
						stderr: { readFrom: () => ({ text: stderr }) },
					},
				};
			},
		},
	};
}

assert.deepEqual(await pickDirectory(fakeContext("D:\\DevCache\r\n"), ""), {
	cancelled: false,
	path: "D:\\DevCache",
});
assert.deepEqual(await pickDirectory(fakeContext(""), ""), { cancelled: true });
await assert.rejects(
	pickDirectory(fakeContext("", 1, "picker failed"), ""),
	/picker failed/
);

console.log("folder picker tests passed");
