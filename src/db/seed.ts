import { config } from "dotenv";
config({ path: ".env.local" });
import { users } from "./schema";

async function main() {
  const { db } = await import("./index");
  const user: typeof users.$inferInsert = {
    name: "Peter Baranec",
    email: "baranec.dev@gmail.com",
    image: "https://github.com/shadcn.png",
  };
  await db.insert(users).values(user);
  console.log("Seed done!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
