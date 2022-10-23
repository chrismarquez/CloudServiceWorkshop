import Application from "./Application";

(async () => {
	const application = await Application.newInstance();
	const port = process.env.PORT || 3000;
	application.app.listen(port, () => console.log(`Listening on Port: ${port}`));
})();
