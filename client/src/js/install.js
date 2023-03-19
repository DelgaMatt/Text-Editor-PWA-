const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log(`'beforeinstallprompt' event was triggered.`);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    // event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    //removing the hidden class from button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('button Install event triggered');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Reset the deferred prompt variable, since prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App successfully installed!');
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});
