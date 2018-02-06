(function (root, factory) {
    define([
        "converse-core",
        "converse-chatview"
    ], factory);
}(this, function (converse) {

    // The following line registers your plugin.
    converse.plugins.add("converse-spoilers", {
        /* Optional dependencies are other plugins which might be
         * overridden or relied upon, and therefore need to be loaded before
         * this plugin. They are called "optional" because they might not be
         * available, in which case any overrides applicable to them will be
         * ignored.
         *
         * It's possible however to make optional dependencies non-optional.
         * If the setting "strict_plugin_dependencies" is set to true,
         * an error will be raised if the plugin is not found.
         *
         * NB: These plugins need to have already been loaded via require.js.
         */
        dependencies: ["converse-chatview"],

        overrides: {
            // Overrides mentioned here will be picked up by converse.js's
            // plugin architecture they will replace existing methods on the
            // relevant objects or classes.
            //
            // New functions which don't exist yet can also be added.

            'ChatBoxView': {

                toggleSpoilerMessage (event) {
                    const { _converse } = this.__super__,
                          { __ } = _converse;

                    const button = event.target;
                    const textarea = button.nextElementSibling;
                    const hint = textarea.children[0];
                    const contentHidden = textarea.children[1];
                    const container = button.parentElement;

                    if (button.getAttribute("closed") == "true") {
                        //Show spoiler's content
                        button.classList.remove("icon-eye");
                        button.classList.add("toggle-spoiler-display");
                        button.classList.add("icon-eye-blocked");
                        button.setAttribute("closed", "false");
                        button.textContent = __('Hide ');
                        container.style.backgroundColor="#D5FFD2";

                        hint.classList.add("hidden");
                        contentHidden.classList.remove("hidden");
                    } else { //Hide spoiler's content
                        button.classList.remove("icon-eye-blocked");
                        button.classList.add("icon-eye");
                        button.setAttribute("closed", "true");
                        button.textContent = __('Show ');
                        container.style.backgroundColor="Lavender";
                        hint.classList.remove("hidden");
                        contentHidden.classList.add("hidden");
                    }
                },

                'renderMessage': function (attrs) {
                    /* Renders a chat message based on the passed in attributes.
                     *
                     * Parameters:
                     *  (Object) attrs: An object containing the message attributes.
                     *
                     *  Returns:
                     *      The DOM element representing the message.
                     */
                    const { _converse } = this.__super__,
                          { __ } = _converse,
                          msg = this.__super__.renderMessage.apply(this, arguments);

                    return msg;
                }
            }
        }
    });
}));
