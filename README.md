# vikings-ec-bn 

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/vikings-ec-bn/tree/dev.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/vikings-ec-bn/tree/dev) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/vikings-ec-bn/badge.svg)](https://coveralls.io/github/atlp-rwanda/vikings-ec-bn)

## [E-commerce API](https://vikings-ec-bn-mbhd.onrender.com/api-docs/#/)
This is a backend API built using Express.js framework for an e-commerce website. The API provides several features including:
- Product Catalog
- Shopping Cart
- Payment Gateway
- Order Management
- User Profile
- Search and Filtering
- Reviews and Ratings
- Wish List
## INSTALLATION

### Requirements

> For development, you need to have node installed and npm package installed in your environment.

#### Node

##### Node installation on windows

> Just go to the [Nodejs website](https://nodejs.org) and download the installer.
> in addition, make sure you have `git` available in your path. `npm` migth need it. Find it [here](https://git-scm.com)

##### Node installation on Linux and other operating system

> Refer to the [documentation](https://nodejs.org) and offical npm website [npm website](https://npmjs.com)

#### NPM installation

```ps
npm install npm
```

### Project Installaton

> clone the project, by running the commands below in your terminal.

```ps
git clone https://github.com/atlp-rwanda/vikings-ec-bn.git
```

```ps
cd vikings-ec-bn
```

> package installation

```ps
npm install
```

### Running the app

> Before running the project locally, make sure you have all required environment variables in your .env file.
> you can find the required environment variables in `.env.example` file.

#### Database migration and seeding

> Run migrations

```ps
npm run migrate
```

> Run seed

```ps
npm run seed
```

> development mode

```ps
npm run dev
```

> testing mode

```ps
npm run test
```


> Reset database 

```ps
npm  reset:db
```


#### Documentation

##### Swagger documentation endpoint for your the backend project

> Replace {port} with your port on which development server is running ex:http://localhost:5000/api-docs

```ps
http://localhost:{port}/api-docs
```

#### Docker-compose

##### Docker installation

> download docker Destop [here](https://docs.docker.com/desktop/windows/install/)
> or use docker toolbox CLI [here](https://github.com/docker-archive/toolbox/releases/download/v19.03.1/DockerToolbox-19.03.1.exe)

###### run docker-compose

```ps
docker-compose up -d
```
## Deployment
- [Vikings E-commerce API](https://vikings-ec-bn-mbhd.onrender.com/api-docs/#/)

## Contributors

- [TUYIZERE Fidela](https://github.com/Fidela1)
- [IRAKOZE Yves](https://github.com/irakozetony)
- [NDATUMUREMYI Paterne](https://github.com/ndatumuremyi)
- [MUNEZERO Olivier Hugue](https://github.com/Munezeroolivierhugue)
- [MUKUNZI Fabrice](https://github.com/fabmukunzi)
- [BRUNE Abdul Ghafar](https://github.com/Abdden)
- [NSHIMIYIMANA Jean Damascene](https://github.com/nshimiyejayd)
- [UKUNDIWABO UWERA Aline](https://github.com/Aline096)