import { migrate, seed } from "#postgres/knex.js";
import { newLogger } from "#utils/logging.js";

const logger = newLogger({
    from: "app.ts"
})

await migrate.latest();
await seed.run();

logger.info("All migrations and seeds have been run");
