
# Nextjs Boilerplate

Welcome to the Next.js Open Source Boilerplate by [Buildfast](https://buildfast.co.in/)! This boilerplate is designed to kickstart your Next.js projects with a well-organized and extensible foundation.


## Features

- Email Login and Signup
- Stripe Subscription Payments
- JWT authentication


## Tech Stack

**Frontend**: Shadcdn, Tailwind css

**Framework**: Nextjs, Prisma

**Database**: Mysql

**Payment Gateway**: Stripe


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

### Project structure

```shell
.
├── README.md                       # README file
├── .vscode                         # VSCode configuration
├── contribution.md                 # Steps to follow to contribute to project
├── apiCalls                        # API Calls from Frontend to Backend
├── migrations                      # Database migrations
├── app                             # Next JS App (App Router)
│   └── api                         # api fuctions and routes
├── components                      # React components
├── controllers                     # Handles Database Queries
├── data                            # Class Objects of data
├── enums                           # Pre Defined ENUM Values
├── helpers                         # Helper Classes - Repetative Functions
├── libs                            # 3rd party libraries configuration
├── prisma                          # Prisma Configration
├── public                          # Public assets folder
├── redux                           # Redux Store
├── utils                           # Utility Function Class
├── middleware.ts                   # Middleware Functionality code
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```


## Getting Started

### 1. Clone the repo.

```shell
git clone https://github.com/buildFast10x/Nextjs-Boilerplate.git
```

### 2. Fill the .env variables

Here is the .env file  [example](https://github.com/buildFast10x/Nextjs-Boilerplate/blob/main/.env.example).


### 3. Setup the Database

```shell
npx prisma generate
```
```shell
npx prisma db push
```

### 4. Run Project

```shell
npm install
```
```shell
npm run dev
```
