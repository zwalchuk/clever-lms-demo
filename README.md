This is a [Next.js](https://nextjs.org/) project.

## Getting Started

First, get a [Clever Data API token](https://dev.clever.com/reference/gettokens). Create a .env file and add a variable called DAC_TOKEN. Please note that this project is using the [Google Classroom Sandbox](https://hall-monitor.int.clever.com/districts/657b33ea13c57b042a145fba) and the dev app [65b1bd709d5ec60001593ed0](https://hall-monitor.int.clever.com/applications/65b1bd709d5ec60001593ed0).

This project uses a small SQL database to keep track of assignments and their associated sections. I recommend creating an account with [Vercel](https://vercel.com/) and connecting your GitHub account to then deploy to Vercel and use a SQL database. Instructions can be found [here](https://nextjs.org/learn/dashboard-app/setting-up-your-database).

Once the project is deployed, you've initialized a SQL database in Vercel, and copied the database secret to your .env file, run the following command:

```bash
npm run seed
```

This will seed the database with some initial assignment and section data. 

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## For more information

See [Clever's developer documentation](https://dev.clever.com/) for more guidance and examples on how to interact with the Clever API. 
