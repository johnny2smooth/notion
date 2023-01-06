import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

// function isTodo<T extends Record<string, unknown>>(
//   obj: T
// ): obj is T & { type: "paragraph" } {
//   return "type" in obj && obj.type === "paragraph";
// }

async function main() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const response = await notion.databases.query({
    database_id: "72936b038c7e440d9cb5c817afe86b40",
  });

  const firstPageID = response.results.map((page) => page.id)[0];

  const firstPageBlock = await notion.blocks.children.list({
    block_id: firstPageID,
  });

  console.log(firstPageBlock.results);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
