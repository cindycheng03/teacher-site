const fs = require("fs");

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = "32faee30fdb18061a9bed2f3becd07d9";

async function fetchNotion() {
  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  const results = data.results.map((page) => {
    return {
      title: page.properties.Name?.title?.[0]?.plain_text || "",
      date: page.properties.Date?.date?.start || "",
      summary: page.properties["簡介"]?.rich_text?.[0]?.plain_text || "",
    };
  });

  fs.writeFileSync("data.json", JSON.stringify(results, null, 2), "utf8");
}

fetchNotion();
