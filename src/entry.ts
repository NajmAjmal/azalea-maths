import cutest from "./api";
import utilities from "./api/core/utilities";
import handlers from "./api/core/handlers";

const { cuteName, lazyModule } = utilities;
const { Theming, preferences } = handlers;
window.cutest = cutest;

(async function() {
    const labelNode = await lazyModule(
        () => document.querySelector(".status-bar-label-text"),
        r => r !== null
    ) as Element;

    const Redux = await lazyModule(
        () => cutest.modules.common["Redux"],
        r => r !== null
    );
    
    // Initialization by applying preferences
    const user = Redux.getState().get("user");

    preferences.set("firstName", user.get("firstName"))
    preferences.set("lastName", user.get("lastName"))
    preferences.get("name") && Redux.dispatch({ 
        type: "SET_USER", 
        user: user
            .set("firstName", cuteName.firstName)
            .set("lastName", cuteName.lastName)
    })
    
    Theming.setTheme(labelNode);
})()