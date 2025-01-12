const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { userMgmtController } = require("./controllers/user-mgmt.controller");
const {
  handleConnectionMiddleware,
} = require("./middlewares/handle-connection.middleware");
const {
  errorHandlerMiddleware,
} = require("./middlewares/error-handler.middleware");
const { loggerMiddleware, logger } = require("./middlewares/logger.middleware");

const app = new Koa();

app.use(loggerMiddleware());
app.use(handleConnectionMiddleware());
app.use(errorHandlerMiddleware());
app.use(bodyParser());

registerRoutes(app);

app.listen(3000, () => logger.info("server started"));

function registerRoutes(app) {
  app.use(userMgmtController.routes()).use(userMgmtController.allowedMethods());
  logger.info({
    message: "registered routes",
    routes: userMgmtController.stack.map((i) => i.path),
  });
}
