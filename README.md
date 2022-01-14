# Test Technique Happypal Front

Contacts :
- Lancelot Prigent <lancelot@happypal.fr>
- Wassim Samad <wassim@happypal.fr>

## Préambule :

Ce test a pour but de tester différents aspects que vous serez amené à rencontrer tous les jours au sein d'Happypal. Vous avez carte blanche quant à ce sur quoi vous décidez d'avancer ainsi que sur le détails d'implémentation.

Ici nous testons votre capacité à vous projeter et à être force de proposition ainsi que votre structure de code mais également comment vous interagissez avec l'équipe (dans le cas où nous posez des questions en entretiens ou par mail pendant ce test).

Vous êtes grandement encouragé à sortir des cases et à nous proposer ce que VOUS pensez être intéressant.

L'application mise à votre disposition est une coquille reprenant :
- Une Application React Typescript
- Une connexion à une API GraphQL
- Un système de login
- 2 pages déjà liées pour vous permettre de ne pas faire de GraphQL si vous ne le souhaitez pas
- Le typage généré automatiquement par rapport aux models serveurs

## Consignes :

Carte blanche, faites ce que souhaitez, notez le temps que vous passer pour faire les choses et n'y passez pas trop de temps, il ne s'agit que d'un test technique, libre à vous d'estimer ce que vous souhaitez injecter comme temps dedans.

A moins que vous trouviez ça amusant ne passer pas plus de 8h grand maximum sur le projet, il a été conçu pour convenir à tous type de profil, n'essayez pas de tout faire au risque de vous démotiver.

Vous pouvez tout modifier, vous pouvez également consommer une autre API si l'envie vous prend.

## Évaluation :

Il n'y aucun critère de notation, aucun barème. Votre travail sera évalué lors d'un entretien en visio afin que vous puissiez le défendre et qu l'on puisse challenger le livrable.

Que vous fassiez uniquement de l'intégration ou alors que vous rajoutiez des fonctionnalités liées au serveur, tout est bon à prendre. Une méthode n'est pas meilleure que l'autre, vous êtes aux commandes, amusez-vous et bluffez nous !

## Contraintes de rendu

Ce répo est à votre disposition sur Github, votre livrable devra être un fork de celui-ci que vous nous communiquerez par mail.

## Idées de fonctionnalités

Ne faites pas tout, il ne s'agit que d'idées si vous n'en avez pas ! ;)

### GraphQL
- Afficher sur la page produit, les autre produits vendu par le même vendeur
- Implémenter une pagination sur la page produits
- Implémenter une recherche sur le nom des produit
- Implémenter un filtre sur le prix des produits (min et max)
- Implémenter un tri sur date de création ou date de mise à jour
- Implémenter les images sur les cartes produits

### Front uniquement

- Implémenter les images sur la page produit
- Styliser la page produits
- Styliser la page produit
- Implémenter un loader (skeletton ?)
- Implémenter une page d'erreur (404)
- Implémenter un bouton de déconnection
- Styliser la modale de login

## Détails techniques

### Génération d'une requête GraphQL

[Apollo Client](https://www.apollographql.com/docs/react/)
[GraphQL Codegen](https://www.graphql-code-generator.com/)

Si vous souhaitez modifier une query, mutation ou fragment GraphQL, après avoir fait votre modification dans le fichier `.gql` correspondant, lancez la commande `yarn run gen:gql`. Celle-ci va convertir vos fichier en `.generated.ts`. Ces fichiers contiennent les définitions typescript automatiquement générées depuis le serveur.

Exemple de création d'une requête pour récupérer un utilisateur :

1. Création du fichier graphql

```graphql
# UsersIdsView.gql
query UsersIdView($userId: ID!) {
  user(userId: $userId) {
    id
    firstName
    lastName
  }
}
```

2. Génération du fichier `.generated.ts` à l'aide de `yarn run gen:gql`

3. Import de la query dans la page

```ts
// UsersIdView.tsx
import { useUsersIdViewQuery } from './UsersIdView.generated';

export type UsersIdViewProps = {
  userId: string;
}

export function UsersIdView(props: UserIdViewProps) {
  const { userId } = props;

  const { data, loading } = useUsersIdViewQuery({ variables: { userId } });

  const user = data?.user;

  if (loading) {
    return <div>Chargement</div>;
  } else if (!user) {
    return <div>Erreur</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
```

4. Votre query est fonctionnelle.