import * as schedule from "node-schedule";
import * as tasks from "#schedule/tasks.js";

const jobs = {
    updateTariffsBox: schedule.scheduleJob("* */1 * * *", tasks.updateTariffsBox),
}
