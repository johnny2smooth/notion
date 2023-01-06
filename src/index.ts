import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

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

  firstPageBlock.results.forEach((block) => {
    console.log(block.type);
    if (block.type === "paragraph") {
      console.log(block.paragraph.rich_text[0].plain_text);
    } else if (block.type === "heading_1") {
      console.log(block.heading_1.rich_text[0].plain_text);
    } else console.log(block.type);
  });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
