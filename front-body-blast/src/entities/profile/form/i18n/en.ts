export default {
  auth: {
    signUp: {
      bodyParams: {
        fields: {
          age: 'Age',
          weight: 'Weight',
          teenAgeWeight: 'Weight in adolescence',
        },
      },
      credentials: {
        errors: {
          passwordMismatch: 'Passwords missmatch',
        },
        fields: {
          username: 'First and last name',
          email: 'Email',
          password: 'Password',
          passwordRepeat: 'Repeat password',
        },
      },
      diseases: {
        fields: {
          gastrointestinalDiseases: 'Gastrointestinal diseases',
          insulinResistance: 'Insulin resistance',
          kidneyDisease: 'Kidney diseases',
          diseasesCVD: 'CVD diseases',
          diseasesODA: 'ODA diseases',
        },
      },
      forbiddens: {
        fields: {
          diet: 'Dietary restrictions',
          allergic: 'Allergics',
          intolerance: 'Food intolerance',
        },
      },
      motivations: {
        fields: {
          loadRestrictions: 'Load restrictions',
          sportExperience: 'Sports experience',
          targets: 'Targets',
        },
      },
    },
    login: {
      fields: {
        email: 'Email',
        password: 'Password',
      },
      controls: {
        forget: 'Forgot password',
      },
    },
  },
};
