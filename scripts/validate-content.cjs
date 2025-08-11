/* Validate src/content JSON using Ajv (draft-07) */
const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ strict: false, allErrors: true }); // no addSchema needed
addFormats(ajv);

// ---- Schemas ----
const creatorsSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "array",
  items: {
    type: "object",
    required: ["slug", "name", "avatar"],
    additionalProperties: false,
    properties: {
      slug: { type: "string" },
      name: { type: "string" },
      avatar: { type: "string" }, // e.g., "Krov.jpg"
      links: {
        type: "array",
        items: {
          type: "object",
          required: ["label", "url"],
          additionalProperties: false,
          properties: {
            label: { type: "string" },
            url: { type: "string", format: "uri" },
          },
        },
      },
      status: { type: "string" },
      tags: { type: "array", items: { type: "string" } },
      cardBg: { type: "string" },
      avatarBg: { type: "string" },
      blurb: { type: "string" },
    },
  },
};

const announcementsSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "array",
  items: {
    type: "object",
    required: ["date", "title", "body"],
    additionalProperties: false,
    properties: {
      date: { type: "string", format: "date" },
      title: { type: "string" },
      body: { type: "string" },
    },
  },
};

// ---- Validators (compiled directly) ----
const validateCreators = ajv.compile(creatorsSchema);
const validateAnnouncements = ajv.compile(announcementsSchema);

// ---- Helpers ----
function readJSON(rel) {
  const p = path.resolve(__dirname, "..", "src", "content", rel);
  return { path: p, data: JSON.parse(fs.readFileSync(p, "utf8")) };
}

function runValidation({ path: filePath, data }, validator, label) {
  const ok = validator(data);
  if (!ok) {
    console.error(
      `❌ ${label} (${path.basename(filePath)}) failed validation:`
    );
    console.error(ajv.errorsText(validator.errors, { separator: "\n" }));
    process.exitCode = 1;
  } else {
    console.log(`✔ ${label} (${path.basename(filePath)}) is valid`);
  }
}

// ---- Execute ----
try {
  runValidation(readJSON("creators.json"), validateCreators, "Creators");
  runValidation(
    readJSON("announcements.json"),
    validateAnnouncements,
    "Announcements"
  );
} catch (e) {
  console.error(e);
  process.exitCode = 1;
}
