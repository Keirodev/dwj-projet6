## Piquante

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

## Development server

Démarrer `ng serve` pour avoir accès au serveur de développement. Rendez-vous sur `http://localhost:4200/`. L'application va se recharger automatiquement si vous modifiez un fichier source.


## Lancer le projet en local :

Easiest is using Heroku :
```bash
heroku local
```

À la main Lancer Front & Back avec 
```bash
cd front && npm start &
cd ../api && npm start
```

[Gestion de ma Mongo DB ici](https://cloud.mongodb.com/v2/5e7d4c48657df53f3e469e5b#security/network/whitelist)

Prod
-----------


Heroku !



Build front with 
```bash
npm run build
# OR the full native command :
ng build --prod --base-href ./
```

Run back with 
```bash
node api/server.js
```

## [Version online ici](https://dwj.alwaysdata.net/)

