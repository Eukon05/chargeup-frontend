# ChargeUP Frontend
Frontend for my [ChargeUP backend](https://github.com/Eukon05/chargeup) app.

## Live demo
You can check out the working demo of the project at:  
https://chargeup-frontend.onrender.com/

## Functionality
ChargeUP is an EV charging optimization app.  
Based on data about the energy mix in Great Britain, it can calculate an optimal window of time in the next two days, when the energy mix there has the highest share of clean energy sources available.  
The user can specify how long their charging window is, and the app will calculate an optimal window of that length.  

Additionally, the app displays pie charts of the current energy mix in GB, and predictions for the next two days.  

![Initial view](.github/assets/frontend-start.png)
![View after window calculation](.github/assets/frontend-calc.png)

## Tech stack
The following technologies have been used in this project:
- HTML + CSS + TypeScript
- React
- [Chart JS](https://www.chartjs.org/docs/latest/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- npm
- Vite

The data for GB's energy mix is being sourced from:  
https://carbon-intensity.github.io/api-definitions/?shell#get-generation-from-to

## Development setup
To spin up a development server of the app, follow these instructions:
- Make sure you have NodeJS with NPM installed. Vitit https://nodejs.org/en/download for install instructions.
- Open a terminal window inside a directory you wish to clone the repository to.
- Clone the repository to your machine, using `git clone https://github.com/Eukon05/chargeup-frontend.git .`
- Create a `.env` file in the project root directory, with the line: `VITE_CHARGEUP_API_URL=yourchargeupbackendurlhere`
- Run `npm install`, followed by `npm run dev`
- A dev server will be started by Vite, and available on `http://localhost:5173` by default

## Production setup
For a production setup, follow the same steps as for setting up a dev server, followed by:
- In the project root directory, run `npm run build`
- The build command will create a `dist` directory in the project root
- Point the HTTP server of your choice, NGINX for example, to the `dist` folder. The website will be available on the address of your server.