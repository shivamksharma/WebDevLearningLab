const buttonWrapper = document.querySelector(".button_wrapper");

buttonWrapper.addEventListener("click", () => {
	if (!buttonWrapper.classList.contains("loading")) {
		buttonWrapper.classList.add("loading");
		setTimeout(() => {
			buttonWrapper.classList.add("done");
			setTimeout(() => buttonWrapper.classList.remove("loading", "done"), 1500);
		}, 2400);
	}
});
