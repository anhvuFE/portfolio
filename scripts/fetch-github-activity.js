/* eslint-disable */
const fs = require("fs");
const path = require("path");
const https = require("https");

const USERNAME = process.env.GITHUB_USERNAME || "anhvuFE";
const OUT = path.join(__dirname, "..", "src", "components", "github", "recent-activity.json");
const MAX_EVENTS = 5;

function shorten(text, max = 60) {
  if (!text) return "";
  const oneLine = text.split("\n")[0];
  if (oneLine.length <= max) return oneLine;
  return oneLine.slice(0, max - 1).trimEnd() + "…";
}

function mapEvent(e) {
  const repo = e.repo?.name;
  if (!repo) return null;
  const repoUrl = `https://github.com/${repo}`;
  const date = e.created_at;

  switch (e.type) {
    case "PushEvent": {
      const commits = e.payload?.commits || [];
      const first = commits[0];
      if (!first) return null;
      const msg = shorten(first.message);
      const more = commits.length > 1 ? ` (+${commits.length - 1} more)` : "";
      return {
        type: "commit",
        repo,
        message: `${msg}${more} in ${repo}`,
        url: `${repoUrl}/commit/${first.sha}`,
        date
      };
    }
    case "PullRequestEvent": {
      if (!e.payload?.pull_request) return null;
      const title = shorten(e.payload.pull_request.title);
      const num = e.payload.pull_request.number;
      const desc = title ? `: ${title}` : num ? ` #${num}` : "";
      return {
        type: "pr",
        repo,
        message: `${e.payload.action} PR${desc} in ${repo}`,
        url: e.payload.pull_request.html_url || `${repoUrl}/pulls`,
        date
      };
    }
    case "IssuesEvent": {
      if (!e.payload?.issue) return null;
      const title = shorten(e.payload.issue.title);
      const num = e.payload.issue.number;
      const desc = title ? `: ${title}` : num ? ` #${num}` : "";
      return {
        type: "issue",
        repo,
        message: `${e.payload.action} issue${desc} in ${repo}`,
        url: e.payload.issue.html_url || `${repoUrl}/issues`,
        date
      };
    }
    case "WatchEvent":
      return { type: "star", repo, message: `starred ${repo}`, url: repoUrl, date };
    case "ForkEvent":
      return { type: "fork", repo, message: `forked ${repo}`, url: repoUrl, date };
    case "CreateEvent":
      if (e.payload?.ref_type === "repository" || e.payload?.ref_type === "branch") {
        const ref = e.payload.ref ? ` ${e.payload.ref}` : "";
        return {
          type: "create",
          repo,
          message: `created ${e.payload.ref_type}${ref}`,
          url: repoUrl,
          date
        };
      }
      return null;
    default:
      return null;
  }
}

function fetchEvents() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: `/users/${USERNAME}/events/public?per_page=30`,
      headers: {
        "User-Agent": "portfolio-prebuild",
        Accept: "application/vnd.github+json"
      }
    };
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) options.headers.Authorization = `Bearer ${token}`;

    const req = https.get(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(new Error(`Invalid JSON from GitHub: ${err.message}`));
          }
        } else {
          reject(new Error(`GitHub API ${res.statusCode}: ${body.slice(0, 200)}`));
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(10000, () => {
      req.destroy(new Error("GitHub API request timed out"));
    });
  });
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUT, "utf8"));
  } catch {
    return null;
  }
}

(async () => {
  let payload;
  try {
    const events = await fetchEvents();
    const mapped = events.map(mapEvent).filter((e) => e !== null).slice(0, MAX_EVENTS);
    payload = { fetchedAt: new Date().toISOString(), events: mapped };
    console.log(`[github] fetched ${mapped.length} events for ${USERNAME}`);
  } catch (err) {
    console.warn(`[github] fetch failed (${err.message}); keeping existing data`);
    const existing = readExisting();
    if (existing) {
      console.log(`[github] using cached data from ${existing.fetchedAt}`);
      return;
    }
    payload = { fetchedAt: new Date().toISOString(), events: [] };
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");
  console.log(`[github] wrote ${OUT}`);
})().catch((err) => {
  console.error(err);
  process.exit(0); // never block build
});
