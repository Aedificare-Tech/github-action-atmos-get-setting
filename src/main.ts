import * as core from "@actions/core";
import { processMultipleSettings, processSingleSetting } from "@useCase";

(async () => {
  try {
    const processTemplates = core.getBooleanInput("process-templates");
    const processFunctions = core.getBooleanInput("process-functions");
    const singleResult = await processSingleSetting(processTemplates, processFunctions);
    const multipleResult = await processMultipleSettings(processTemplates, processFunctions);

    if (singleResult || multipleResult) {
      core.info("Result returned successfully:");
      core.info(`singleResult: ${JSON.stringify(singleResult)}`);
      core.info(`multipleResult: ${JSON.stringify(multipleResult)}`);
    } else {
      core.error("Invalid input. Results:");
      core.error(`singleResult: ${JSON.stringify(singleResult)}`);
      core.error(`multipleResult: ${JSON.stringify(multipleResult)}`);
    }
  } catch (error) {
    const err = error as Error;
    core.setFailed(err.message);
    core.error(err.stack || "");
  }
})();
