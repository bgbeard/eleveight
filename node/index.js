const router = require("express").Router();
const errorHandler = require("../handlers/errorHandlers");
const newsfeedPostRoute = require("../newsfeedPost/newsfeedPostRoute");
const newsfeedCommentRoute = require("../newsfeedComment/newsfeedCommentRoute");
const newsfeedPostLikeRoute = require("../newsfeedPostLike/newsfeedPostLikeRoute");
const demoController = require("../demo/demoController");
const myTableRoutes = require("../myTable/myTableRoutes");
const loginRoutes = require("../login/loginRoutes");
const registerRoutes = require("../register/registerRoutes");
const forgotPasswordRoutes = require("../forgotPassword/forgotPasswordRoutes");
const chatRoutes = require("../chat/chatRoutes");
const scholarshipRoute = require("../scholarship/scholarshipRoute");
const scholarshipDataFieldRoute = require("../scholarshipDataField/scholarshipDataFieldRoute");
const scholarshipOutcomesRoute = require("../scholarshipOutcomes/scholarshipOutcomesRoute");
const scholarshipChartRoute = require("../scholarshipChart/scholarshipChartRoute");
const keywordTagRoute = require("../keywordTag/keywordTagRoute");
const userContactEmailRoute = require("../userContactEmail/userContactEmailRoute");
const userconnectionRoutes = require("../userconnections/userconnectionRoutes");
const userAddrRoutes = require("../userinfo/userAddrRoutes");
const userBaseRoutes = require("../userinfo/userBaseRoutes");
const userEduRoutes = require("../userinfo/userEduRoutes");
const userProfileRoutes = require("../userinfo/userProfileRoutes");
const userWorkExpRoutes = require("../userinfo/userWorkExpRoutes");
const userEmailRoutes = require("../userinfo/userEmailRoutes");
const userPhoneRoutes = require("../userinfo/userPhoneRoutes");
const keywordTagSubscription = require("../keywordTagSubscription/keywordTagSubscriptionRoute");

// setup routing prefixes with controllers
router.use("/api/demo", demoController);
router.use("/api/mytables", myTableRoutes);
router.use("/api/login", loginRoutes);
router.use("/api/register", registerRoutes);
router.use("/api/forgotPassword", forgotPasswordRoutes);
router.use("/api/chat", chatRoutes);
router.use("/api/user/newsfeed/posts", newsfeedPostRoute);
router.use("/api/user/newsfeed/comments", newsfeedCommentRoute);
router.use("/api/user/newsfeed/posts/likes", newsfeedPostLikeRoute);
router.use("/api/organization/scholarships", scholarshipRoute);
router.use("/api/organization/scholarshipDataFields", scholarshipDataFieldRoute);
router.use("/api/scholarshipOutcomes", scholarshipOutcomesRoute);
router.use("/api/organization/scholarshipCharts", scholarshipChartRoute);
router.use("/api/organization/keywordTags", keywordTagRoute);
router.use("/api/User/UserContactEmails", userContactEmailRoute);
router.use("/api/userinfo/address/", userAddrRoutes);
router.use("/api/userinfo/base/", userBaseRoutes);
router.use("/api/userinfo/email/", userEmailRoutes)
router.use("/api/userinfo/education/", userEduRoutes);
router.use("/api/userinfo/profile/", userProfileRoutes);
router.use("/api/userinfo/workexperience/", userWorkExpRoutes);
router.use("/api/userinfo/phone/", userPhoneRoutes);
router.use("/api/user/connections/connected/", userconnectionRoutes);
router.use("/api/user/newsfeed/posts", newsfeedPostRoute);
router.use("/api/user/newsfeed/posts/likes", newsfeedPostLikeRoute);
router.use("/api/user/keywordTagSubscriptions", keywordTagSubscription);

// register handler for 404 errors
router.use(errorHandler.notFound);

// register handler for error messages
router.use(errorHandler.developmentErrors);

module.exports = router;