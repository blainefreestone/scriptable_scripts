// gitPull.js — Self-updating Scriptable GitHub puller
// Fetches .js files from GitHub and updates them in Scriptable
// Relaunches itself if it was updated

const OWNER = "blainefreestone";
const REPO = "scriptable_scripts";
const BRANCH = "main";

// List of script files in camelCase (no ".js")
const scriptNames = [
  "testScript",
  "gitPull"
];

const CURRENT_SCRIPT = "gitPull"; // must match filename without .js
const CURRENT_SCRIPT_NAME = "Git Pull.js"; // Title-cased version

// Convert camelCase to "Title Case"
function camelToTitleCase(str) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

async function updateScript(scriptId) {
  const filePath = `${scriptId}.js`;
  const scriptDisplayName = `${camelToTitleCase(scriptId)}.js`;
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`;

  try {
    const req = new Request(apiUrl);
    req.headers = {
      "Accept": "application/vnd.github.v3+json"
    };

    const json = await req.loadJSON();
    const base64 = json.content.replace(/\n/g, "");
    const data = Data.fromBase64String(base64);
    const code = data.toRawString();

    const fm = FileManager.iCloud(); // or .local() if not using iCloud
    const path = fm.joinPath(fm.documentsDirectory(), scriptDisplayName);
    fm.writeString(path, code);

    console.log(`✅ Updated: ${scriptDisplayName}`);
    return { scriptId, updated: true, message: `✅ ${scriptDisplayName}` };
  } catch (err) {
    console.error(`❌ Failed to update ${scriptId}:`, err);
    return { scriptId, updated: false, message: `❌ ${scriptId}.js — ${err.message}` };
  }
}

async function updateAll() {
  const results = [];
  let selfUpdated = false;

  for (let scriptId of scriptNames) {
    const result = await updateScript(scriptId);
    results.push(result.message);

    if (scriptId === CURRENT_SCRIPT && result.updated) {
      selfUpdated = true;
    }
  }

  const alert = new Alert();
  alert.title = "Update Complete";
  alert.message = results.join("\n");
  alert.addAction("OK");
  await alert.present();

  // Relaunch if we updated ourself
  if (selfUpdated) {
    console.log("🔁 Relaunching gitPull.js...");
    Script.complete();
    Safari.open(`scriptable:///run?scriptName=${encodeURIComponent(CURRENT_SCRIPT_NAME)}`);
  }
}

await updateAll();
