# Zoho Desk SDK (Beta)
Nodejs SDK for interfacing with the zoho desk API

# Disclaimer
This package is not developed or maintained by Zoho Corporation Pvt. Ltd. This is not an official SDK and full functionality is not guaranteed. Provided as-is

# Authentication
Zoho uses an Oauth authentication strategy that requires a few steps to complete. General guidance for working with authentication can be found [here](https://desk.zoho.com/DeskAPIDocument#Authentication#OauthTokens). The available documentation focuses on web-based authentication, but since this SDK is meant to be used "headless" some of the instructions are unclear.

Instead of generating a new authorization grant every time a new authorization code is required, this SDK relies on the usage of a pre-defined refresh token to generate authorization tokens. The following steps can be followed to generate your refresh token

1. Navigate to the [Zoho developer console](https://accounts.zoho.com/developerconsole) and create a new Client ID. For the purposes of this system, the Client Name and Client Domain can be any arbitrary value. The Authorized Redirect URIs can also be an arbitrary value - a dummy address will do fine. Finally, a WEB Based client type should be sufficient
2. Once the Client ID is created, go to the settings for that ID (the three vertical dots) and go to the "Self Client" page. Enter the minimum needed scopes and view your grant code, generate it, and save the value. Note that this code will only last for as long as you defined in the creation process. A list of valid scopes can be found [at the bottom of the Oauth Tokens documentation](https://desk.zoho.com/DeskAPIDocument#Authentication#OauthTokens)
3. Use your generated grant code with other required parameters in the provided [refresh-token-gen](./lib/helpers/refresh-token-gen.js) helper method to get your permanent refresh token (this helper method can also be accessed directly from the main Zoho SDK class itself)
