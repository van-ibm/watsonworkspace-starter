# IBM Watson Workspace Starter Bot
This is a sample Workspace bot that uses the [IBM Watson Workspace Bot Framework]() and [IBM Watson Workspace SDK](https://github.com/van-ibm/watsonworkspace-sdk).

## Quick Start

[![Watch the video](https://img.youtube.com/vi/VGCfEi3gFhM/0.jpg)](https://youtu.be/VGCfEi3gFhM)

1. Open a command line (terminal) and change directory to the `workspace-starter` directory.
2. Install dependencies by running `npm install`.
3. Create a `.env` file per the dotenv instructions in Local Development documentation.
4. Run `npm run-script dev` from a command line.
5. Copy the URL seen in the `Use 'https://cdf9d82f.ngrok.io' as your webhook URL in Watson Workspace` message for later use.
6. Click the `Create new app` button on the [Developer Apps](https://workspace.ibm.com/developer/apps) page.
7. Enter the `App Name` and the `Description of App`.
8. Click `Create`.
9. The next dialog will give you the App ID and App secret. You need to save these values to the respective environment variables in the `.env` file called `APP_ID` and `APP_SECRET`.
10. Click on the `Listen to Events` link.
11. Click on the `Add an outbout webhook button`.
12. Give the webhook a name (any name will do) and select any of the events. The `message-created` and `message-annotation-added` events are particularly useful.
13. In the Webhook URL text box, specify the URL for your app you copied previously.
14. Copy the `Webhook secret` from the resulting dialog to the `WEBHOOK_SECRET` property in the `.env` file.
15. Back in you browser, select the `Enable` button to complete the process.
16. Follow the instructions in [Share App](https://workspace.ibm.com/developer/apps/dashboard/share) to add the app to a space.
17. Go write some code!
